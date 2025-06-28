import React from "react";

const ClippedImage = ({
  imageUrl,
  width = 800,
  height = 600,
  clipPathId = "brushClip",
  brushPath = "M200,100 C400,20 600,180 700,300 C600,400 400,500 200,400 C100,300 100,200 200,100 Z",
  showThread = true,
  threadPath = "M400 0 C450 200, 350 300, 400 600",
}) => {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipPathId}>
          <path d={brushPath} fill="white" />
        </clipPath>
      </defs>

      <image
        href={imageUrl}
        width={width}
        height={height}
        clipPath={`url(#${clipPathId})`}
        preserveAspectRatio="xMidYMid slice"
      />

      {showThread && (
        <path d={threadPath} stroke="white" strokeWidth="3" fill="none" />
      )}
    </svg>
  );
};

export default ClippedImage;
