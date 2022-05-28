import React, { useState, useEffect } from 'react';
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
  MDBCardHeader,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';

import DataTable from 'react-data-table-component';
import { getToken, loginAsync } from '../../reducers/AuthSlice'
import { ChildDetails } from './ChildSetup';
import { GetChildProfilesListAsync, getProfiles } from '../../reducers/ChildProfileSlice'
import { Link } from 'react-router-dom';

const statusMap = { "1": "Active", "2": "Suspended", "3": "Dropped" }
  ;


export const ChildList = (props) => {
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
      //row.action
      name: 'Actions',
      selector: row => <Link to={"/home/child/details/" + row.regid}><MDBBtn color='warning' size='sm'>Details</MDBBtn> </Link>,
    },
  ]
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  useEffect(() => {

    dispatch(GetChildProfilesListAsync({ token }));
  }, []);
  const data = useSelector(getProfiles);



  return (
    <div className="p-4 text-start ">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a>Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>
          <a >Child</a>
        </MDBBreadcrumbItem>

      </MDBBreadcrumb>
      <MDBCard alignment='center' >
        <MDBCardHeader className="text-start"><h5> Child Management</h5></MDBCardHeader>
        <div className="w-100 d-flex p-4 justify-content-end" >
          <Link to={"/home/child/add"}> <MDBBtn >Add New</MDBBtn></Link>
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
