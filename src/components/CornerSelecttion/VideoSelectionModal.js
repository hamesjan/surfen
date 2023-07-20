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
    const { offsetX, offsetY } = event.nativeEvent;
    const width = offsetX - startPoint.x;
    const height = offsetY - startPoint.y;
    const rectangleCoordinates = {
      x:
        Math.round(
          (startPoint.x / videoRef.current.offsetWidth + Number.EPSILON) * 100
        ) / 100,
      y:
        Math.round(
          (startPoint.y / videoRef.current.offsetHeight + Number.EPSILON) * 100
        ) / 100,
      width: Math.abs(width) / videoRef.current.offsetWidth,
      height: Math.abs(height) / videoRef.current.offsetHeight,
    };
    console.log(rectangleCoordinates);
    onRectangleSelection(rectangleCoordinates);
    onClose();
  };

  const handleMouseMove = (event) => {
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
                top: startPoint.y - 20,
                left: startPoint.x - 20,
                position: "absolute",
                width: 50,
                height: 50,
              }}
            />
          )}
        </div>
        <h2>Select the general area of the surfer you want to capture.</h2>
      </div>
    </div>
  );
};

export default VideoSelectionModal;
