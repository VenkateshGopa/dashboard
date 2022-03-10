import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from "recharts";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
  
interface country {
    Continent:string
    Country: string
    date: string
    id: string
    new_cases: number
    new_deaths: number
    new_tests: number
    symbol: string
    total_cases: number
    total_deaths: number
    total_tests: number
  }

const LineGraphComponent = (props:any) =>{
    const [data, setdata] = useState<country []>([]);
    const [data1, setdata1] = useState<country []>([]);
    
    const [loading, setloading] = useState<boolean>(true);
    const router = useRouter()
    // const { iso } = router.query;
    // console.log(iso)

    useEffect(() => {
    if(!router.isReady) return;
      setloading(true)    
      axios.request<any>({
          method: "GET",
          url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${router.query.iso}`,
          headers: {
            "x-rapidapi-host":"vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            "x-rapidapi-key":"0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561",
          },
        })
        .then(function (response) {
          setdata(response.data.reverse());
          setdata1(response.data.reverse());
          console.log(response.data.reverse());
          setloading(false)
        })
        .catch(function (error) {
          console.error(error);
        });
    }, [router]);
    
    const setfilter = (date:string) =>{
      const filtered = data1?.filter(item => item.date.indexOf(date)>=0);
      setdata(filtered)
    }

    return(
    <div className="pt-14">
      <div className='m-auto w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full'> 
        <div className="fontsmall flex flex-row justify-between items-center">
            <p className="text-gray-600" >Daily Positive cases</p>
            <div className="flex flex-row gap-3 text-xs ">
            <p className="dark:text-white text-black hover:cursor-pointer " id="202" onClick={ () => setfilter("202")}> All </p>
            <p className="dark:text-white text-black hover:cursor-pointer " id='2021-09' onClick={ () => setfilter("2021-09")}> Sep 2021</p>
            <p className="dark:text-white text-black hover:cursor-pointer " id='2021-10' onClick={ () => setfilter("2021-10")}> Oct 2021</p>
            <p className="dark:text-white text-black hover:cursor-pointer " id='2021-11' onClick={ () => setfilter("2021-11")}> Nov 2021</p>
            <p className="dark:text-white text-black hover:cursor-pointer " id='2021-12' onClick={ () => setfilter("2021-12")}> Dec 2021</p>
            <p className="dark:text-white text-black hover:cursor-pointer " id='2022-01' onClick={ () => setfilter("2022-01")}> Jan 2022</p>
            </div>
        </div>
      </div>
      <div className='m-auto p-1 my-2 w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full dark:bg-neutral-900 bg-gray-100 md:p-10 shadow-xl rounded'> 
        {loading && <div className="m-16 p-12"><Spinner/></div>}    
        {!loading &&
            <ResponsiveContainer width="100%" height={250}>
            <LineChart  data={data} >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
            // tick={{ fill: "white" }}
            dataKey="date"
            padding={{ left: 30, right: 30 }}
            style={{fontSize: '0.5rem',}}
            />
            <YAxis  style={{fontSize: '0.5rem',}}/>
            <Tooltip />
            <Legend />
            <Line
            type="monotone"
            dataKey="new_cases"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false} 
            />
            {/* <Line type="monotone" dataKey="total_deaths" stroke="#82ca9d"  dot={false}  /> */}
        </LineChart>
        {/* #ff8ea2; */}
        </ResponsiveContainer>}
        </div>
      </div> 
    )
}

export default LineGraphComponent