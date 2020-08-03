const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const xmlParser = require("xml2js");

const Axios = require("axios");
const axios = Axios.default;

const APPIUM_URL = "http://localhost:4723/wd/hub";

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/launch", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:4723/wd/hub/session",
      req.body
    );

    const sessionId = response.data.sessionId;

    const screenshotUrl = `http://localhost:4723/wd/hub/session/${sessionId}/screenshot`;
    const screenshotResponse = await axios.get(screenshotUrl);

    const responseData = {
      sessionId,
      screenshot: screenshotResponse.data.value,
      dimensions: response.data.value.viewportRect,
    };

    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/sessions/:sessionId/close", async (req, res) => {
  const sessionId = req.params.sessionId;
  const url = `${APPIUM_URL}/session/${sessionId}`;

  try {
    const response = await axios.delete(url);

    res.send(200);
  } catch (error) {
    res.send(500);
  }
});

app.get("/pagesource/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;

  const url = `${APPIUM_URL}/session/${sessionId}/source`;

  try {
    const resopnse = await axios.get(url);
    const responseData = {
      sessionId: sessionId,
      elements: [],
      xml: resopnse.data.value,
    };

    // let dom = xmlParser.parseString(resopnse.data.value, (err, result) => {
    //   //console.log(JSON.stringify(result));
    //   if (err) console.error(err);
    // });

    const screenshotUrl = `${APPIUM_URL}/session/${sessionId}/screenshot`;
    const screenshotResponse = await axios.get(screenshotUrl);
    responseData.screenshot = screenshotResponse.data.value;

    res.send(responseData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 5000);
