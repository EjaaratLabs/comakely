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
import { postAnAd } from '../reducers/AdSlice';
import { Navbar } from './Navbar';


export function VendorAd() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  if (!token) {
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
              <MDBCardTitle><h2>Post an ad for vendor</h2></MDBCardTitle>
              <MDBInput label="Title" className="mt-5 mb-2" icon="envelope" group type="text" validate error="wrong"
                success="right" value={title} onChange={(e) => {
                  setTitle(e.target.value)
                }} />
              <MDBInput label="Description" className="mb-5 mb-2" icon="envelope" group type="text" validate error="wrong"
                success="right" value={description} onChange={(e) => {
                  setDescription(e.target.value)
                }} />

              {/*href="/home" */}
              <MDBBtn onClick={() => dispatch(postAnAd({
                "data": {
                  "title": title,
                  "desc": description,
                  "adType": "2"
                },
                "token": token,
                "callback": () => {
                  return <Navigate to={{ pathname: '/', state: { from: location } }} />
                }
              }))} >Submit</MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>


      <MDBFooter backgroundColor='light' className='text-center text-lg-left'>


        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-dark' href='https://mdbootstrap.com/'>
            CoMakely, All rights Reserved
          </a>
        </div>
      </MDBFooter>

    </div>
  );
}
