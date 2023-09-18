import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    //   <FormControl sx={{ m: 1, minWidth: 210 }}>
    //     <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
    //     <Select
    //       labelId="demo-simple-select-autowidth-label"
    //       id="demo-simple-select-autowidth"
    //       value={age}
    //       onChange={handleChange}
    //       autoWidth
    //       label="Age"
    //     >
    //        <MenuItem value="">
    //         <em>None</em>
    //       </MenuItem>
    //       <MenuItem value={10}>Twenty</MenuItem>
    //       <MenuItem value={21}>Twenty one</MenuItem>
    //       <MenuItem value={22}>Twenty one and a half</MenuItem>
    //     </Select>
    //   </FormControl>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 210 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
  );
}