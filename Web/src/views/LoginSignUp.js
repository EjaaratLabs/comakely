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
  MDBCarousel, MDBRadio, MDBBtnGroup
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData, registerAsync } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { Navbar } from './Navbar';
import { Footer } from './Footer';



export function SignUp() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [phone, setPhone] = useState('');
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  if (token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }
  let onClick = (nr) => () => {
    setUserType(nr)
  };

  return (
    <div>
      <Navbar />
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center py-5'>
          <MDBCard style={{ maxWidth: '44rem' }} className="p-5">
            <MDBCardBody>
              <MDBCardTitle><h2>Create new account</h2></MDBCardTitle>
              <MDBInput label="Username" className="mt-5 mb-2" icon="envelope" group type="email" validate error="wrong"
                success="right" value={userName} onChange={(e) => {
                  setUserName(e.target.value)
                }} />
              <MDBInput label="Password" className=" mb-2" icon="envelope" group type="password" validate error="wrong"
                success="right" value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} />
              <MDBInput label="Name" className="mb-2" icon="envelope" group type="text" validate error="wrong"
                success="right" value={name} onChange={(e) => {
                  setName(e.target.value)
                }} />
                   <MDBInput label="Phone" className="mb-5 mb-2" icon="envelope" group type="text" validate error="wrong"
                success="right" value={phone} onChange={(e) => {
                  setPhone(e.target.value)
                }} />
              <div className="mb-5">
                <p>You want to register as :</p>

                <MDBRadio name='inlineRadio' id='inlineRadio1' value='1' label='Vendor' inline onClick={onClick(1)} checked={userType == "1" ? true : false} />
                <MDBRadio name='inlineRadio' id='inlineRadio1' value='2' label='Buyer' inline onClick={onClick(2)} checked={userType == "2" ? true : false} />
                <MDBRadio name='inlineRadio' id='inlineRadio1' value='3' label='Allied Services' inline onClick={onClick(3)} checked={userType == "3" ? true : false} />
              </div>
              {/*href="/home" */}
              <MDBBtn onClick={() => dispatch(registerAsync({
                "userName": userName,
                "password": password,
                "name": name,
                "userType": userType,
                "phone":phone,
                "callback": () => {

                  setUserName("");
                  setPassword("");
                  setName("");
                  onClick(0);

                  return <Navigate to={{ pathname: '/', state: { from: location } }} />
                }
              }))} >Create Account</MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
