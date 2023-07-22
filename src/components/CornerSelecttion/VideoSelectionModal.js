import React, { useRef, useState } from "react";
import classes from "./VideoSelectionModal.module.css";

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
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <video
            ref={videoRef}
            src={videoURL}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
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
        <h2 className={classes.modal_tip}>
          Select the general area of the surfer you want to capture.
          <br />
          <p style={{ fontSize: "13px", color: "grey" }}>
            If the resultant video isn't following the surfer correctly,
            <br /> try moving the bounding box around.
          </p>
        </h2>
      </div>
    </div>
  );
};

export default VideoSelectionModal;
