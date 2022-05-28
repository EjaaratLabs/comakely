import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBNavbarBrand,
  MDBCollapse,
  MDBCarouselElement,
  MDBCarouselCaption,
  MDBCarouselItem,
  MDBCarouselInner,
  MDBCarousel
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { Navbar } from './Navbar';
import { Footer } from './Footer';



export function Login() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  if (token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }

  return (
    <div>

      <Navbar />
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center py-5'>
          <MDBCard style={{ maxWidth: '44rem' }} className="p-5">
            <MDBCardBody>
              <MDBCardTitle><h2>Login</h2></MDBCardTitle>
              <MDBInput label="Username" className="mt-5 mb-2" icon="envelope" group type="email" validate error="wrong"
                success="right" value={userName} onChange={(e) => {
                  setUserName(e.target.value)
                }} />
              <MDBInput label="Password" className="mb-5 mb-2" icon="envelope" group type="password" validate error="wrong"
                success="right" value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} />

              {/*href="/home" */}
              <MDBBtn onClick={() => dispatch(loginAsync({
                "userName": userName,
                "password": password
              }))} >Login</MDBBtn>
              <hr />
              <h3>Didn't signed up yet ?</h3>
              <MDBBtn color="success" href='/signup' >Sign up Now</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>


      <Footer/>

    </div>
  );
}
