import React from 'react';
import { ForMikWrap, TextArea } from '../Pages/Styles';
import { useField } from 'formik';
export default function CustomTextArea(props){
  const [field,meta]=useField(props.name);
  return(
    <ForMikWrap>
    
    <TextArea  {...field}{...props} />
    {meta.error && meta.touched && <div className="err-msg">{meta.error}</div>}
    
    </ForMikWrap>
  )
}


