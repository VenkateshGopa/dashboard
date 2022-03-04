import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const redir = (path:string) =>{
    router.push(path)
  }
  return (
  <>
   <div className="fixed top-0 left-0 w-full text-bold flex flex-row z-50 text-black bg-slate-400 p-5 justify-between items-center">
        <p className="text-3xl sm:text-4xl">Dashboard</p>
        <div className="flex flex-row">
            <p className= {router.pathname == "/" ? "px-3 hover:cursor-pointer text-bold text-black bg-gray-300 rounded" : "px-3 hover:cursor-pointer text-bold text-black "} onClick={() => redir('/')}>Home</p>
            <p className= {router.pathname == "/home" ? "px-3 hover:cursor-pointer text-bold text-black bg-gray-300 rounded" : "px-3 hover:cursor-pointer text-bold text-black "} onClick={() => redir('/home')}>Search</p>
        </div>
    </div>
  <div className='my-16'>
  <Component {...pageProps} />
  </div>
  </>);
}

export default MyApp
