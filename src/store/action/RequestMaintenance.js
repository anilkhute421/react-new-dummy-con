import { SEARCH_REQUESTMAINTENANCE } from "../Constants"

export const searchRequest=(keyword)=>{
    return {type:SEARCH_REQUESTMAINTENANCE,payload:keyword}
}