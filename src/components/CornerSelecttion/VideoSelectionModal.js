import React, { useRef, useState } from "react";
import classes from "./VideoSelectionModal.module.css";
import ReactPlayer from "react-player";

const VideoSelectionModal = ({
  isOpen,
  onClose,
  onRectangleSelection,
  videoURL,
}) => {
  const videoRef = useRef(null);
  const [startPoint, setStartPoint] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setStartPoint({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = (event) => {
    const rectangleCoordinates = {
      x:
        Math.round(
          (startPoint.x / videoRef.current.offsetWidth + Number.EPSILON) * 100
        ) / 100,
      y:
        Math.round(
          (startPoint.y / videoRef.current.offsetHeight + Number.EPSILON) * 100
        ) / 100,
    };
    onRectangleSelection(rectangleCoordinates);
    console.log(rectangleCoordinates);
    onClose();
  };

  const handleMouseMove = (event) => {
    if (isHovering) {
      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
    }
  };

  const handleTouchStart = (event) => {
    const { touches } = event.nativeEvent;
    const touch = touches[0];
    const { clientX, clientY } = touch;
    const { left, top } = videoRef.current.getBoundingClientRect();
    setStartPoint({ x: clientX - left, y: clientY - top });
  };

  const handleTouchEnd = (event) => {
    const rectangleCoordinates = {
      x:
        Math.round(
          (startPoint.x / videoRef.current.offsetWidth + Number.EPSILON) * 100
        ) / 100,
      y:
        Math.round(
          (startPoint.y / videoRef.current.offsetHeight + Number.EPSILON) * 100
        ) / 100,
    };
    onRectangleSelection(rectangleCoordinates);
    console.log(rectangleCoordinates);

    onClose();
  };

  const handleTouchMove = (event) => {
    if (isHovering) {
      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className={classes.modal_content}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div
          className={classes.thumbnail_container}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ReactPlayer
            controls={false}
            playing={false}
            muted={true}
            loop={true}
            className="video"
            width="100%"
            height="200px"
            url={videoURL}
            type="video/mp4"
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              marginLeft: "0px",
              marginRight: "0px",
              padding: "0px",
              position: "relative",
              top: "0px",
              left: "0px",
              zIndex: 4,
            }}
          />
          <video
            ref={videoRef}
            src={videoURL}
            className={classes.modal_video_holder}
          >
            Your browser does not support the video tag.
          </video>
          {isHovering && startPoint && (
            <div
              className={classes.red_box}
              style={{
                top: startPoint.y,
                left: startPoint.x,
                position: "absolute",
                width: 25,
                height: 25,
              }}
            />
          )}
        </div>
        <div className={classes.modal_tip}>
          <h2>
            Select the general area of the surfer
            <br />
            you want to capture.
            <br />
            <p style={{ fontSize: "13px", color: "grey" }}>
              If the resultant video isn't following the surfer correctly,
              <br /> try moving the bounding box around.
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VideoSelectionModal;
