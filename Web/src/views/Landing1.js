import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/App.scss';
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
  MDBDropdown,
  MDBDropdownLink,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu
} from 'mdb-react-ui-kit';
import { Login } from './Authentication/Login'
import { ChildManagement } from './ChildManagement/ChildManagement'
import { DonorManagement } from './DonorManagement/DonorManagement'
import {
  BrowserRouter as Router, Routes, Route, Link, useParams,
  useMatch
} from "react-router-dom";
import { getToken, resetToken } from '../reducers/AuthSlice'
import { Navigate, useLocation } from 'react-router-dom';
import logo from '../assets/orpahan.png'

export function Landing() {
  const token = useSelector(getToken);
  let location = useLocation();
  let dispatch = useDispatch();

  if (!token) {

    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }
  return (
    <div style={{ height: "100%" }} >
      <div className="w-100 d-flex" style={{ height: "100%", backgroundColor: "#E4E8F1" }}>
        <div className="custom-sidebar">
          <div className="custom-sidebar-logo ">
            <img src={logo} style={{ width: "50px", paddingRight: "5px" }} /> <div>Orphan Care Portal</div>
          </div>

          <div className="custom-sidebar-menu-item">
            <div className={"custom-sidebar-menu-item-inner " + (location &&location.pathname == "/home" ? "custom-sidebar-menu-item-inner-active" : "")}>
              Dashboard
            </div>
          </div>
          <div className="custom-sidebar-menu-item">
            <div className={"custom-sidebar-menu-item-inner " + (location &&location.pathname.includes( "/home/child/") ? "custom-sidebar-menu-item-inner-active" : "")}>
              <Link to={`/home/child/list`} >Children Management</Link>
            </div>
          </div>
          <div className="custom-sidebar-menu-item ">
            <div className={"custom-sidebar-menu-item-inner " + (location &&location.pathname .includes("/home/donors/") ? "custom-sidebar-menu-item-inner-active" : "")}>
              <Link to={`/home/donors/list`} >Donor Management</Link>
            </div>
          </div>
          <div className="custom-sidebar-menu-item ">
            <div className="custom-sidebar-menu-item-inner">
              <Link to={`/home/donors/list`} >Bulk Operations</Link>
            </div>
          </div>
          <div className="custom-sidebar-menu-item " >
            <div className="custom-sidebar-menu-item-inner">
              <Link to={`/home/donors/list`} >Transactions Approval</Link>
            </div>
          </div>
          <div className="custom-sidebar-menu-item ">
            <div className="custom-sidebar-menu-item-inner">
              Reports
            </div>
          </div>
          <div className="custom-sidebar-menu-item ">
            <div className="custom-sidebar-menu-item-inner">
              System configurations
            </div>
          </div>
        </div>
        <div className="custom-sidebar-content">
          <div className="custom-sidebar-content-nav">
            <MDBDropdown className='py-2 px-4'>
              <MDBDropdownToggle tag='a' style={{ color: "black" }} >
                Welcome, Ashar
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem>
                  <MDBDropdownLink href="#">Profile</MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>

                <MDBDropdownLink href="#"><Link to="#" onClick={()=>{dispatch(resetToken())}} >Log Out</Link></MDBDropdownLink>
                </MDBDropdownItem>

              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
          <Routes>
            <Route path={`child/*`} element={<ChildManagement />} />
            <Route path={`donors/*`} element={<DonorManagement />} />

          </Routes>

        </div>
      </div>
    </div>
  );
}

