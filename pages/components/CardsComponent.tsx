import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

interface states {
    Case_Fatality_Rate: number
    Recovery_Proporation: number
    TwoLetterSymbol: any
    active: number
    active_diff: number
    confirmed: number
    confirmed_diff: number
    date: string
    deaths: number
    deaths_diff: number
    fatality_rate: number
    iso: string
    name: string
    province: string
    recovered: number
    recovered_diff: number
}

const CardsComponent = () =>{
    const [states, setstates] = useState<states []>([]);
    const [selstate, setselstate] = useState<any>();
    const [loading, setloading] = useState<boolean>(true);

    const router = useRouter()
    
    useEffect(() => {
        if(!router.isReady) return;
          axios.request( {
            method: 'GET',
            url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/api-covid-data/reports/${router.query.iso}`,
            headers: {
              'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
              'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
            }
          }).then(function (response) {
            setstates(response.data);
            console.log(response.data);
            setloading(false)
          }).catch(function (error) {
            console.error(error);
          });
      }, [router]);
    
    const changehandler = (event:any) =>{
        console.log(event.target.value)
        setselstate(states.find( ele  => ele.province === event.target.value))
    }
    
    return(
    <div className="m-auto w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full mt-10">
        
        <div className=" flex justify-between mb-3 items-center">
        <label className="text-gray-600"> Choose State: </label>
        { states.length >1 &&
        <select onChange={changehandler} className='w-2/6 dark:bg-gray-900 bg-gray-100 dark:text-slate-300 text-black'>
            {states.map((state) => <option key={state.province} value={state.province}>{state.province}</option>)}
        </select>}
        </div>

        {loading && <div className='dark:bg-neutral-900 bg-gray-100 rounded'><div className="p-20"><Spinner/></div></div>}    
        {!loading && <>
        <div className="box flex flex-wrap space-between ">
        <div className="dark:bg-neutral-900 shadow-xl bg-gray-100 p-3 ">
            <p className="dark:text-blue-300 text-blue-600  md:text-xl lg:text-2xl pb-3">Confirmed Cases</p>
            <p className="dark:text-white text-black">{selstate?.confirmed || states[0]?.confirmed}</p>
        </div>
        <div className="dark:bg-neutral-900 shadow-xl bg-gray-100 p-3 ">
            <p className="dark:text-yellow-100 text-yellow-600  md:text-xl lg:text-2xl pb-3">Active Cases</p>
            <p className="dark:text-white text-black">{selstate?.active || states[0]?.active}</p>
        </div>
        <div className="dark:bg-neutral-900 shadow-xl bg-gray-100 p-3 ">
            <p className="dark:text-green-200 text-green-600  md:text-xl lg:text-2xl pb-3">Recovered Cases</p>
            <p className="dark:text-white text-black">{selstate?.recovered || states[0]?.recovered}</p>
        </div>
        <div className="dark:bg-neutral-900 shadow-xl bg-gray-100 p-3 ">
            <p className="dark:text-red-200 text-red-600 md:text-xl lg:text-2xl pb-3">Deaths</p>
            <p className="dark:text-white text-black">{selstate?.deaths || states[0]?.deaths}</p>
        </div>
        </div>
        </>
        }
    </div>
    )
}

export default CardsComponent