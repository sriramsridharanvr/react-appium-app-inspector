import React, { useState, createRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Grid,
  Typography,
  Paper,
  CssBaseline,
  Button,
  ListItem,
  List,
} from "@material-ui/core";

import { BrowserRouter as Router } from "react-router-dom";

import xmlParser from "xml2js";

const titlePaperStyle = {
  padding: "10px 10px",
  margin: "3px 5px",
  display: "flex",
  alignItems: "center",
};

const buttonStyle = {
  margin: "0 4px",
};

const titleRef = createRef();

const App = ({ history }) => {
  const [sessionId, setSessionId] = useState(null);
  const [availableHeight, setAvailableHeight] = useState(600);
  const [screenshot, setScreenshot] = useState(null);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    calculateHeight();

    window.addEventListener("resize", calculateHeight);
  }, []);

  const calculateHeight = () => {
    const windowHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    const topBarHeight = titleRef ? titleRef.current.offsetHeight : 0;
    const avlHeight = windowHeight - topBarHeight - 13;
    setAvailableHeight(avlHeight);
  };

  const paperStyle = {
    padding: "10px 10px",
    margin: "3px 5px",
    height: availableHeight + "px",
    maxHeight: availableHeight + "px",
  };

  const launchApp = async () => {
    const capabilities = {
      desiredCapabilities: {
        appPackage: "com.example.vinayak.loan",
        appActivity: "com.example.vinayak.loan.LauncherActivity",
        automationName: "UIAutomator2",
        deviceName: "emulator-5554",
        platformName: "android",
      },
    };

    try {
      const response = await axios.post("/launch", capabilities);

      setSessionId(response.data.sessionId);
      setScreenshot(response.data.screenshot);

      if (history) history.push("#" + response.data.sessionId);
    } catch (error) {
      console.error(error);
    }
  };

  const getAttributes = (element) => {
    return element["$"];
  };

  const parseNode = (key, node, elements) => {
    const element = {
      tag: key,
    };

    element.attributes = getAttributes(node);
    elements.push(element);
    Object.keys(node).forEach((key) => {
      if (key !== "$") {
        if (node[key].push) {
          node[key].forEach((obj) => {
            parseNode(key, obj, elements);
          });
        } else {
          parseNode(key, node[key], elements);
        }
      }
    });
  };

  const scan = async () => {
    if (sessionId) {
      try {
        const res = await axios.get(`/pagesource/${sessionId}`);
        setScanData(res.data);
        setScreenshot(res.data.screenshot);
        console.log(res.data.xml);
        let dom = xmlParser.parseString(res.data.xml, (err, result) => {
          let elements = [];
          parseNode("root", result.hierarchy, elements);
          setScanData({
            elements: elements.filter((element) => element.tag !== "root"),
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <div className="app">
          <Grid container>
            <Grid item xs={12} ref={titleRef}>
              <Paper elevation={1} style={titlePaperStyle}>
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                  Scan Elements
                </Typography>
                {sessionId ? (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      style={buttonStyle}
                      onClick={scan}
                    >
                      Scan
                    </Button>
                    <Button variant="contained" style={buttonStyle}>
                      Close Session
                    </Button>
                  </React.Fragment>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ alignSelf: "flex-end" }}
                    onClick={launchApp}
                  >
                    Launch App
                  </Button>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Grid container>
                  <Grid item xs={12} md={6} lg={3} xl={3}>
                    <Paper style={paperStyle}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h6">Screenshot</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="image-container">
                            {screenshot && (
                              <img
                                src={`data:image/png;charset=utf-8;base64, ${screenshot}`}
                                alt="Screenshot of current page"
                                style={{ margin: "10px 4px", width: "100%" }}
                              />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={9} xl={9}>
                    <Paper style={paperStyle}>
                      {scanData && (
                        <Grid container>
                          <Grid xs={12} item>
                            <List>
                              {scanData.elements.map((element) => (
                                <ListItem>{element.attributes.bounds}</ListItem>
                              ))}
                            </List>
                          </Grid>
                        </Grid>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
