import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
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
  MDBCarousel,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownLink
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo1.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/fb.png'
import item2 from '../assets/insta.png'
import item3 from '../assets/in.png'
import item4 from '../assets/tw.png'


export function Footer() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBFooter backgroundColor='light'  >
      <div className='w-100 text-start py-5' style={{ backgroundColor: "#0A043C" }}>
        <MDBRow className=' mx-0'>
          <MDBCol size='4'>
            <img src={logo} style={{ height: "50px" }} className="mb-5" />
            <br />
            <div className='px-3' style={{ color: "white" }}>Terms and condition</div>
            <div className='px-3 mt-3' style={{ color: "white" }}>
              <img src={item1} className="mx-2" />
              <img src={item2} className="mx-2" />
              <img src={item3} className="mx-2" />
              <img src={item4} className="mx-2" />
            </div>
          </MDBCol>
          <MDBCol size='2'>
           
            <Link  to="#" style={{color:"white"}}> Home </Link><br/>
            <Link  to="#" style={{color:"white"}}> How it works </Link><br/>
            <Link  to="#" style={{color:"white"}}> Explore categories </Link><br/>
            <Link  to="#" style={{color:"white"}}> Sign up to post </Link><br/>
            <Link  to="#" style={{color:"white"}}> Our story </Link><br/>
            <Link  to="#" style={{color:"white"}}> Login </Link><br/>
          </MDBCol>
          <MDBCol size='2'>
           
           <Link  to="#" style={{color:"white"}}> Vendors </Link><br/>
           <Link  to="#" style={{color:"white"}}> Become a vendor </Link><br/>
           <Link  to="#" style={{color:"white"}}> Subscriptions </Link><br/>
           <Link  to="#" style={{color:"white"}}> Allied services </Link><br/>
           <Link  to="#" style={{color:"white"}}> Become a provider </Link><br/>
       
           <Link  to="#" style={{color:"white"}}> Projects </Link><br/>
         </MDBCol>
         <MDBCol size='2'>
           
           <Link  to="#" style={{color:"white"}}> Become a buyer </Link><br/>
           <Link  to="#" style={{color:"white"}}> Dashboards </Link><br/>
           <Link  to="#" style={{color:"white"}}> Admin </Link><br/>
           <Link  to="#" style={{color:"white"}}> Buyers </Link><br/>
           <Link  to="#" style={{color:"white"}}> Seller </Link><br/>
       
           <Link  to="#" style={{color:"white"}}> Contact </Link><br/>
         </MDBCol>
         <MDBCol size='2'>
           
           <Link  to="#" style={{color:"white"}}> FAQs </Link><br/>
           <Link  to="#" style={{color:"white"}}> Blog </Link><br/>
       
         </MDBCol>
        </MDBRow>

      </div>
      <div className='text-center py-3' style={{ backgroundColor: "#0A043C",color:"white"}}>
        <hr />
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-light' href='https://comakely.com/'>
          CoMakely, All rights Reserved
        </a>
      </div>
    </MDBFooter>
  );
}
