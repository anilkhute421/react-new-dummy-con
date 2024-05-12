import { SEARCH_OWNER } from "../Constants"

export const searchOwner=(keyword)=>{
    return {type:SEARCH_OWNER,payload:keyword}
}