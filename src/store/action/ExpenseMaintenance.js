import { SEARCH_EXPENSE } from "../Constants"

export const searchExpense=(keyword)=>{
    return {type:SEARCH_EXPENSE,payload:keyword}
}