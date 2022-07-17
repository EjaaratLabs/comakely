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
  MDBBreadcrumbItem,
  MDBModal,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalContent,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
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
import { getProductDetails, GetProductDetailsAsync } from '../reducers/VendorSlice';
import { PostNewOrderAsync } from '../reducers/OrderSlice';
import { PostNewMessageAsync } from '../reducers/MessageSlice';


export function ProductDetails() {
  let params = useParams();
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  useEffect(() => {
    dispatch(GetProductDetailsAsync({ productId: params.productId, token }))
  }, []);

  const [rating, setRating] = useState(5);
  const [orderModal, setOrderModal] = useState(false);
  const [msgModal, setMsgModal] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  let navigate = useNavigate()
  let location = useLocation()
  //const [showNav, setShowNav] = useState(false);
  const details = useSelector(getProductDetails);
  const toggleShow = () => {
    setOrderModal(!orderModal)
  }
  const toggleMsgShow = () => {
    setMsgModal(!msgModal)
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

        <MDBRow className='d-flex justify-content-center py-5 align-items-start'>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
            <MDBBreadcrumbItem >Products</MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>Details</MDBBreadcrumbItem>
          </MDBBreadcrumb>


          <MDBCol lg='9' xs="12" className='d-flex align-items-start '>
            <MDBCard className="p-2 mb-3  w-100" >
              <MDBCardBody>
                <MDBRow className="text-start">
                  <MDBCol size='12' className=' d-flex justify-content-center px-3 mb-5' > <img src='https://cdn.shopify.com/s/files/1/0557/4223/4681/products/Black-1476-4-1.jpg?v=1637739955' className='' style={{ maxHeight: "400px" }} /></MDBCol>
                  <h4 >{details?.productDetails?.title}</h4>
                  <h6 >{details?.productDetails?.productCategory}</h6>

                  <p>{details?.productDetails?.description}</p>

                  <MDBCol size='12' className=' d-flex justify-content-between'><h3>Rs. {details?.productDetails?.price}</h3>  <MDBBtn className='mx-2 mt-2' href='#' style={{ backgroundColor: '#F7D402', color: "black" }} onClick={toggleShow}  >Place Order</MDBBtn></MDBCol>
                </MDBRow>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>


          <MDBCol lg='3' xs="12" className='d-flex  '>
            <MDBCard className="p-2 mb-3  w-100">
              <MDBCardTitle className='mt-3'>Vendor Details</MDBCardTitle>
              <MDBCardBody>
                <Avatar round src='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5ODc1NTM4NjMyOTc2Mzcz/gettyimages-693134468.jpg' size="150" />
                <h5 className='mt-4' >{details?.vendorDetails?.vendorName}</h5>
                <p>{details?.vendorDetails?.orgname}</p>
                {/*<StarRatings
                  rating={5}
                  starRatedColor="green"
                  starDimension="20px"
                  starSpacing="1px"
                  //  changeRating={this.changeRating}
                  numberOfStars={5}
                  name='rating'
  />*/}
                <MDBBtn className='mx-2 mt-2' href='#' style={{ backgroundColor: '#F7D402', color: "black" }}>View profile</MDBBtn>
                <MDBBtn className='mx-2 mt-2' href='#' style={{ backgroundColor: '#F7D402', color: "black" }} onClick={toggleMsgShow}>Send Message</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>


          {/*<MDBCol size='12'>
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
                  <MDBBtn href='/vendor' style={{ backgroundColor: "#30B4BA" }}><MDBIcon icon="arrow-left" /> Back to list</MDBBtn>
                  <MDBBtn className='mx-2' href='#' style={{ backgroundColor: '#F7D402', color: "black" }}>Send</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
  </MDBCol>*/}
        </MDBRow>
        <MDBModal show={orderModal} setShow={setOrderModal} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Place an order</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="text-start">
                <label >Quantity</label>
                <MDBInput type="text" style={{ backgroundColor: "#FFFFFF" }}
                  onChange={(e) => {
                    setQuantity(e.target.value)
                  }}
                  value={quantity}
                />
                <div className="form-group text-start">
                  <label >Description</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                    value={comment}
                  />
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={() => {
                  dispatch(PostNewOrderAsync({
                    token,
                    data: {
                      "qty": quantity,
                      "comments": comment,
                      "prodId": details?.productDetails?.id,
                    },
                    callback: () => {
                      toggleShow()
                    }
                  }))
                }}  >Submit order</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>

        <MDBModal show={msgModal} setShow={setMsgModal} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Send message to vendor</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleMsgShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="text-start">
               
                <div className="form-group text-start">
                  <label >Message</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    value={message}
                  />
                </div>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleMsgShow}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={() => {
                 console.log(details?.vendorDetails)
                  dispatch(PostNewMessageAsync({
                    token,
                    data: {
                      "message": message,
                      "vendorId":details?.vendorDetails?.vendorId
                    },
                    callback: () => {
                      toggleMsgShow()
                    }
                  }))
                }}  >Send</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>


      <Footer />

    </div>
  );
}
