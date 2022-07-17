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
import { getVendorOrder, GetVendorOrdersAsync, PostOrderStatusAsync } from '../reducers/OrderSlice';
import { VendorProfileManagement } from './VendorProfileManagement';
import { BuyerProfileManagement } from './BuyerProfileManagement';
import { AsProfileManagement } from './ASProfileManagement';

export function ProfileWrapper() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const userProfileData = useSelector(getUserProfileData);
  var body = <div></div>
  if (userProfileData?.info?.usertype == "1") {
    body = <VendorProfileManagement />
  }
  if (userProfileData?.info?.usertype == "2") {
    body = <BuyerProfileManagement />
  }
  if (userProfileData?.info?.usertype == "3") {
    body = <AsProfileManagement />
  }
  return (
    body
  );
}
