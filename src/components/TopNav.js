import React from "react";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {
  createSession,
  closeSession,
  scan,
} from "../store/actions/inspectorActions";

const capabilities = {
  desiredCapabilities: {
    appPackage: "com.example.vinayak.loan",
    appActivity: "com.example.vinayak.loan.LauncherActivity",
    automationName: "UIAutomator2",
    deviceName: "emulator-5554",
    platformName: "android",
  },
};

const TopNav = ({
  layout,
  inspector,
  closeSession,
  createSession,
  scan,
  history,
}) => {
  const doCreateSession = () => {
    createSession(capabilities, (success) => {
      if (success) {
        history.push(`/${inspector.sessionId}`);
      }
    });
  };
  return (
    <div>
      <AppBar color="transparent">
        <Toolbar variant="dense" color="secondary">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Element Inspector
          </Typography>
          {inspector.sessionId ? (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                disabled={inspector.loading}
                style={{ marginRight: "3px" }}
                onClick={() => {
                  scan(inspector.sessionId);
                }}
              >
                Scan
              </Button>
              <Button
                variant="text"
                disabled={inspector.loading}
                onClick={() => {
                  closeSession(inspector.sessionId);
                }}
              >
                Close Session
              </Button>
            </React.Fragment>
          ) : (
            <Button
              variant="text"
              color="primary"
              variant="contained"
              disabled={inspector.loading}
              onClick={doCreateSession}
            >
              Create Session
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layout,
  inspector: state.inspector,
});

export default connect(mapStateToProps, { closeSession, scan, createSession })(
  TopNav
);
