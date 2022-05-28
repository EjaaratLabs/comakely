import React, { useState } from 'react';


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


export function GridButton(props){
console.log(props.color)
  return (
    <MDBBtn tag='a' color='none'  style={{ color: props.color }} href="/home/donors/profile/123">
      <MDBIcon fas icon={props.iconName} size="lg"  />
    </MDBBtn>
  );
}
