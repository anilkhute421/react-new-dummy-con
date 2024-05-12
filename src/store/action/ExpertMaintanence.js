import { SEARCH_EXPERT } from "../Constants"

export const searchExpert=(keyword)=>{
    return {type:SEARCH_EXPERT,payload:keyword}
}