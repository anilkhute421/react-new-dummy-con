import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Box, margin } from '@mui/system';
import { Chip, Input, TextField } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function DropdownMultiSelect({names , placeholder}) {

  const [personName, setPersonName] = React.useState([]);


  const handleChange = (event ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const MultiSelectstyle = {
      width:"100%",
      height:"40px",
      border: "none",
      outline: "none",
      padding: "0 10px",
      marginTop:"20px",
      background: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0px 2px 8px rgba(61, 107, 192, 0.28)",
  }
  const SelectOutputLimit = (selected) => {
    let more = selected.selected.length - 2
    return (
  
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.selected.map((ele, idx) =>
            idx < 2 && <Chip sx={{ width: 90 }} key={idx} label={ele} />)}
        </Box>
        {selected.selected.length > 2 && `+${more}More`}
      </Box>
    )
  }

  return (
    <div>
      <FormControl sx={MultiSelectstyle}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input sx={{p:0 }} disableUnderline={true} />}
          renderValue={(selected) => (
            <SelectOutputLimit selected={selected} />
           
          )}
        
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
