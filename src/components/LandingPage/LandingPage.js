import React, { useRef, useState } from "react";
import classes from "./LandingPage.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fireStorage from "../../firebaseConfig";
import axios from "axios";
import VideoSelectionModal from "../CornerSelecttion/VideoSelectionModal";
import ReactPlayer from "react-player";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  let fileInputRef = useRef(null);

  const [rectangleCoordinates, setRectangleCoordinates] = useState(null);

  const handleRectangleSelection = (coordinates) => {
    setRectangleCoordinates(coordinates);
  };

  const handleUpload = (event) => {
    const tempFile = event.target.files[0];
    setFile(event.target.files[0]);
    const videoUrl = URL.createObjectURL(tempFile);
    setVideoUrl(videoUrl);
    fileInputRef = videoUrl;
    setIsModalOpen(true);
    console.log("debug");
  };

  const handleClear = () => {
    if (videoUrl) {
      setVideoUrl("");
      setOutVidLink("");
      setPercent(0);
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadAndConvert = async () => {
    if (!file || !rectangleCoordinates) {
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
      (err) => alert("ERROR: 404 TROLOLOL"),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleBackendCall(
            url,
            vidId,
            rectangleCoordinates["x"],
            rectangleCoordinates["y"]
          );
        });
      }
    );
  };

  const handleBackendCall = async (vidUrl, vidId, x, y) => {
    try {
      axios
        .post(
          `https://hamesjan.pythonanywhere.com/api/process-video?video_url=${vidUrl}&video_name=${vidId}&x=${x}&y=${y}`
        )
        .then((response) => {
          console.log(response.data); // Handle the response data
          setOutVidLink(response.data.processed_video_url);
          window.open(response.data.processed_video_url, "_blank");
        })
        .catch((error) => {
          alert("ERROR: 404 TROLOLOL");
          console.error(error); // Handle any errors
        });
    } catch (error) {
      alert("ERROR: 404 TROLOLOL");
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const downloadVidLink = () => {
    window.open(outVidLink, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className={classes.outer_div}>
      <div className={classes.info_header}>
        Surfen is a surf clip enhancer that uses Lucas-Kanade optical flow in
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
            <div style={{ position: "absolute", top: "0px", left: "0px" }}>
              <ReactPlayer
                ref={fileInputRef}
                controls={false}
                playing={false}
                muted={true}
                className="video"
                width="320px"
                height="240px"
                url={videoUrl}
                type="video/mp4"
                style={{
                  marginTop: "0px",
                  marginLeft: "15%",
                  marginBottom: "0px",
                }}
              />
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
          {videoUrl ? (
            <button
              className={classes.convert_button}
              onClick={handleUploadAndConvert}
            >
              Convert
            </button>
          ) : null}
          {videoUrl ? <p>{percent}%</p> : null}
          {outVidLink !== "" && percent === 100 ? (
            <button onClick={downloadVidLink}> Download</button>
          ) : percent === 100 ? (
            "Surfening... one second..."
          ) : null}
        </div>
      </div>
      {isModalOpen && (
        <VideoSelectionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoURL={videoUrl}
          onRectangleSelection={handleRectangleSelection}
        />
      )}
    </div>
  );
};

export default LandingPage;
