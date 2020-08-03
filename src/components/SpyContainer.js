import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AddCircleOutline, CheckCircleOutline } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";

const spyContainerStyle = {
  margin: "0px 0px",
  zIndex: 9999,
  backgroundColor: "#ccc",
  opacity: "0.5",
  position: "absolute",
};

const SpyContainer = ({
  elements,
  currentElement,
  dimensions,
  deviceDimensions,
}) => {
  const [spyElement, setSpyElement] = useState(null);
  const [scaleRatio, setScaleRatio] = useState(1);

  useEffect(() => {
    if (deviceDimensions && dimensions) {
      setScaleRatio(deviceDimensions.width / dimensions.width);
    }
  }, [dimensions, deviceDimensions]);

  return (
    <div
      className="spy-container"
      style={{
        margin: "0px 0px",
        zIndex: 9999,
        // backgroundColor: "#ccc",
        position: "absolute",
        top: `${dimensions ? dimensions.top : 50}px`,
        left: `${dimensions ? dimensions.left : 4}px`,
        width: `${dimensions ? dimensions.width : 400}px`,
        height: `${dimensions ? dimensions.height : 800}px`,
      }}
      onMouseOut={() => setSpyElement(null)}
    >
      {elements &&
        elements.map((element) => (
          <ElementHighlighter
            element={element}
            scaleRatio={scaleRatio}
            active={spyElement && spyElement.elementId === element.elementId}
            onHover={(element) => {
              setSpyElement(element);
            }}
          />
        ))}
    </div>
  );
};

SpyContainer.propTypes = {
  elements: PropTypes.array.isRequired,
  currentElement: PropTypes.object,
  dimensions: PropTypes.object.isRequired,
};

SpyContainer.defaultProps = {
  dimensions: {
    top: 53,
    left: 4,
    with: 400,
    height: 800,
  },
};

const parseCoordinates = (element) => {
  let { bounds, x, y, width, height } = element.attributes || {};
  if (bounds) {
    let boundsArray = bounds.split(/\[|\]|,/).filter((str) => str !== "");
    return {
      x1: boundsArray[0],
      y1: boundsArray[1],
      x2: boundsArray[2],
      y2: boundsArray[3],
    };
  } else if (x) {
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    width = parseInt(width, 10);
    height = parseInt(height, 10);
    return { x1: x, y1: y, x2: x + width, y2: y + height };
  } else {
    return {};
  }
};

const ElementHighlighter = ({
  element,
  active,
  onHover,
  scaleRatio,
  selected,
}) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const activeStyle = {
    position: "absolute",
    width: width + "px",
    height: height + "px",
    top: top + "px",
    left: left + "px",
  };

  const normalStyle = {
    position: "absolute",
    width: width + "px",
    height: height + "px",
    top: top + "px",
    left: left + "px",
  };

  const elementButtonStyle = {
    position: "relative",
    top: -1 * height + "px",
    left: width + "px",
  };

  useEffect(() => {
    const xOffset = 0;

    if (element) {
      const { x1, y1, x2, y2 } = parseCoordinates(element);
      setLeft(x1 / scaleRatio + xOffset);
      setTop(y1 / scaleRatio);
      setWidth((x2 - x1) / scaleRatio);
      setHeight((y2 - y1) / scaleRatio);
    }
  }, [element]);

  return (
    <div
      className="element-highlight-container"
      style={active ? activeStyle : normalStyle}
    >
      <div
        className="element-highligher"
        style={{
          opacity: "0.5",
          background: active ? "yellow" : "transparent",
          width: "100%",
          height: "100%",
        }}
        onMouseOver={() => {
          onHover(element);
        }}
      ></div>
      {selected ? (
        <IconButton
          size="small"
          style={elementButtonStyle}
          color="secondary"
          onMouseOver={() => {
            onHover(element);
          }}
        >
          <CheckCircleOutline />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          style={elementButtonStyle}
          color="primary"
          onMouseOver={() => {
            onHover(element);
          }}
        >
          <AddCircleOutline />
        </IconButton>
      )}
    </div>
  );
};

export default SpyContainer;
