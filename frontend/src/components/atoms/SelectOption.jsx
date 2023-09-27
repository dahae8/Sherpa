import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth({ data = [], onSelect, width = '210px' }) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: width }}>
      <InputLabel id="demo-simple-select-standard-label"></InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        // label="Age"
      >
      {
        Array.isArray(data) && data.map(({ id, product }) => (
          <MenuItem value={id}>
            {product}
          </MenuItem>
        ))
      }
    </Select>
    </FormControl>
  );
}
