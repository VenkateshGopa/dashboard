import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
import Threedotsloading from "./components/threedotsloading";
// import Spinner from './components/Spinner';

interface global{
    ActiveCases: string 
    TotalCases: string
    TotalDeaths:string
    TotalRecovered:string
}

const Test:NextPage = () =>{
  const [global, setglobal] =  useState<global>();
  const [country, setcountry] = useState();
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(()=>{
    const getdata = async() => {
      const res= await axios.request({
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
        headers: {
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
        }
      })
      const res2= await axios.request({
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries',
        headers: {
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
        }
      })
      setcountry(res2.data)
      setglobal({ActiveCases: res.data[0].ActiveCases, TotalCases:res.data[0].TotalCases,TotalDeaths:res.data[0].TotalDeaths,TotalRecovered:res.data[0].TotalRecovered})
      console.log({ActiveCases: res.data[0].ActiveCases, TotalCases:res.data[0].TotalCases,TotalDeaths:res.data[0].TotalDeaths,TotalRecovered:res.data[0].TotalRecovered})
      setloading(false)
  }
  getdata();
  },[])
  
    return(
    <>
    <div className="flex flex-col mt-20 sm:mt-10 sm:flex-row items-start">
      <div className="w-11/12 m-3 sm:w-1/2 sm:m-10 ">
        <p className="text-5xl sm:text-7xl text-white pb-10">Covid-19</p>
        <p className="text-slate-300 pb-6">Global Cases</p>

        <div className="bg-neutral-900 p-3 ">
            <p className="text-blue-200  md:text-sm lg:text-lg pb-1">Total Cases</p>
            {!loading ? <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.TotalCases}</p> : <Threedotsloading/>}

            <p className="text-green-200 md:text-sm lg:text-lg pb-1">Recovered Cases</p>
            {!loading ? <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.TotalRecovered}</p> :<Threedotsloading/>}
            {/* <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.TotalRecovered}</p> */}

            <p className="text-yellow-200  md:text-sm lg:text-lg pb-1">Active Cases</p>
            {!loading ? <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.ActiveCases}</p> : <Threedotsloading/>}
            {/* <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.ActiveCases}</p> */}

            <p className="text-red-200  md:text-sm lg:text-lg pb-1">Deaths</p>
            {!loading ? <p className="text-white pb-8  md:text-3xl lg:text-4xl">{global?.TotalDeaths}</p> : <Threedotsloading/>}
            {/* <p className="text-white pb-8  md:text-3xl lg:text-4xl">{ global?.TotalDeaths}</p> */}
        </div>
      </div>
    
    <div className="w-11/12 sm:w-1/2 countrygraph  overflow-y-scroll ">
    <p className="text-slate-300 pb-6 m-3 sm:mx-10">Country Wise Cases</p>
    {loading && <div className="w-3/4 py-72 m-auto bg-neutral-900"><Spinner/></div>}    
    {!loading &&
    <ResponsiveContainer width="100%" height={12000}>
    <BarChart 
        // width={600} 
        // height={12000} 
        data={country} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="Country" />
        {/* <CartesianGrid strokeDasharray="3 3"/> */}
        <Tooltip/>
        <Legend />
        <Bar dataKey="TotalCases"  fill="#8884d8" />
        <Bar dataKey="TotalRecovered"  fill="#4ade80" />
        <Bar dataKey="ActiveCases"  fill="#fde047" />
        <Bar dataKey="TotalDeaths" fill="#dc2626" />
    </BarChart>
    </ResponsiveContainer>}
    </div>
    </div>
    </>
    );
}

export default Test;