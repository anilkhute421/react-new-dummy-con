import { SEARCH_PAYMENT } from "../Constants";

export const paymentSearch = (keyword) => {
  return  { type: SEARCH_PAYMENT, payload: keyword };
}
