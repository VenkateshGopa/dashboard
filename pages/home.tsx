import axios from 'axios';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";

interface datatype{
  ThreeLetterSymbol:string
  Country:string
}
// interface global{
//   ActiveCases: string 
//   TotalCases: string
//   TotalDeaths:string
//   TotalRecovered:string
// }

const Home: NextPage = () => {
  // const [global, setglobal] =  useState<global>();
  const [data, setdata] = useState<datatype[]>([]);
  const [data1, setdata1] = useState<datatype[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(()=>{
    const getdata = async() => {
      const res= await axios.request({
          method: 'GET',
          url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
          headers: {
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
          }
      })
      // const res2= await axios.request({
      //   method: 'GET',
      //   url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
      //   headers: {
      //     'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      //     'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
      //   }
      // })
      // setglobal({ActiveCases: res2.data[0].ActiveCases, TotalCases:res2.data[0].TotalCases,TotalDeaths:res2.data[0].TotalDeaths,TotalRecovered:res2.data[0].TotalRecovered})
      // console.log({ActiveCases: res2.data[0].ActiveCases, TotalCases:res2.data[0].TotalCases,TotalDeaths:res2.data[0].TotalDeaths,TotalRecovered:res2.data[0].TotalRecovered})
      // console.log(res2.data)
     setdata(res.data);
     setdata1(res.data);
  }
  getdata();
  setloading(false)
  },[])

  const changeHandler = (event:any) =>{
    setdata( data1.filter( ele => ele.Country.toLowerCase().indexOf(event?.target.value.toLowerCase())>=0 || ele.ThreeLetterSymbol.toLowerCase().indexOf(event?.target.value.toLowerCase())>=0 ))
  }
  const submithandler = (name:string , code:string) =>{
    window.localStorage.setItem('code', code)
    window.localStorage.setItem('name', name)
    router.push(`/${code}`)
  }

  return (
  <>
  <div className='home'>
  {/* <p className='text-white'>{global?.ActiveCases} {global?.TotalCases} { global?.TotalDeaths} {global?.TotalRecovered}</p> */}
    <div className='p-5 py-12 w-11/12 bg-neutral-900 m-auto sm:p-20 sm:w-3/4 lg:w-1/2 rounded' >
      {/* <div> */}
      <p className='font text-white text-3xl'> Select a Country</p>
      <input className='w-full my-10 h-8 bg-neutral-700 rounded px-2 text-slate-200' type="text" onChange={changeHandler} placeholder="Select a Country.."/>
      {/* </div> */}
      <p className='text-gray-400 text-sm pb-4'>Suggestions</p>
      <div className=''>
      {data.length<=0 && <p className='text-slate-300'>No data Found</p>}
      {data.length>0 && data.map( ele => <p onClick={() => submithandler(ele.Country, ele.ThreeLetterSymbol)} className='text-white hover:bg-black hover:cursor-pointer p-5 rounded' key={ele.Country}>{ele.Country.toUpperCase()}({ele?.ThreeLetterSymbol})</p>)}
      </div>
    </div>
  </div>
  </>
  );
}

export default Home


