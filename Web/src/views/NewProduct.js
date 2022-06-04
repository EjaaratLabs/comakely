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
  MDBCarousel,
  MDBTabsContent,
  MDBTabsPane,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabs,
  MDBBreadcrumbItem,
  MDBBreadcrumb,
  MDBCardHeader,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBModalContent,
  MDBCheckbox,
  MDBFile
} from 'mdb-react-ui-kit';

import { getToken, loginAsync, resetToken, getUserData, getUserProfileData } from '../reducers/AuthSlice'
import logo from '../assets/logo.png'
import comakebg from '../assets/comkaebg.png'
import item1 from '../assets/signup.png'
import item2 from '../assets/connect.png'

import item3 from '../assets/sahke.png'
import { postAnAd } from '../reducers/AdSlice';
import Avatar from 'react-avatar';
import StarRatings from 'react-star-ratings';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import DataTable from 'react-data-table-component';
import { PostVendorProfileAsync } from '../reducers/VendorSlice';
import { GetBlogListAsync, getBlogs } from '../reducers/BlogSlice';

export function NewProduct() {
  const token = useSelector(getToken);

  const dispatch = useDispatch();

  let navigate = useNavigate()
  let location = useLocation()

  const [productTitle, setProductTitle] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productIsPrimary, setProductIsPrimary] = useState('');

  useEffect(() => {

    dispatch(GetBlogListAsync({ token }));
  }, []);
  const blogs = useSelector(getBlogs);

  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }

  var blogList = [];
  blogs.forEach((val) => {
    blogList.push(<MDBCard className=' mb-4'>
      <MDBCardBody className='text-start '>
        <h3>{val.title}</h3>
        <p>{val.createdon}-{val.createdby}</p>
        <br />
        <div className="content" dangerouslySetInnerHTML={{ __html: val.brief }}></div>
      </MDBCardBody>
    </MDBCard>)
  })

  return (
    <div>

      <Navbar />


      <MDBContainer>
        <MDBRow className='d-flex justify-content-center py-5'>
          <MDBCol size='12' className='text-center my-2'>
            <h1>Add new product</h1>
            <hr></hr>
          </MDBCol>
          <MDBCol size='8' className='text-start my-2'>
            <MDBCard className="p-2 mb-3  w-100">

              <MDBCardBody className="w-100">
                <form>
                  <MDBRow>
                    <MDBCol size='12'>
                      <MDBInput className="mt-3" label="Title" type="text" style={{ backgroundColor: "#FFFFFF" }}
                        onChange={(e) => {
                          setProductTitle(e.target.value)
                        }}
                      />
                    </MDBCol>
                    <MDBCol size='12'>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                        />
                      </div>
                    </MDBCol>
                    <MDBCol size='6'>
                      <MDBInput className="mt-3" label="Price" type="text" style={{ backgroundColor: "#FFFFFF" }}
                        onChange={(e) => {
                          setProductPrice(e.target.value)
                        }}
                      />
                    </MDBCol>

                    <MDBCol size='6'>
                      <select className="form-select mt-3" onChange={(e) => {
                        setProductCategory(e.target.value)
                      }} >
                        <option value={"-1"}>---Select Category---</option>
                        <option value="1">Leather</option>
                        <option value='2'>Apparel & textile</option>
                        <option value='3' >Footware</option>
                        <option value='4'>Printing & packaging</option>
                        <option value='5'>Soaps & detergents</option>
                        <option value='6'>Food & beverages</option>
                      </select>
                    </MDBCol>
                    <MDBCol size='6' className='text-start mt-5'>
                      <MDBCheckbox name='flexCheck' value='' className='text-start ' label='Primary Product'
                        onChange={(e) => {
                          setProductIsPrimary(e.target.value)
                        }}
                      />
                    </MDBCol>
                    <MDBCol size='6' className='text-start mt-1'>
                      <MDBFile label='Picture' id='customFile' />
                    </MDBCol>
                    <MDBCol className='d-flex justify-content-end mt-5' size='12'>
                        <MDBBtn color='success' >Save</MDBBtn></MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>
      </MDBContainer>


      <Footer />

    </div>
  );
}
