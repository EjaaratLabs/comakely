import React, { useState, useEffect } from 'react';
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
  MDBCarousel
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { postAnAd } from '../reducers/AdSlice';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function BusinessAd() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [quantity, setQty] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);

  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }


  return (
    <div>

      <Navbar />
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center py-5'>
          <MDBCard style={{ maxWidth: '44rem' }} className="p-5">
            <MDBCardBody>
              <MDBCardTitle><h2>Add new project advertisment</h2></MDBCardTitle>
              <div>Please enter your project requirements</div>
              <hr />
              <h4>Product details</h4>
              <MDBRow className='my-1'>
                <MDBCol size='6'>
                  <MDBInput label="Project name" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={title} onChange={(e) => {
                      setTitle(e.target.value)
                    }} />
                </MDBCol>
                <MDBCol size='6'>
                <select className="form-select">
                  <option value={"-1"}>---Select---</option>
                  <option value="Leather">Leather</option>
                  <option  value='Apparel & textile'>Apparel & textile</option>
                  <option value='Footware' >Footware</option>
                  <option value='Printing & packagin'>Printing & packaging</option>
                  <option  value='Soaps & detergents'>Soaps & detergents</option>
                  <option value='Food & beverages'>Food & beverages</option>
                </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className='my-1'>
                <MDBCol size='6'>
                  <MDBInput label="Quantity of product desired" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={quantity} onChange={(e) => {
                      setQty(e.target.value)
                    }} />
                </MDBCol>
                <MDBCol size='6'>
                  <MDBInput label="Product size" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={size} onChange={(e) => {
                      setSize(e.target.value)
                    }} />
                </MDBCol>
              </MDBRow>
              <MDBRow className='my-1'>
                <MDBCol size='6'>
                  <MDBInput label="Product color" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={color} onChange={(e) => {
                      setColor(e.target.value)
                    }} />
                </MDBCol>
                <MDBCol size='6'>
                  <MDBInput label="Product weight" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={weight} onChange={(e) => {
                      setWeight(e.target.value)
                    }} />
                </MDBCol>
              </MDBRow>
              <MDBRow className='my-1'>
                <MDBCol size='12'>
                  <MDBInput label="Product description" className="" icon="envelope" group type="text" validate error="wrong"
                    success="right" value={description} onChange={(e) => {
                      setDescription(e.target.value)
                    }} />
                </MDBCol>
      
              </MDBRow>
<hr/>

              {/*href="/home" */}
              <MDBBtn className='mt-5' onClick={() => dispatch(postAnAd({
                "data": {
                  "title": title,
                  "desc": description,
                  "adType": "1",
                  "size":size,
                  "color":color,
                  "weight":weight,
                  "quantity":quantity,
                  "category":category,
                  
                },
                "token": token,
                "callback": () => {
                  setTitle("");
                  setCategory("");
                  setQty("");
                  setSize("");
                  setColor("");
                  setWeight("");
                  setDescription("");
                  return <Navigate to={{ pathname: '/', state: { from: location } }} />
                }
              }))} >Submit</MDBBtn>

            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
