import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
  MDBInput
} from 'mdb-react-ui-kit';
import {
  BrowserRouter as Router, Routes, Route, Link, useParams,
  useMatch
} from "react-router-dom";
import { DonorSetup } from './DonorSetup';
import { DonorProfile } from './DonorProfile';
import { DonorList } from './DonorList';



export function DonorManagement() {

  return (
    <Routes>
      <Route path={`list`} element={<DonorList />} />
      <Route path={`details/:profileId`} element={<DonorProfile />} />
      <Route path={`add`} element={<DonorSetup />} />
    </Routes>

  );
}
