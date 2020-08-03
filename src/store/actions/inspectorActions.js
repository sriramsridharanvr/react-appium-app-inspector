import {
  CREATE_SESSION,
  VALDIATE_SESSION,
  INVALIDATE_SESSION,
  CLOSE_SESSION,
  SCAN,
  SET_CURRENT_ELEMENT,
  FILTER_ELEMENTS,
  SPY_ELEMENT,
  SET_LOADING,
  INSPECTOR_ERROR,
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
} from "../types";

import axios from "axios";
import xmlParser from "xml2js";
import uuid from "uuid";

export const validateSession = (sessionId) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  dispatch({
    type: VALDIATE_SESSION,
    payload: {
      sessionId: sessionId,
    },
  });
};

export const closeSession = (sessionId) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });

  try {
    await axios.post(`/sessions/${sessionId}/close`);
    dispatch({
      type: CLOSE_SESSION,
    });
  } catch (error) {
    dispatch({
      type: INSPECTOR_ERROR,
      payload: "Could not end session at this time",
    });
  }
};

export const createSession = (capabilities) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
  try {
    const response = await axios.post("/launch", capabilities);
    dispatch({
      type: CREATE_SESSION,
      payload: {
        sessionId: response.data.sessionId,
        screenshot: response.data.screenshot,
        dimensions: response.data.dimensions,
      },
    });
  } catch (error) {
    dispatch({
      type: INSPECTOR_ERROR,
      payload: "Could not create session at this time",
    });
  }
};

const parseNode = (key, node, elements) => {
  const element = {
    tag: key,
  };

  element.attributes = getAttributes(node);
  element.elementId = uuid.v4();
  element.label = element.attributes["resource-id"]
    ? element.attributes["resource-id"]
    : element.attributes.class;
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

const getAttributes = (element) => {
  return element["$"];
};

export const scan = (sessionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/pagesource/${sessionId}`);
    let dom = xmlParser.parseString(res.data.xml, (err, result) => {
      let elements = [];
      parseNode("root", result.hierarchy, elements);
      dispatch({
        type: SCAN,
        payload: {
          screenshot: res.data.screenshot,
          elements: elements.filter((element) => element.tag !== "root"),
        },
      });
    });
  } catch (error) {
    dispatch({
      type: INSPECTOR_ERROR,
      payload: "Could not scan at this time",
    });
  }
};

export const selectElement = (element) => (dispatch) => {
  dispatch({
    type: SELECT_ELEMENT,
    payload: element,
  });
};

export const deSelectElement = (element) => (dispatch) => {
  dispatch({
    type: DESELECT_ELEMENT,
    payload: element,
  });
};
