import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { isEmpty } from 'lodash'

const Home = () => {
  const [data, setData] = useState({});
  const fetchData = async url => {
    if (!url) {
      alert('Please add a valid URL!')
      return;
    }
    const res = await fetch(`/api/data?requestURL=${url}`)
    const data = await res.json()
    setData(data)
  }

  return (
    <Layout getData={fetchData}>
      <Table data={data} />
    </Layout>
  )
}

export default Home
