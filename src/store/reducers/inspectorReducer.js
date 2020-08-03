import {
  CREATE_SESSION,
  INVALIDATE_SESSION,
  VALDIATE_SESSION,
  CLOSE_SESSION,
  INSPECTOR_ERROR,
  SCAN,
  SELECT_ELEMENT,
  DESELECT_ELEMENT,
  SET_CURRENT_ELEMENT,
  FILTER_ELEMENTS,
  SPY_ELEMENT,
  SET_LOADING,
} from "../types";
import { scan } from "../actions/inspectorActions";

const initialState = {
  sessionId: null,
  screenshot: null,
  elements: [],
  filteredElements: [],
  spyElement: null,
  currentElement: null,
  selectedElements: [],
  filter: null,
  masterDimensions: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case CREATE_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        masterDimensions: action.payload.dimensions,
        screenshot: action.payload.screenshot,
        loading: false,
        error: null,
      };

    case VALDIATE_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        masterDimensions: action.payload.dimensions,
        loading: false,
        error: null,
      };

    case INVALIDATE_SESSION:
      return {
        ...state,
        sessionId: null,
        error: "The specified session does not exist.",
        masterDimensions: null,
        loading: false,
      };

    case INSPECTOR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLOSE_SESSION:
      return {
        ...initialState,
      };

    case SCAN:
      return {
        ...state,
        elements: action.payload.elements,
        screenshot: action.payload.screenshot,
        filteredElements: [],
        spyElement: null,
        currentElement: null,
        filter: null,
        error: null,
        loading: false,
      };

    case SELECT_ELEMENT:
      return {
        ...state,
        selectedElements: [...state.selectedElements, action.payload],
      };

    case DESELECT_ELEMENT:
      return {
        ...state,
        selectedElements: state.selectedElements.filter(
          (ele) => ele.elementId !== action.payload.elementId
        ),
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
  }
};
