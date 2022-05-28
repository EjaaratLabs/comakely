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
import { getScreenMode } from '../../reducers/ChildProfileSlice'


export function ChildManagement() {

  const screen1 = useSelector(state => state.childProfile.screenMode);
  const [screen, setScreenMode] = useState("list");
  const [details, setProfileDetails] = useState({});
  const [detailsMode, setDetailsMode] = useState("add");

  var screenModule = <div></div>


  if (screen == "list") {
    screenModule = <ChildList
      openNewProfile={() => {
        setDetailsMode("add")
        setScreenMode("addscreen")
        setProfileDetails(null)
      }}
      openProfileDetails={(details) => {
        setDetailsMode("edit")
        setProfileDetails(details)
        setScreenMode("details")
      }} />;
  }
  else if (screen == "addscreen") {
    screenModule = <ChildSetup details={details} detailsMode={detailsMode} closeProfileDetails={() => {
      setScreenMode("list")
    }} />;
  }
  else if (screen == "details") {
    screenModule = <ChildProfile details={details} closeProfileDetails={() => {
      setScreenMode("list")
    }} />;
  }
  return (
    screenModule
  );
}
