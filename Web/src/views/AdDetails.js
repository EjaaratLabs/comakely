import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  MDBCarousel,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import StarRatings from 'react-star-ratings';
import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'
import Avatar from 'react-avatar';
import item3 from '../assets/sahke.png'
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getAdDetails, GetAdDetailsAsync } from '../reducers/AdSlice';


export function AdDetails() {
  let params = useParams();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  useEffect(() => {

    dispatch(GetAdDetailsAsync({ id: params.postId, token }))
  }, []);

  const [rating, setRating] = useState(5);
  let navigate = useNavigate()
  let location = useLocation()
  //const [showNav, setShowNav] = useState(false);
  const details = useSelector(getAdDetails);
  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/login', state: { from: location } }} />
    // setUserName("")
  }

  return (
    <div>

      <Navbar />
      <MDBContainer>
      
        <MDBRow className='d-flex justify-content-center py-5 align-items-stretch'>
        <MDBBreadcrumb>
        <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
        <MDBBreadcrumbItem >Buyer Advertisment</MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Details</MDBBreadcrumbItem>
      </MDBBreadcrumb>
          <MDBCol size='3' className='d-flex  align-items-stretch'>
            <MDBCard className="p-2 mb-3  w-100">
              <MDBCardBody>
                <Avatar round src='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg' size="150" />
                <h5 className='mt-4' >{details?.profile?.Name}</h5>
                <p>Karachi</p>
                <StarRatings
                  rating={details?.profile?.rating}
                  starRatedColor="green"
                  starDimension="20px"
                  starSpacing="1px"
                  //  changeRating={this.changeRating}
                  numberOfStars={5}
                  name='rating'
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='6' className='d-flex  align-items-stretch'>
            <MDBCard className="p-2 mb-3  w-100">
              <MDBCardBody>
                <MDBCardTitle><h4>Project Description</h4></MDBCardTitle>
                <MDBRow>
                  <div className='text-start'>
                    <b>{details?.details?.title}</b>

                    <p>{details?.details?.description}</p>
                  </div>
                </MDBRow>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='3' className='d-flex  align-items-stretch'>
            <MDBCard className="p-2 mb-3  w-100">
              <MDBCardBody className='text-start'>
              <MDBCardTitle><h5>Product Dimensions</h5></MDBCardTitle>
                Category:<b>{details?.details?.category}</b>
                <br />
                Quantity:<b>{details?.details?.quantity}</b>
                <br />
                Size:<b>{details?.details?.size}</b>
                <br />
                Weight:<b>{details?.details?.weight}</b>
                <br />
                Color:<b>{details?.details?.color}</b>
                <br />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='12'>
            <MDBCard className="px-3 py-2">
              <MDBCardBody className='text-start'>
                <MDBCardTitle><h4>Interested ? send us a message.</h4></MDBCardTitle>
                <div className='w-100 p-1' style={{ border: "1px solid #939496", borderRadius: "10px" }}>
                  <Editor
                    //  editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  //  onEditorStateChange={this.onEditorStateChange}
                  /></div>
                <div className='w-100  py-3 d-flex  justify-content-between' >
                <MDBBtn href='/business' style={{backgroundColor:"#30B4BA"}}><MDBIcon icon="arrow-left" /> Back to list</MDBBtn>
                  <MDBBtn className='mx-2' href='#' style={{ backgroundColor: '#F7D402', color: "black" }}>Send</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
