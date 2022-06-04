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
  MDBTabsContent,
  MDBTabsPane,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabs,
  MDBBreadcrumbItem,
  MDBBreadcrumb,
  MDBCardHeader,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBModalContent,
  MDBCheckbox,
  MDBFile
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData, getUserProfileData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { postAnAd } from '../reducers/AdSlice';
import Avatar from 'react-avatar';
import StarRatings from 'react-star-ratings';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import DataTable from 'react-data-table-component';
import { PostVendorProfileAsync } from '../reducers/VendorSlice';
import { GetBlogListAsync, getBlogs } from '../reducers/BlogSlice';

export function Blog() {
  const token = useSelector(getToken);

  const dispatch = useDispatch();

  let navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {

    dispatch(GetBlogListAsync({ token }));
  }, []);
  const blogs = useSelector(getBlogs);

  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }
  var blogList = [];
  blogs.forEach((val) => {
    blogList.push(<MDBCard className=' mb-4'>
      <MDBCardBody className='text-start '>
        <h3>{val.title}</h3>
        <p>{val.createdon}-{val.createdby}</p>
        <br />
        <div className="content" dangerouslySetInnerHTML={{__html: val.brief}}></div>
      </MDBCardBody>
    </MDBCard>)
  })

  return (
    <div>

      <Navbar />


      <MDBContainer>
        <MDBRow className='d-flex justify-content-start py-5'>
          <MDBCol size='12' className='text-start my-2'>
            <h1>Our Blog</h1>
            <hr></hr>
          </MDBCol>
          <MDBCol size='8' className='text-start my-2'>
            {blogList}
          </MDBCol>

        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
