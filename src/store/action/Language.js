import { SELECT_LANGUAGE } from "../Constants"



export const SelectLanguage=(language)=>{
    return{type:SELECT_LANGUAGE,payload:language}
}