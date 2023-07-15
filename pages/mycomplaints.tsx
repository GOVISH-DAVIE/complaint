import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import MyComplaintsComponent from '../src/components/myComplaints'

const MyComplaints: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return (
        <MyComplaintsComponent />
  )
}

export default MyComplaints;