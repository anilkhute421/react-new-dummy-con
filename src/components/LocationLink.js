import React from 'react'
import { toast } from 'react-toastify'
import IntlMassage from '../utils/IntlMassage'


export default  function LocationLink({link}) {
  
let url=link
    const openUrl=()=>{
        if(!url.includes("http")){
            toast.info("Invalid link",{theme:'colored'})
            return false;
        }
        let a =document.createElement('a')
        a.href=link
        a.target="_blank"
        a.click()

    }

    return (
        
        <span onClick={openUrl} style={{textDecoration:'none',color:'#00A3FF',fontWeight:'500',cursor:'pointer'}}>
            <IntlMassage id="label.link"/>
        </span>
    )
}

