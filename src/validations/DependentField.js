
import React from 'react';
import { useFormikContext } from 'formik';
import { Autocomplete } from '@mui/material';
import { ForMikWrap } from '../Pages/Styles';

export const DependentInput = ({
 
  getChanges,  
  required,
  type,
  label,
  form,
  field,
  options,
  fullWidth,
  margin, 
  placeholder,
  ...props
}) =>{
  const { name, value } = field;
  const {setFieldValue,getFieldMeta}=useFormikContext();

 const handle=(name,value)=>{
    setFieldValue(name,value)
    getChanges(value)
 }
  return (
    <ForMikWrap>

    <Autocomplete
      type = { type }
      name = { name }
      value = { value }
      onChange={(e, newvalue) => handle(name,newvalue)}
      options = { options }
      sx={{
          "& input": {
            width: "100%",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(
                theme.palette.background.paper
              ),
          },
        }}
        {...props}
    />
    <div className='err-msg'>  {getFieldMeta(name).error}</div>      
          </ForMikWrap>
  )
}







// chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security