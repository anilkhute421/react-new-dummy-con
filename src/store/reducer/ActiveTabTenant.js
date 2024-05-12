import { ACTIVETAB_TENANT, LOGOUT } from "../Constants";

const initialState = {
  ativeTab: 1,
};

export default function ActiveTabTenant(state = initialState, action) {
  switch (action.type) {
    case ACTIVETAB_TENANT:
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
