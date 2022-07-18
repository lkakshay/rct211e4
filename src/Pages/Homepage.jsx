import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../Redux/action";
import { deleteCountries } from "../Redux/action";
import { useSearchParams } from "react-router-dom";
import * as types from '../Redux/actionTypes'


const Homepage = () => {

  const dispatch=useDispatch()
  const [searchParams,setSearchParams] = useSearchParams()
  console.log(searchParams)

  const data= useSelector((state)=>state.countries)

  const HandleSort=(e)=>{
    setSearchParams({order:e})
  }


  useEffect(()=>{
    
    dispatch(getCountries())

  },[])

  useEffect(()=>{
    // dispatch({type:types.GET_COUNTRIES_SUCCESS,payload:res.data})
   const value=searchParams.getAll('order')
   const Array=[...data]
   if(value==="asc"){
    Array?.sort((e)=>+(e.population)- +(e.population))
    dispatch({type:types.GET_COUNTRIES_SUCCESS,Array})
   }
   

  },[searchParams])



  return (
    <Box>
      <Flex padding="0 1rem" mb="2rem">
        <Text fontWeight="700" paddingRight="1rem">
          Sort by country population
        </Text>
        <RadioGroup onChange={(e)=>HandleSort(e)}>
          <Stack direction="row">
            <Radio  data-cy="asc" value="asc">
              Ascending
            </Radio>
            <Radio data-cy="desc" value="desc">
              Descending
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Capital</Th>
              <Th>Population</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody data-cy="table-body">
            {/* map through the fetched country list, to form table rows */}
            {data?.map((e)=>(
              <Tr key={e.id}>
              <Th>{e.country}</Th>
              <Th>{e.city}</Th>
              <Th>{e.population}</Th>
              <Th> <Link to={`/country/${e.id} `}><Button colorScheme='blue'>Edit</Button></Link></Th>
              <Th> <Button colorScheme='red' onClick={()=>dispatch(deleteCountries(e.id))}>Delete</Button></Th>
            </Tr>

            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Homepage;
