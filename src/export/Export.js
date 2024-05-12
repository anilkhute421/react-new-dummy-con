import { exportUrl } from "../utils/constants";

export const exportData=(key)=> {
    
    const a = document.createElement('a')
    a.target = "_blank";
    a.href = exportUrl+`${key}`
    a.click()

  }