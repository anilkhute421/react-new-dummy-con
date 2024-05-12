import { SEARCH_UNIT , SEARCH_TENANT_All, SEARCH_TENANT_LINKED, SEARCH_TENANT_REQUEST , SEARCH_TENANT_UNLINKED} from "../Constants"


export const searchUnit=(keyword)=>{
    return{type:SEARCH_UNIT,payload:keyword}
}

// teanant search
export const searchByAll = (keyword) => {
  return  { type: SEARCH_TENANT_All, payload: keyword };
}
export const searchByLinked = (keyword) => {
    return  { type: SEARCH_TENANT_LINKED, payload: keyword };
  }
  export const searchByUnlinked = (keyword) => {
    return  { type: SEARCH_TENANT_UNLINKED, payload: keyword };
  }
  export const searchByReq = (keyword) => {
    return  { type: SEARCH_TENANT_REQUEST, payload: keyword };
  }
