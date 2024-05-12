import { ACTIVETAB_MAINTENANCE, LOGOUT } from "../Constants";

const initialState = {
  ativeTab: "Requests",
};

export default function ActiveTabMaintenance(state = initialState, action) {
  switch (action.type) {
    case ACTIVETAB_MAINTENANCE:
      return {
        ...state,
        ativeTab: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
