
import React from 'react';
import { useFormikContext } from 'formik';
import { Autocomplete } from '@mui/material';
import { ForMikWrap } from '../Pages/Styles';

export const AutoSelect = ({
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
  const { name, value, } = field;
  const {setFieldValue,getFieldMeta}=useFormikContext();

  return (
    <ForMikWrap>

    <Autocomplete
      type = { type }
      name = { name }
      value = { value }
      
      onChange={(e, newvalue) => setFieldValue(name,newvalue)}
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
