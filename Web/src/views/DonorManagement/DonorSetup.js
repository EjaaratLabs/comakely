import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
import { getToken, loginAsync } from '../../reducers/AuthSlice'
import { createNewProfileAsync } from '../../reducers/DonorProfileSlice'


export const DonorSetup = (props) => {
  const token = useSelector(getToken);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //navigate('/dashboard')
  const handleChange = event => {
    var data = formData;
    data[event.target.name] = event.target.value;
    setFormData(data);
  }
  const onSubmit = () => {

    dispatch(createNewProfileAsync({ formData, token, callback: () => navigate("/home/donors/list") }));

  }
  return (
    <div className="p-4 text-start w-100">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a >Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem>
          <a href='/home/donors/list'>Donors</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Setup Profile</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBCard alignment='center' >

        <MDBCardHeader className="text-start"><h5 style={{ marginBottom: 0 }}> Setup Donor profile</h5></MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <MDBRow>

              <form>

                <div className="grey-text text-start">

                  <MDBRow>
                    <h5>Donor Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='name' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="ERP Id" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='erpId' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="CNIC" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='cnic' onChange={handleChange} />
                    </MDBCol>

                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Phone" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='phone' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Email" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='email' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Whatsapp" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='whatsapp' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Date of Birth" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                        success="right" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name='gender' onChange={handleChange}  >
                        <option>Select Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Others</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Care of" icon="envelope" group type="text" validate error="wrong"
                        success="right" />
                    </MDBCol>

                  </MDBRow>
                  <hr />
                  <MDBRow className="mt-3">
                    <h5>Basic Information</h5>

                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Country" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='country' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="City" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='city' onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Address" icon="envelope" group type="text" validate error="wrong"
                        success="right" name='address' onChange={handleChange} />
                    </MDBCol>

                  </MDBRow>

                  <hr />
                  <MDBRow>
                    <h5>Documents</h5>
                    <MDBCol lg="4" className="py-1">
                      Donor picture: <input type="file" />
                    </MDBCol>

                    {/* <MDBCol lg="4" className="py-1">
                      Donor CNIC: <input type="file" />
  </MDBCol>*/}

                  </MDBRow>
                </div>
                <div className="text-end w-100">
                  <MDBBtn color="danger" className="mx-2 my-5" onClick={() => props.closeProfileDetails()} >Close</MDBBtn><MDBBtn className="mx-2  my-5" onClick={onSubmit} type={"button"} >Add</MDBBtn>
                </div>
              </form>

            </MDBRow>
          </MDBContainer>
        </MDBCardBody>

      </MDBCard>

    </div>
  );
}
