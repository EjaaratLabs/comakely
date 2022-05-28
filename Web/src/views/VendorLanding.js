import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  MDBCarousel,
  MDBCheckbox
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'


import place from '../assets/profile.png'

import { getAds, GetAdsListAsync } from '../reducers/AdSlice';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GetVendorListAsync, getVendors } from '../reducers/VendorSlice';

export function VendorLanding() {
  let params = useParams();
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(GetVendorListAsync({ token}));
  }, []);
  const data = useSelector(getVendors);
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("");
  var list = [];
  if (data) {
    var temp=data;
    if(search)
    {
      temp=data.filter((x)=>(x.Name&&x.Name.toLowerCase().includes(search.toLowerCase())) )
    }
    temp.forEach(val => {
      list.push(<MDBCol size='9' className='my-1'>
        <MDBCard className="py-2">
          <MDBCardBody className='text-start'>
            <MDBRow>
              <MDBCol size='8' className='d-flex'>
               <div>
                 <img src={place} height="80px"/>
               </div>
               <div className='py-2'>
<h5>{val.Name}</h5>
<div>Karachi</div>
               </div>
              </MDBCol>
              <MDBCol size='4' className='text-end'>
             
                <MDBBtn href={'/profile/'+val.UserName} style={{ backgroundColor: "#30B4BA" }} >View profile</MDBBtn></MDBCol>
            </MDBRow>


          </MDBCardBody>
        </MDBCard>
      </MDBCol>)
    })
  }
  if (!token) {
 
    return <Navigate to={{ pathname: '/login', state: { from: location } }} />
    // setUserName("")
  }

  return (
    <div>
      <Navbar />
      <MDBContainer>

        <h3 className='pt-5  '>Vendors available for {params&& params.vendorCategory?params?.vendorCategory:"services"}</h3>
        <MDBRow className='d-flex justify-content-center '>
      
        </MDBRow>
        <MDBRow className='d-flex justify-content-start py-2'>
        <MDBCol size='3'>
            <MDBCard>

              <MDBCardBody className='text-start'>
              <MDBInput label="Search vendor" className=" mb-2" icon="envelope" group type="text" validate error="wrong"
              success="right" value={search} onChange={(e) => {
                setSearch(e.target.value)
              }} />
                <br />
                <h5>Categories</h5>
                <MDBCheckbox name='flexCheck' value='Leather' id='flexCheckDefault' label='Leather' />
                <MDBCheckbox name='flexCheck' value='Apparel & textile' id='flexCheckChecked' label='Apparel & textile' />
                <MDBCheckbox name='flexCheck' value='Footware' id='flexCheckChecked' label='Footware' />
                <MDBCheckbox name='flexCheck' value='Printing & packaging' id='flexCheckChecked' label='Printing & packaging' />
                <MDBCheckbox name='flexCheck' value='Soaps & detergents' id='flexCheckChecked' label='Soaps & detergents' />
                <MDBCheckbox name='flexCheck' value='Food & beverages' id='flexCheckChecked' label='Food & beverages' />
                <hr />
                <h5>Location</h5>
                <select className="form-select">
                  <option>---All---</option>
                  <option value="1">Karachi</option>
                  <option value="2">Lahore</option>
                  <option value="3">Islamabad</option>
                </select>
               

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='8'>
            {list}
          </MDBCol>

        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
