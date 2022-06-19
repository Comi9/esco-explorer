import { useState, useRef } from 'react'
import Head from 'next/head'
import { ArrowRightIcon as GetDataIcon, XIcon } from '@heroicons/react/outline'

const Layout = ({ children, getData }) => {
  const searchInputRef = useRef();
  const [url, setUrl] = useState('https://esco.ec.europa.eu/sites/default/files/astronom.json');
  const handleOnChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }
  const clearInput = () => {
    setUrl('')
    searchInputRef.current && searchInputRef.current.focus()
  }

  return (
    <>
      <Head>
        <title>ESCO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="flex bg-blue-700 p-6 items-center justify-between shadow-sm text-white">
          <div className="flex-none w-14">
            <div>ESCO</div>
          </div>
          <div className="grow mx-4">
            <div className="mt-1 relative flex items-center">
              <input ref={searchInputRef} onChange={handleOnChange} value={url || ''} type="url" className="form-input px-4 py-3 rounded-full text-black w-full" />
              {url && <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button onClick={clearInput} className="inline-flex items-center border border-gray-200 rounded-full px-2 text-sm font-sans font-medium text-gray-400 hover:border-red-500 hover:text-red-500 cursor-pointer">
                  <XIcon className="h-6 w-5" />
                </button>
              </div>}
            </div>
          </div>
          <div className="flex-none w-14">
            <button onClick={() => getData(url)} type="submit" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-indigo-500 bg-white hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 hover:text-indigo-800">
              <GetDataIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className='relative flex flex-grow'>
          <main className='bg-gray-100 flex-1 p-6 overflow-y-auto'> {children} </main>
        </div>
      </div>
    </>
  )
}

export default Layout