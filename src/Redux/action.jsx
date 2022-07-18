import * as types from './actionTypes'
import axios from 'axios'

export const getCountries=()=>(dispatch)=>{

     dispatch({type:types.GET_COUNTRIES_REQUEST})
     axios.get("http://localhost:8080/countries")
    .then((res)=>dispatch({type:types.GET_COUNTRIES_SUCCESS,payload:res.data}))
    .catch(()=>dispatch({type:types.GET_COUNTRIES_FAILURE}))
}

export const deleteCountries=(id)=>(dispatch)=>{
   
    dispatch({type:types.DELETE_COUNTRY_REQUEST})
    axios.delete("http://localhost:8080/countries/"+id)
   .then(()=>{
    dispatch({type:types.GET_COUNTRIES_SUCCESS})
    dispatch(getCountries())
   })
   .catch(()=>dispatch({type:types.DELETE_COUNTRY_FAILURE}))
}
export const updateCountries=({data,id})=>(dispatch)=>{
   
    dispatch({type:types.UPDATE_COUNTRY_REQUEST})
    axios.put("http://localhost:8080/countries/"+id,data)
    .then(()=>{
        dispatch({type:types.UPDATE_COUNTRY_SUCCESS})
        dispatch(getCountries())
       })
   .catch(()=>dispatch({type:types.UPDATE_COUNTRY_FAILURE}))
}
