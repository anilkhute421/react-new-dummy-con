import {LOGIN, LOGOUT,EMAIL,UPDATE_PROFILE} from '../Constants'

export const getLogin=(data)=>{
    return{type:LOGIN,payload:data}
}
export const getEmail=(email)=>{
    return{type:EMAIL,payload:email}
}
export const logout=()=>{
    return{type:LOGOUT}
}
export const updateProfileData=(data)=>{
    return{type:UPDATE_PROFILE,payload:data}
}