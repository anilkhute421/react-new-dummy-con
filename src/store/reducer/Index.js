import { combineReducers } from "redux";
import Language from "./Language";
import Auth from "./Auth";
import Owners from "./Owners";
import Buildings from "./Buildings";
import Contracts from "./Contracts";
import Payment from "./Payment";
import Units from './UnitReducer'
import Tenant from "./Tenant"
import ExpertMaintanence from  "./ExpertMaintanence"
import RequestMaintenance from  "./RequestMaintenance"
import ExpenseMaintenance from "./ExpenseMaintenance";
import ActiveTabMaintenance from "./ActiveTabMaintenance"
import ActiveTabTenant from "./ActiveTabTenant";
import Notification from "./Notification"



export default combineReducers({
  Language,
  Auth,
  Owners,
  Buildings,
  Contracts,
  Payment,
  Units,
  Tenant,
  ExpertMaintanence,
  RequestMaintenance,
  ExpenseMaintenance,
  ActiveTabMaintenance,
  ActiveTabTenant,
  Notification
});
