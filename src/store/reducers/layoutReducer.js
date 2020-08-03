import { RESIZE_LAYOUT } from "../types";

const initialState = {
  availableHeight: 800,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case RESIZE_LAYOUT:
      return {
        ...state,
        availableHeight: action.payload,
      };
  }
};
