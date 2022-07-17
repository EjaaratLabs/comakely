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
import { getVendorOrder, GetVendorOrdersAsync, PostOrderStatusAsync } from '../reducers/OrderSlice';

export function BuyerProfileManagement() {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const userProfileData = useSelector(getUserProfileData);
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
  const [verticalActive, setVerticalActive] = useState('tab1');

  const [vendorName, setVendorName] = useState(userProfileData.vendorProfile?.orgname);
  const [vendorOffice, setVendorOffice] = useState(userProfileData.vendorProfile?.phone);
  const [vendorPhone, setVendorPhone] = useState(userProfileData.vendorProfile?.officeaddress);


  const [productTitle, setProductTitle] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productIsPrimary, setProductIsPrimary] = useState('');

  useEffect(() => {

    dispatch(GetVendorOrdersAsync({ token }))
  }, [])

  const vendorOrders = useSelector(getVendorOrder);
  const [basicModal, setBasicModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({});
  const toggleShow = () => {

    setBasicModal(!basicModal)
  };

  const toggleOrderShow = (data) => {

    setOrderModal(!orderModal)
    setOrderData(data)
  };


  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };
  if (!token) {
    //alert("Hello");
    return <Navigate to={{ pathname: '/', state: { from: location } }} />
    // setUserName("")
  }

  const ordercolumns = [
    {
      name: 'Order id',
      selector: row => row.id,
    },
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
    },
    {
      name: 'Status',
      selector: row => row.orderStatus,
    },
    {
      name: 'Actions',
      selector: row => <MDBBtn color='success' size='sm' className='mx-2' onClick={() => [toggleOrderShow(row)]}>View</MDBBtn>,
    },
  ];
  const prodcolumns = [
    {
      name: 'Product id',
      selector: row => row.id,
    },
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Primary',
      selector: row => row.isPrimary == '1' ? "Yes" : "No",
    },
    {
      name: 'Actions',
      selector: row => <MDBBtn color='success' size='sm' className='mx-2' onClick={() => [toggleOrderShow(row)]}>View</MDBBtn>,
    },
  ];
  var data = [{ prodId: 1, title: "Soda", status: "Yes" }]
  return (
    <div>

      <Navbar />


      <MDBContainer>
        <MDBRow className='d-flex justify-content-center py-5'>
          {!userProfileData.vendorProfile ? <div className="alert alert-danger alert-dismissible fade show m-1" role="alert">
            <strong>Vendor profile not setup !</strong> Please complete your profile. <Link to="#" style={{ color: "red" }}>Click here !</Link>

          </div> : ""}
          {!userProfileData.products ? <div className="alert alert-danger alert-dismissible fade show m-1" role="alert">
            <strong>Product not setup !</strong> Please add at least one product to get yourself listed. <Link to="#" style={{ color: "red" }}>Click here !</Link>

          </div> : ""}

          <MDBCol size='12' className='text-center my-2'>
            <h1>Profile Management</h1>
            <hr></hr>
          </MDBCol>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Profile Management</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <MDBCol size='3'>
            <MDBCard>

              <MDBCardBody>


                <MDBTabs className='flex-column text-center'>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                      Profile
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                      Placed Orders
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size='9'>
            <MDBTabsContent className="w-100">
              <MDBTabsPane show={verticalActive === 'tab1'} >    <MDBCol size='12' className='d-flex  align-items-stretch'>
                <MDBCard className="p-2 mb-3  w-100">
                  <MDBCardHeader>
                    User Profile Info
                  </MDBCardHeader>
                  <MDBCardBody className="w-100">
                    <Avatar round src='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg' size="150" />
                    <br />
                    <StarRatings
                      rating={5}
                      starRatedColor="green"
                      starDimension="20px"
                      starSpacing="1px"
                      //  changeRating={this.changeRating}
                      numberOfStars={5}
                      name='rating'
                    />
                    <MDBRow className='mt-5'>
                      <MDBCol lg="6" className='p-2'> <MDBInput
                        label="Name"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={userProfileData?.info?.Name}
                      /></MDBCol>
                      <MDBCol lg="6" className='p-2'> <MDBInput
                        label="Phone"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={userProfileData?.info?.Phone}
                      /></MDBCol>

                      <MDBCol className='d-flex justify-content-end mt-5' size='12'><MDBBtn>Update picture</MDBBtn>
                        <MDBBtn className='mx-2' color='secondary'>
                          Change password
                        </MDBBtn>
                        <MDBBtn color='success' >Save</MDBBtn></MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol></MDBTabsPane>
              <MDBTabsPane show={verticalActive === 'tab4'} >    <MDBCol size='12' className='d-flex  align-items-stretch'>
                <MDBCard className="p-2 mb-3  w-100">
                  <MDBCardHeader>
                    Vendor Profile Info
                  </MDBCardHeader>
                  <MDBCardBody className="w-100">

                    <MDBRow className='mt-5'>
                      <MDBCol lg="6" className='p-2'> <MDBInput
                        label="Organization name"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={vendorName}
                        onChange={(e) => {
                          setVendorName(e.target.value)
                        }}
                      /></MDBCol>
                      <MDBCol lg="6" className='p-2'> <MDBInput
                        label="Phone"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={vendorPhone}
                        onChange={(e) => {
                          setVendorPhone(e.target.value)
                        }}
                      /></MDBCol>

                      <MDBCol lg="6" className='p-2'> <MDBInput
                        label="Office address"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={vendorOffice}
                        onChange={(e) => {
                          setVendorOffice(e.target.value)
                        }}
                      /></MDBCol>
                      <MDBCol className='d-flex justify-content-end mt-5' size='12'>
                        <MDBBtn color='success' onClick={() => dispatch(PostVendorProfileAsync({
                          "data": {
                            "orgName": vendorName,
                            "orgPhone": vendorPhone,
                            "orgAddress": vendorOffice,
                          },
                          "token": token,

                        }))} >Save</MDBBtn></MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCard>
              </MDBCol></MDBTabsPane>
              <MDBTabsPane show={verticalActive === 'tab2'}>
                <MDBCol size='12' className='d-flex  align-items-stretch'>
                  <MDBCard className="p-2 mb-3  w-100">

                    <MDBCardHeader>
                      Products Management
                    </MDBCardHeader>
                    <MDBCardBody className="w-100">
                      <MDBCol className='d-flex justify-content-end mt-5' size='12'>
                        <Link to="/add-product">
                          <MDBBtn  >Add New</MDBBtn></Link>
                      </MDBCol>
                      <DataTable
                        pagination="true"
                        columns={prodcolumns}
                        data={userProfileData.products ? userProfileData.products : []}

                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' backdrop={false} staticBackdrop={true} >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Add product</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
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
                              <MDBInput className="mt-3" label="Description" type="text" style={{ backgroundColor: "#FFFFFF" }}
                                onChange={(e) => {
                                  setProductDesc(e.target.value)
                                }}
                              />
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
                          </MDBRow>
                        </form>
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn color='danger' onClick={toggleShow}>
                          Close
                        </MDBBtn>
                        <MDBBtn color='success' onClick={toggleShow}>
                          Submit
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </MDBTabsPane>
              <MDBTabsPane show={verticalActive === 'tab3'}>
                <MDBCol size='12' className='d-flex  align-items-stretch'>
                  <MDBCard className="p-2 mb-3  w-100">

                    <MDBCardHeader>
                      Orders
                    </MDBCardHeader>
                    <MDBCardBody className="w-100">
                      <DataTable
                        pagination="true"
                        columns={ordercolumns}
                        data={vendorOrders ? vendorOrders : []}

                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>

        </MDBRow>

        <MDBModal show={orderModal} setShow={toggleOrderShow} tabIndex='-1' >
          <MDBModalDialog >
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Order details</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleOrderShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="text-start">
                <MDBRow>
                  <MDBCol xs="12" lg='6' className='my-2' >
                    <MDBInput type="text" label='Order Id' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData?.id?.toString()}
                    /></MDBCol>
                  {/* <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Product Id' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData.id}
                              /></MDBCol>*/}
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Product Name' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData.title}
                    /></MDBCol>
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Status' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData.orderStatus}
                    /></MDBCol>
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Quantity' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData.quantity}
                    /></MDBCol>
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Price' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData.price}
                    /></MDBCol>
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='Time' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData?.createdon?.toString()}
                    /></MDBCol>
                  <MDBCol xs="12" lg='6' className='my-2'>
                    <MDBInput type="text" label='buyer' style={{ backgroundColor: "#FFFFFF" }}
                      disabled value={orderData?.buyeruserId?.toString()}
                    /></MDBCol>
                  <MDBCol xs="12" className='my-2' >
                    <lable>comment</lable>
                    <textarea rows={5} className="form-control" disabled value={orderData?.comments} >

                    </textarea>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>

              <MDBModalFooter>

                {orderData?.orderStatusId == "1" ? (<div><MDBBtn color='danger' className='mx-2' onClick={() => {
                  dispatch(PostOrderStatusAsync({
                    token, data: {
                      status: "3",
                      orderId: orderData?.id
                    }, callback: () => {
                      toggleOrderShow({})
                    }
                  }))
                }}>
                  Reject
                </MDBBtn>
                  <MDBBtn color='success' onClick={() => {
                    dispatch(PostOrderStatusAsync({
                      token, data: {
                        status: "2",
                        orderId: orderData?.id
                      }, callback: () => {
                        toggleOrderShow({})
                      }
                    }))
                  }}  >Accept</MDBBtn></div>) : ""}
                <MDBBtn color='secondary' onClick={toggleOrderShow}>
                  close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

      </MDBContainer>


      <Footer />

    </div>
  );
}
