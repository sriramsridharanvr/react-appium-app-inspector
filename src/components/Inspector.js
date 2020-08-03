import React, { createRef, useState } from "react";
import { connect } from "react-redux";
import { Grid, Paper, Typography } from "@material-ui/core";
import { validateSession } from "../store/actions/inspectorActions";
import InspectorScreenshot from "./InspectorScreenshot";
import SpyContainer from "./SpyContainer";
import SelectedElements from "./SelectedElements";

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
  const [tempSelectedElements, setTempSelectedElements] = useState([
    {
      tag: "android.view.ViewGroup",
      attributes: {
        index: "0",
        package: "com.example.vinayak.loan",
        class: "android.view.ViewGroup",
        text: "",
        "resource-id": "com.example.vinayak.loan:id/action_bar",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[0,63][1080,210]",
        displayed: "true",
      },
      elementId: "fd14cb94-be93-4a5a-8ff4-7438327b90ec",
      label: "com.example.vinayak.loan:id/action_bar",
      selectedByUser: false,
    },
    {
      tag: "android.widget.TextView",
      attributes: {
        index: "0",
        package: "com.example.vinayak.loan",
        class: "android.widget.TextView",
        text: "YCS eZ Cash+",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[42,101][376,172]",
        displayed: "true",
      },
      elementId: "dece470d-af37-4043-9be7-dbf9112b1e1f",
      label: "android.widget.TextView",
      selectedByUser: false,
    },
    {
      tag: "android.widget.FrameLayout",
      attributes: {
        index: "1",
        package: "com.example.vinayak.loan",
        class: "android.widget.FrameLayout",
        text: "",
        "resource-id": "android:id/content",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[0,210][1080,1794]",
        displayed: "true",
      },
      elementId: "eaa9cedc-ef8a-4a1d-996d-b9afafa6e041",
      label: "android:id/content",
      selectedByUser: false,
    },
    {
      tag: "android.widget.LinearLayout",
      attributes: {
        index: "0",
        package: "com.example.vinayak.loan",
        class: "android.widget.LinearLayout",
        text: "",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[0,210][1080,1794]",
        displayed: "true",
      },
      elementId: "0b8dcabd-d2fc-4764-b723-4a95af2d6e72",
      label: "android.widget.LinearLayout",
      selectedByUser: false,
    },
    {
      tag: "android.widget.ImageView",
      attributes: {
        index: "0",
        package: "com.example.vinayak.loan",
        class: "android.widget.ImageView",
        text: "",
        "resource-id": "com.example.vinayak.loan:id/imageView3",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[26,236][1054,922]",
        displayed: "true",
      },
      elementId: "9f962ce9-caca-4699-93e5-9a9a354883b3",
      label: "com.example.vinayak.loan:id/imageView3",
      selectedByUser: false,
    },
    {
      tag: "android.widget.TextView",
      attributes: {
        index: "1",
        package: "com.example.vinayak.loan",
        class: "android.widget.TextView",
        text: "ezCash+",
        "resource-id": "com.example.vinayak.loan:id/textView11",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[26,972][1054,1155]",
        displayed: "true",
      },
      elementId: "153c17ab-de35-4c95-ad19-a634fdb8beec",
      label: "com.example.vinayak.loan:id/textView11",
      selectedByUser: false,
    },
    {
      tag: "android.widget.TextView",
      attributes: {
        index: "2",
        package: "com.example.vinayak.loan",
        class: "android.widget.TextView",
        text: "              Lending Simplified",
        "resource-id": "com.example.vinayak.loan:id/textView12",
        checkable: "false",
        checked: "false",
        clickable: "false",
        enabled: "true",
        focusable: "false",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[26,1155][1054,1322]",
        displayed: "true",
      },
      elementId: "1dc82369-ce03-4266-87e0-e813593785b6",
      label: "com.example.vinayak.loan:id/textView12",
      selectedByUser: false,
    },
    {
      tag: "android.widget.ImageButton",
      attributes: {
        index: "3",
        package: "com.example.vinayak.loan",
        class: "android.widget.ImageButton",
        text: "",
        "resource-id": "com.example.vinayak.loan:id/button12",
        checkable: "false",
        checked: "false",
        clickable: "true",
        enabled: "true",
        focusable: "true",
        focused: "false",
        "long-clickable": "false",
        password: "false",
        scrollable: "false",
        selected: "false",
        bounds: "[412,1427][667,1585]",
        displayed: "true",
      },
      elementId: "b2d3d4f6-4e3b-40b8-b8a1-096b019d5c14",
      label: "com.example.vinayak.loan:id/button12",
      selectedByUser: false,
    },
  ]);

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
