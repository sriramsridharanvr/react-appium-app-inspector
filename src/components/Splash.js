import React from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
const Splash = ({ layout }) => {
  return (
    <div
      style={{
        width: "100%",
        height: `${layout.availableHeight}px`,
        maxHeight: `${layout.availableHeight}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        opacity: 0.8,
        position: "absolute",
        top: "50px",
        backgroundColor: "#ccc",
      }}
    >
      <CircularProgress color="primary" size={32} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
});

export default connect(mapStateToProps, null)(Splash);
