import React, { createRef, useState } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { validateSession } from "../store/actions/inspectorActions";
import InspectorScreenshot from "./InspectorScreenshot";
import SpyContainer from "./SpyContainer";
import SelectedElements from "./SelectedElements";
import Splash from "./Splash";

const Inspector = ({ layout, inspector, match, validateSession }) => {
  const paperStyle = {
    padding: "10px 10px",
    margin: "3px 5px",
    height: layout.availableHeight + "px",
    maxHeight: layout.availableHeight + "px",
    overflowY: "auto",
  };

  const [spyDimensions, setSpyDimensions] = useState(null);
  const [scannedElements, setScannedElements] = useState([]);
  const [hoverElement, setHoverElement] = useState(null);

  React.useEffect(() => {
    validateSession(match.params.sessionId);
  }, [match.params.sessionId]);

  React.useEffect(() => {
    if (inspector.screenshot) {
      const spyContainer = imageRef.current;

      setSpyDimensions({
        top: spyContainer.offsetTop,
        left: spyContainer.offsetLeft,
        width: spyContainer.offsetWidth,
        height: spyContainer.offsetHeight,
      });
    }
  }, [inspector.screenshot]);

  React.useEffect(() => {
    setScannedElements(
      inspector.elements
        ? inspector.elements.map((ele) => ({
            ...ele,
            selectedByUser: false,
          }))
        : []
    );
  }, [inspector.elements]);

  const imageRef = createRef();

  const onSelectElement = (element) => {
    setScannedElements(
      scannedElements.map((ele) =>
        ele.elementId === element.elementId
          ? {
              ...element,
              selectedByUser: true,
            }
          : ele
      )
    );
  };

  const onDeSelectElement = (element) => {
    setScannedElements(
      scannedElements.map((ele) =>
        ele.elementId === element.elementId
          ? {
              ...element,
              selectedByUser: false,
            }
          : ele
      )
    );
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {inspector.loading && <Splash />}
      <Grid container>
        <Grid item xs={12} md={6} lg={3} xl={3}>
          <Paper style={paperStyle}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6">Screenshot</Typography>
              </Grid>
              <Grid item xs={12}>
                <div
                  className="image-container"
                  style={{ margin: "10px 0" }}
                  ref={imageRef}
                >
                  <InspectorScreenshot screenshot={inspector.screenshot} />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={9} xl={9}>
          <Paper style={paperStyle}>
            <Grid container>
              <Grid xs={12} item>
                <SelectedElements
                  selectedElements={scannedElements.filter(
                    (ele) => ele.selectedByUser === true
                  )}
                  onExpanded={(ele) => setHoverElement(ele)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {inspector.screenshot && (
        <SpyContainer
          elements={scannedElements}
          dimensions={spyDimensions}
          deviceDimensions={inspector.masterDimensions}
          onSelect={onSelectElement}
          onDeselect={onDeSelectElement}
          onHover={(ele) => setHoverElement(ele)}
          hoverElement={hoverElement}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
  inspector: state.inspector,
});

export default connect(mapStateToProps, { validateSession })(Inspector);
