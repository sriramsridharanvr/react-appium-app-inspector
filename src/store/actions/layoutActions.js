import { RESIZE_LAYOUT } from "../types";

const TOP_BAR_HEIGHT = 50;

export const resize = () => (dispatch) => {
  const windowHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const avlHeight = windowHeight - TOP_BAR_HEIGHT - 26;
  dispatch({
    type: RESIZE_LAYOUT,
    payload: avlHeight,
  });
};
