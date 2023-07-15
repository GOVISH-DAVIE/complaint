'use client'
import { NextPage } from "next";
import LoginComponent from "../src/components/Auth/login";
import { useState, useEffect } from 'react'

const LoginPage: NextPage = () => {
  const [isloaded, setIsloaded] = useState(false)
  useEffect(() => {
    setIsloaded(true)
  }, [])
  return <LoginComponent />
  

}


export default LoginPage;