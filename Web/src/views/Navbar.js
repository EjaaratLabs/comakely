import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate,Link } from 'react-router-dom';
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

import { getToken, loginAsync, resetToken, getUserData, fetchUserDetailsAsync, getUserProfileData } from '../reducers/AuthSlice'
import logo from '../assets/logo1.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'



export function Navbar() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchUserDetailsAsync({ token}));
  }, []);
  const userProfileData = useSelector(getUserProfileData);
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'><img src={logo} style={{ height: "50px" }} /></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav left>
            <MDBNavbarItem>
              <MDBDropdown group className='shadow-0' >
                <MDBDropdownToggle color='light' >Buyer</MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/business">Explore projects</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/signup">Become a buyer</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/post-business-ad">Post an ad</MDBDropdownLink>
                  </MDBDropdownItem>
       
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown group className='shadow-0'>
                <MDBDropdownToggle color='light'>Vendor</MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/vendor">Explore vendors</MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/products">Explore products</MDBDropdownLink>
                  </MDBDropdownItem>

                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown group className='shadow-0'>
                <MDBDropdownToggle color='light'>Allied Services</MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="/allied-services">Browse allied services</MDBDropdownLink>
                  </MDBDropdownItem>
                
        
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav right className='d-flex justify-content-end'>
          {token ? <MDBNavbarItem>
              <MDBDropdown group className='shadow-0'>
                <MDBDropdownToggle color='light'>Hi,{userData.Name}</MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#" ><Link className='mx-2' to="/profile-management" style={{color:"black"}}  >Profile Management</Link></MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#" ><Link className='mx-2' to="#" onClick={() => dispatch(resetToken())}  style={{color:"black"}}  >Messages</Link></MDBDropdownLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <MDBDropdownLink href="#" > <Link className='mx-2' to="#" onClick={() => dispatch(resetToken())}  style={{color:"black"}}  >Sign out</Link></MDBDropdownLink>
                  </MDBDropdownItem>
        
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>: <MDBBtn href='/login' style={{backgroundColor:"#30B4BA"}}>Login</MDBBtn>}
        
            {token ?  <MDBBtn className='mx-2' href='/post-business-ad' style={{ backgroundColor: '#F7D402', color: "black" }}>Post ad</MDBBtn>  : ""
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
