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
  MDBInput,

} from 'mdb-react-ui-kit';

import {
  BrowserRouter as Router, Routes, Route, Link, useParams,
  useMatch
} from "react-router-dom";

import { ChildSetup } from './ChildSetup';
import { ChildList } from './ChildList';
import { ChildProfile } from './ChildProfile';


export function ChildManagement() {



  return (
    <Routes>
      <Route path={`list`} element={<ChildList />} />
      <Route path={`details/:childId`} element={<ChildProfile />} />
      <Route path={`add`} element={<ChildSetup />} />
    </Routes>
  );
}
