import { SEARCH_BUILDING } from "../Constants"

export const searchBuilding=(keyword)=>{
    return {type:SEARCH_BUILDING,payload:keyword}
}