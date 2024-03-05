import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function Auth(props) {
  const { Component } = props
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = Cookies.get('accessToken')
    const name = Cookies.get('name')
    if (isLoggedIn == undefined && name == undefined) {
      navigate('/admin-login')
    }
  })
  
  return (
    <>
      <Component />
    </>
  )
}

export default Auth
