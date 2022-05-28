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
  MDBCarousel,
  MDBCheckbox,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink
} from 'mdb-react-ui-kit';
import Slider from 'rc-slider';
import { getToken, loginAsync, resetToken, getUserData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { getAds, GetAdsListAsync } from '../reducers/AdSlice';
import { Navbar } from './Navbar';
import { Footer } from './Footer';



export function BusinessLanding() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(GetAdsListAsync({ token, adType: "1" }));
  }, []);
  const data = useSelector(getAds);
  let navigate = useNavigate()
  let location = useLocation()
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("");
  var list = [];
  if (data) {
    var temp = data;
    if (search) {
      temp = data.filter((x) => (x.title && x.title.toLowerCase().includes(search.toLowerCase())) || (x.description && x.description.toLowerCase().includes(search.toLowerCase())))
    }
    temp.forEach(val => {
      list.push(<MDBCol size='12' className='my-1'>
        <MDBCard className="py-2">
          <MDBCardBody className='text-start'>
            <MDBRow>
              <MDBCol size='8'>
                <h5 className='text-left'>{val.title}</h5>

                <p className='mt-3'> {val.description}</p>
              </MDBCol>
              <MDBCol size='4' className='text-end'>
                <div className='text-left'>Categor:{val.category}</div>
                <div className='text-left'>Quantity:{val.quantity}</div>
                <br />
                <MDBBtn href={'/details/' + val.id} style={{ backgroundColor: "#30B4BA" }} >View details</MDBBtn></MDBCol>
            </MDBRow>


          </MDBCardBody>
        </MDBCard>
      </MDBCol>)
    })
  }
  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/login', state: { from: location } }} />
    // setUserName("")
  }

  return (
    <div>
      <Navbar />
      <MDBContainer>

        <h3 className='pt-5  '>Businesses required services</h3>
        <MDBRow className='d-flex justify-content-center '>
          <MDBCol size='8'>

          </MDBCol>
        </MDBRow>
        <MDBRow className='d-flex justify-content-start py-2'>
          {/*  {list}*/}
          <MDBCol size='3'>
            <MDBCard>

              <MDBCardBody className='text-start'>
                <MDBInput label="Search a project" className=" mb-2" icon="envelope" group type="email" validate error="wrong"
                  success="right" value={search} onChange={(e) => {
                    setSearch(e.target.value)
                  }} />
                <br />
                <h5>Categories</h5>
                <MDBCheckbox name='flexCheck' value='Leather' id='flexCheckDefault' label='Leather' />
                <MDBCheckbox name='flexCheck' value='Apparel & textile' id='flexCheckChecked' label='Apparel & textile' />
                <MDBCheckbox name='flexCheck' value='Footware' id='flexCheckChecked' label='Footware' />
                <MDBCheckbox name='flexCheck' value='Printing & packagin' id='flexCheckChecked' label='Printing & packaging' />
                <MDBCheckbox name='flexCheck' value='Soaps & detergents' id='flexCheckChecked' label='Soaps & detergents' />
                <MDBCheckbox name='flexCheck' value='Food & beverages' id='flexCheckChecked' label='Food & beverages' />
                <hr />
                <h5>Location</h5>
                <select className="form-select">
                  <option>---All---</option>
                  <option value="1">Karachi</option>
                  <option value="2">Lahore</option>
                  <option value="3">Islamabad</option>
                </select>
                <hr />
                <h5>Quantity</h5>
                <MDBCheckbox name='flexCheck' value='1' id='flexCheckDefault' label='0 - 250' />
                <MDBCheckbox name='flexCheck' value='2' id='flexCheckChecked' label='251 - 500' />
                <MDBCheckbox name='flexCheck' value='3' id='flexCheckChecked' label='501 - 1000' />
                <MDBCheckbox name='flexCheck' value='4' id='flexCheckChecked' label='1000+' />

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='7'>
            {list}
          </MDBCol>

        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
