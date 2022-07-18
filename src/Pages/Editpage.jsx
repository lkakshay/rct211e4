import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateCountries } from "../Redux/action";
import { useDispatch } from "react-redux";

export const Editpage = () => {

  const {id}=useParams()
  const [data,setdata]=useState({})
  const navigte=useNavigate()
  const dispatch=useDispatch()

  const handleUpdate=()=>{
    dispatch(updateCountries({data,id}))
    navigte('/')
  }

 useEffect(()=>{
  axios.get("http://localhost:8080/countries/"+id)
  .then((res)=>setdata(res.data))
 },[id])

  return (
    <Box>
      <Heading>Edit Page</Heading>
      <Box>
        <Text>Capital City</Text>
        <Input value={data?.city} onChange={(e)=>setdata({...data,city:e.target.value})} data-cy="capital-city" />
      </Box>
      <Box>
        <Text>Population</Text>
        <Input  value={data?.population}  onChange={(e)=>setdata({...data,population:e.target.value})} data-cy="population" />
      </Box>
      <Button  onClick={handleUpdate} data-cy="update-button">Update</Button>
    </Box>
  );
};

export default Editpage;
