import React, { useRef, useState } from "react";
import classes from "./LandingPage.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fireStorage from "../../firebaseConfig";
import axios from "axios";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const LandingPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState(null);
  const [outVidLink, setOutVidLink] = useState("");
  let fileInputRef = useRef(null);

  const handleUpload = (event) => {
    const tempFile = event.target.files[0];
    setFile(event.target.files[0]);
    const videoUrl = URL.createObjectURL(tempFile);
    setVideoUrl(videoUrl);
    fileInputRef = videoUrl;
  };

  const handleClear = () => {
    if (videoUrl) {
      setVideoUrl("");
      setOutVidLink("");
      setPercent(0);
      fileInputRef.current.value = "";
    }
  };

  const handleUploadAndConvert = async () => {
    if (!file) {
      alert("Please choose a file first!");
    }
    const vidId = generateRandomString(8);
    const storageRef = ref(fireStorage, `${vidId}.mp4`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          handleBackendCall(url, vidId);
        });
      }
    );
  };

  const handleBackendCall = async (vidUrl, vidId) => {
    try {
      axios
        .post(
          `https://hamesjan.pythonanywhere.com/api/process-video?video_url=${vidUrl}&video_name=${vidId}`
        )
        .then((response) => {
          console.log(response.data); // Handle the response data
          setOutVidLink(response.data.processed_video_url);
        })
        .catch((error) => {
          console.error(error); // Handle any errors
        });
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const downloadVidLink = () => {
    console.log(outVidLink);
    window.open(outVidLink, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className={classes.outer_div}>
      <div className={classes.info_header}>
        This is a surf clip enhancer that uses Lucas-Kanade optical flow in
        order to detect and follow surfers in a surfline replay.
        <br />
        <b>
          Be sure to crop the clip's length so that video uploading doesn't take
          too long.
        </b>
      </div>
      <div className={classes.container}>
        <div className={classes.video_box}>
          {videoUrl ? (
            <div>
              <video controls className={classes.video_holder}>
                <source src={videoUrl} ref={fileInputRef} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={handleClear} className={classes.clear_button}>
                Clear
              </button>
            </div>
          ) : (
            <div className={classes.no_video_box}>
              <p style={{ marginLeft: "10px" }}>Upload your surf video</p>
            </div>
          )}
        </div>
        <div className={classes.upload_container}>
          {!videoUrl ? (
            <input
              type="file"
              onChange={handleUpload}
              accept="video/*"
              ref={fileInputRef}
              className={classes.input_file}
            />
          ) : null}
          <button
            className={classes.convert_button}
            onClick={handleUploadAndConvert}
          >
            Upload
          </button>
          {videoUrl ? <p>{percent}%</p> : null}
          {outVidLink !== "" && percent === 100 ? (
            <button onClick={downloadVidLink}> Download</button>
          ) : percent === 100 ? (
            "Grabbing download link... one second..."
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
