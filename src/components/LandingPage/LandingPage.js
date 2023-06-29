import React, { useRef, useState } from "react";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState(null);
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
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = async (event) => {
    // const uploadResult = await uploadVideoToS3(file);
    // if (uploadResult.success) {
    //   // Store the video URL in the user table or perform any desired action
    //   // saveVideoUrlToUserTable(uploadResult.videoUrl);
    //   console.log("success");
    // } else {
    //   // Handle the upload failure
    //   console.error(uploadResult.error);
    // }
    console.log(file);
  };

  return (
    <div className={classes.container}>
      <div className={classes.video_box}>
        {videoUrl ? (
          <div style={{ position: "relative" }}>
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
        <input
          type="file"
          onChange={handleUpload}
          accept="video/*"
          ref={fileInputRef}
          className={classes.input_file}
        />
        <button className={classes.convert_button} onClick={handleConvert}>
          Convert
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
