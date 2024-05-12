import { ACTIVETAB_TENANT } from "../Constants";

export const TenantTab = (keyword) => {
  return { type: ACTIVETAB_TENANT, payload: keyword };
};
