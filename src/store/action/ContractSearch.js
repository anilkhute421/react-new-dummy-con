import { SEARCH_CONTRACT } from "../Constants";

export const searchContract = (keyword) => {
  return { type: SEARCH_CONTRACT, payload: keyword };
};
