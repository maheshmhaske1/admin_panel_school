// Login.js

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from 'src/utility/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate() // Initialize the useNavigate hook

  const handleLogin = async () => {
    // Simple validation example, you can replace this with your own validation logic
    if (!email) {
      setEmailError('Please enter a email.')
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Please enter a password.')
    } else {
      setPasswordError('')
    }

    // If validation passes, log data to the console
    if (email && password) {
      console.log('Login Data:', { email, password })
      const data = {
        email,
        password,
      }

      try {
        const response = await loginUser(data)

        if (response.success) {
          setTimeout(() => {
            navigate('/dashboard')
          }, 2000)
          
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })

          
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        }
      } catch (error) {
        console.log(error)
        console.error('Error during login:', error)
        toast.error('An error occurred during login.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={2}></CCol>
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Admin Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    {emailError && <div className="text-danger">{emailError}</div>}
                    <CInputGroup className="mb-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <CCol md={2}></CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Login
