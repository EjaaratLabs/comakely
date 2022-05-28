import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GridButton } from '../../CustomComponents/GridButton';

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
  MDBCardHeader,
  MDBBadge,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';

import DataTable from 'react-data-table-component';
import { getToken, loginAsync } from '../../reducers/AuthSlice'
import { GetDonorProfilesListAsync, getProfiles,changeScreen,openDetails } from '../../reducers/DonorProfileSlice'
import { Link } from 'react-router-dom';

const statusMap = { "1": "Active", "2": "Suspended", "3": "Dropped" }
  ;


export const DonorList=(props)=> {

  const dispatch = useDispatch();

  const columns = [
    {
      name: 'Registration ID',
      selector: row => row.regid,
    },
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Status',
      selector: row => statusMap[row.status],
    },
    {
      name: 'Payment Status',
      selector: row => row.paymentStatus,
    },
    {
      name: 'Actions',
      selector: row =>  <Link to={"/home/donors/details/"+row.regid}><MDBBtn color='warning' size='sm'>Details</MDBBtn> </Link>,
    },
  ];
 
  const token = useSelector(getToken);
  useEffect(() => {

    dispatch(GetDonorProfilesListAsync({ token }));
  }, []);
  const data = useSelector(getProfiles);

  return (
    <div className="p-4 text-start ">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a>Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>
          <a >Donors</a>
        </MDBBreadcrumbItem>

      </MDBBreadcrumb>
      <MDBCard alignment='center' >
        <MDBCardHeader className="text-start"><h5> Donor Management</h5></MDBCardHeader>
        <div className="w-100 d-flex p-4 justify-content-end" >
         <Link to={"/home/donors/add"}  >
          <MDBBtn   onClick={() => {
          //  dispatch(changeScreen("addprofile"))
          }}   >Add New</MDBBtn></Link>
        </div>
        <MDBRow>
          <MDBCardBody>
            <DataTable
              pagination="true"
              columns={columns}
              data={data}

            />
          </MDBCardBody>
        </MDBRow>
      </MDBCard>

    </div>
  );
}
