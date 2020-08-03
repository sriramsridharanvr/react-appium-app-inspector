import React from "react";

const InspectorScreenshot = ({ screenshot, ref }) => {
  return (
    <div>
      {screenshot && (
        <img
          ref={ref}
          src={`data:image/png;charset=utf-8;base64, ${screenshot}`}
          alt="Screenshot of image"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default InspectorScreenshot;
