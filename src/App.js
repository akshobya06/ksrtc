import logo from './logo.svg';
import './App.css';
import {jsondata} from "./data"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from '@mui/material';



function App() {
const [value, setValue] = useState("");
const [inputValue, setInputValue] = useState("");
const [resu, setRes] = useState("");
 
useEffect(() => {
   
  

}, [value,inputValue ]);

const handleSubmit = event => {
  event.preventDefault();
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
 
  axios.post('https://ksrtc.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate='+today+'&startPlaceId='+value+'&endPlaceId='+inputValue+'').then(res => {
  
    setRes(res.data)
   
    
   }).catch(err => {
    
   });
 
}

  return (
    <div>
      <div>
        <h3 style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"100px"}}>Aksh & Suru KSRTC</h3>
      </div>
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"100px"}} className="">
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={jsondata}
      onChange={(event, newValue) => {
        setValue(newValue.id);
      }}
      key={(option) => option.id}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => <TextField {...params} label="Leaving From:" />}
    />
     <div style={{marginLeft:"25px"}}>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(event, newValue) => {
        setInputValue(newValue.id);
      }}
      options={jsondata}
      key={(option) => option.id}
      sx={{ width: 300 }}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => <TextField {...params} label="Going To:" />}
    /></div>
     <div style={{marginLeft:"25px"}}><Button variant="contained" onClick={handleSubmit}>Go</Button></div>
    
    </div>
   { resu ? 
   <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop:"100px"}} ><div  dangerouslySetInnerHTML={ {__html: resu} }  /> </div>  : ""
  }
  
    </div>
  );
}

export default App;
