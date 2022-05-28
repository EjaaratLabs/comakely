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
  MDBCarousel
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, getUserData, resetToken, getUserProfileData } from '../reducers/AuthSlice'
import logo from '../assets/logo1.png'
import banner from '../assets/landingimg.PNG'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import seritem1 from '../assets/leather.png'
import seritem2 from '../assets/apparels.png'
import seritem3 from '../assets/printing.png'
import seritem4 from '../assets/food.png'
import seritem5 from '../assets/soaps.png'
import seritem6 from '../assets/footwear.png'

import alitem1 from '../assets/web.png'
import alitem2 from '../assets/dm.png'
import alitem3 from '../assets/ft.png'
import alitem4 from '../assets/log.jpg'

import { Navbar } from './Navbar';
import { Footer } from './Footer';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export function Landing() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  console.log(userData);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);
  const userProfileData = useSelector(getUserProfileData);
console.log(userProfileData,"prof")

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      <Navbar />
      {token ?((!userProfileData.vendorProfile || !userProfileData.products) ?
        <div className="alert alert-success alert-dismissible fade show m-3" role="alert">
          <strong>Congratulation!</strong> Your account has been approved complete your profile. <Link to="profile-management" style={{ color: "green" }}>Click here !</Link>

        </div>:""):""}
      <MDBCarousel fade>
        <MDBCarouselInner>
          <MDBCarouselItem className='active '>
            <MDBCarouselElement src={comakebg} alt='...' style={{ height: "500px" }} />
            <MDBCarouselCaption style={{ paddingBottom: "100px" }} >
              <h2>Custom works make the dream happen</h2>
              <p>A place for entrepreneurs and vendors to connect.</p>

              <MDBRow className='d-flex justify-content-center'>
                <MDBCol size='8'>
                  <MDBInput className='my-3' label='Search...' type='text' labelStyle={{ textAlign: "center" }}
                    contrast />
                </MDBCol>
              </MDBRow>
              <MDBBtn className='mx-2' style={{ backgroundColor: '#F7D402', color: "black" }} href="/vendor" >Find a vendor</MDBBtn>
              <MDBBtn className='mx-2' href='/business' style={{ backgroundColor: "#30B4BA" }} >Find a project</MDBBtn>

            </MDBCarouselCaption>
          </MDBCarouselItem>


        </MDBCarouselInner>
      </MDBCarousel>
      <MDBContainer>
        <MDBRow className='text-center py-5'>

          <h1 className='my-5'>Search vendor by category</h1>
          <Carousel responsive={responsive}>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem1} className="my-3" />
                <h4><Link to="/vendor/Leather" style={{ color: "black" }}>Leather</Link></h4>

              </MDBCardBody>
            </MDBCard></div>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem2} className="my-3" />
                <h4><Link to="/vendor/Apparels" style={{ color: "black" }}>Apparels</Link></h4>

              </MDBCardBody>
            </MDBCard></div>


            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem3} className="my-3" />
                <h4><Link to="/vendor/Printing and packaging" style={{ color: "black" }}>Printing and packaging</Link></h4>

              </MDBCardBody>
            </MDBCard></div>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem4} className="my-3" />
                <h4><Link to="/vendor/Food & Beverages" style={{ color: "black" }}>Food & Beverages</Link></h4>

              </MDBCardBody>
            </MDBCard></div>

            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem5} className="my-3" />
                <h4><Link to="/vendor/Soaps & Detergents" style={{ color: "black" }}>Soaps & Detergents</Link></h4>

              </MDBCardBody>
            </MDBCard></div>

            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={seritem6} className="my-3" />
                <h4><Link to="/vendor/Footwear" style={{ color: "black" }}>Footwear</Link></h4>

              </MDBCardBody>
            </MDBCard></div>
          </Carousel>;
        </MDBRow>
        <MDBRow className='text-center '>
          <hr />
          <h2 className='mb-5 mt-2'>Simple process</h2>
          <MDBCol className='mb-5'>
            <MDBCard style={{ maxWidth: '22rem', minHeight: "100%", backgroundColor: "#EBEBEB" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <img src={item1} className="my-3" />
                  <br />
                  Sign Up</MDBCardTitle>
                <MDBCardText>
                  Are you a buyer or a vendor?
                </MDBCardText>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className='mb-5' >
            <MDBCard style={{ maxWidth: '22rem', minHeight: "100%", backgroundColor: "#EBEBEB" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <img src={item2} className="my-3" />
                  <br />
                  Connect</MDBCardTitle>
                <MDBCardText>
                  Post projects. Browse vendors. Send a message when you find a match!
                </MDBCardText>
                <br />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol className='mb-5'>
            <MDBCard style={{ maxWidth: '22rem', minHeight: "100%", backgroundColor: "#EBEBEB" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <img src={item3} className="my-3" />
                  <br />
                  Shake on it</MDBCardTitle>
                <MDBCardText>
                  Create & deliver products. Watch your business grow!
                </MDBCardText>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>
        <MDBRow className='mb-5'>
          <hr />
          <h1 className='my-5'>Discover projects</h1>
          <Carousel responsive={responsive} containerclassName="d-flex align-items-stretch">
            <MDBCol>
              <MDBCard style={{ maxWidth: '22rem', maxHeight: "100%", backgroundColor: "#F7D402" }}>
                <MDBCardBody>
                  <MDBCardTitle>
                    BeeTrev</MDBCardTitle>
                  <MDBCardText>
                    Tourism B2B Platform.
                  </MDBCardText>

                </MDBCardBody>
              </MDBCard></MDBCol>
            <MDBCol>
              <MDBCard style={{ maxWidth: '22rem', maxHeight: "100%", backgroundColor: "#F7D402" }}>
                <MDBCardBody>
                  <MDBCardTitle>
                    Lee Soda</MDBCardTitle>
                  <MDBCardText>
                    Lemon flavoured carbonated drink.
                  </MDBCardText>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCard style={{ maxWidth: '22rem', maxHeight: "100%", backgroundColor: "#F7D402" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  Car Pool</MDBCardTitle>
                <MDBCardText>
                  Car ride sharing service.
                </MDBCardText>

              </MDBCardBody>
            </MDBCard>
            <MDBCard style={{ maxWidth: '22rem', maxHeight: "100%", backgroundColor: "#F7D402" }}>
              <MDBCardBody>
                <MDBCardTitle>
                  Car Pool</MDBCardTitle>
                <MDBCardText>
                  Car ride sharing service.
                </MDBCardText>

              </MDBCardBody>
            </MDBCard>

          </Carousel>
        </MDBRow>

        <MDBRow>
          <hr />
          <h1>Co-make journey</h1>
          <h5>
            Every entrepreneur carries a story and a goal.</h5>
          <img className='my-5' src={banner} style={{ borderRadius: "25px" }} />
        </MDBRow>
        <MDBRow className='mt-5'>
          <hr />
          <h1 className='my-5'>Allied services</h1>
          <Carousel responsive={responsive}>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={alitem1} className="my-3" />
                <h4>Web and Graphics</h4>

              </MDBCardBody>
            </MDBCard></div>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={alitem2} className="my-3" />
                <h4>Digital Marketing</h4>

              </MDBCardBody>
            </MDBCard></div>


            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={alitem3} className="my-3" />
                <h4>Financial & Tax</h4>

              </MDBCardBody>
            </MDBCard></div>
            <div><MDBCard style={{ maxWidth: '22rem', backgroundColor: "#DDE7FF" }}>
              <MDBCardBody>
                <img src={alitem4} className="my-3" />
                <h4>Logistics</h4>

              </MDBCardBody>
            </MDBCard></div>

          </Carousel>;
        </MDBRow>
      </MDBContainer>
      <Footer />

    </div>
  );
}
