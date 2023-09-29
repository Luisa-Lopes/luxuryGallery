
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header'
import Slide from '../components/slide'
import Grid from '../components/grid'
import { useLocation } from "react-router-dom";
import Filter from "../components/filter";
import Data from '../utils/data'
import Footer from '../components/footer'

function Topics() {
  const query = useParams()
  const name = query.name

  const location = useLocation()
  const searchPathname = location.search
  const search = searchPathname.split("?search=");

  const [changeData, setChangeData] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {

    Data().then(results => setData(results[name]))
    setChangeData(false)
  }, [name, changeData])
  /*
    useEffect(() => {
  
      const newCollections = data.map(collection => {
          var storage = JSON.parse(localStorage.getItem("favorites")) || []
          const index = storage.findIndex(item => item === collection.id)
          if (index !== -1) collection.favorite = true
          else collection.favorite = false
          return collection
      }
      )
  
      setData(newCollections);
      setChangeData(false)
  },[changeData])*/

  return (
    <div>
      <Header />
      {search[1] !== '' && search[1] !== undefined ?
        (<section className="w-full">
          <Filter searchValue={search[1]} />
        </section>)
        :
        (
          <div>
            {data.length !== 0 && <Slide wallpapers={data} title={name} />}
            <section className='p-10'>
              {data.length !== 0 && <Grid photos={data} changed={setChangeData} />}
            </section>
          </div>
        )
        }
        <Footer/>
    </div>
  )
}

export default Topics