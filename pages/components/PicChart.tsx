import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip , ResponsiveContainer} from "recharts";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";


const COLORS = ["#fef08a", "#f87171", "#86efac"];

interface chartdata {
    name:string
    value:number
}

// interface datatype{
//     ThreeLetterSymbol:string
//     Country:string
// }
export default function PieCharts() {
    // const [states, setstates] = useState<datatype []>([]);
    const [data, setdata] = useState<chartdata []>([]);
    const [loading, setloading] = useState<boolean>(true);

    const router = useRouter()
    
    useEffect(() => {
        if(!router.isReady) return;
            
        const getdata = async() => {
            const res= await axios.request({
                method: 'GET',
                url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
                headers: {
                'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
                'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
                }
            })
           const search = res.data.find( (ele: { ThreeLetterSymbol: string }) => ele.ThreeLetterSymbol === router.query.iso)
           const res1 = await axios.request({
            method: 'GET',
            url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${search.Country}/${search.ThreeLetterSymbol}`,
            headers: {
              'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
              'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
            }
          })
          setdata([{name:"ActiveCases" ,value:res1.data[0].ActiveCases }, {name:"TotalDeaths" ,value:res1.data[0].TotalDeaths},{name:"TotalRecovered" ,value: +res1.data[0].TotalRecovered} ])
        }
        setloading(true)
        getdata();
        setloading(false)
      }, [router]);

  return (
    <>
    <div className='m-auto w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full pt-10'> 
    <label className="text-gray-600">Total Cases</label> 
    </div>
    <div className='m-auto p-1 my-2 w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full bg-neutral-900 md:p-10 mb-20 rounded'>
        {loading && <div className="m-16 p-12 -z-10"><Spinner/></div>}
        {!loading && 
        <ResponsiveContainer width="100%" height={300}>
        <PieChart width={800} height={400}>
        <Legend/>
        <Tooltip/>
        <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        >
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
    </PieChart>
    </ResponsiveContainer>}
  </div>
  </>
  );
}
