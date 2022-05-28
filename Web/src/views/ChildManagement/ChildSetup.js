import React, { useState } from 'react';
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
  MDBCardHeader

} from 'mdb-react-ui-kit';
import { getToken, loginAsync } from '../../reducers/AuthSlice'
import { createNewProfileAsync } from '../../reducers/ChildProfileSlice'
import { Link } from 'react-router-dom';

export const ChildSetup = (props) => {
  const token = useSelector(getToken);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const handleChange = event => {
    var data = formData;
    data[event.target.name] = event.target.value;
    setFormData(data);
  }
  const handleDate = event => {
    var data = formData;

    data[event.target.name] = new Date(event.target.value);
    setFormData(data);
  }

  const onSubmit = () => {

    dispatch(createNewProfileAsync({ formData, token }));

  }

  return (
    <div className="p-4 text-start w-100">

      <MDBCard alignment='center' >

        <MDBCardHeader className="text-start"><h5 style={{ marginBottom: 0 }}> Setup child profile</h5></MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <MDBRow>

              <form>

                <div className="grey-text text-start">

                  <MDBRow>
                    <h5>Child Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="NAME" value={formData.NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Date of Birth" icon="envelope" type="date" error="wrong"
                        success="right" name="DOB" value={formData.DOB ? formData.DOB : new Date().toString()} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="GENDER" value={formData.GENDER} onChange={handleChange}>
                        <option>Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="DISABILITY" value={formData.DISABILITY} onChange={handleChange}>
                        <option value="SELECT"> Any Disability</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1" name="SIBLINGS" value={formData.SIBLINGS} onChange={handleChange}>
                      <select className="form-select">
                        <option value="SELECT">Any Siblings</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Brother" icon="envelope" type="number" error="wrong"
                        success="right" name="BROTHERS" value={formData.BROTHERS} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Sister" icon="envelope" type="text" error="wrong"
                        success="right" name="SISTERS" value={formData.SISTERS} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Special Skills" icon="envelope" type="text" error="wrong"
                        success="right" name="SPECIAL_SKILLS" value={formData.SPECIAL_SKILLS} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Aim of life" icon="envelope" type="text" error="wrong"
                        success="right" name="AIM" value={formData.AIM} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Present Address" icon="envelope" type="text" error="wrong"
                        success="right" name="PERMANENT_ADDRESS" value={formData.PERMANENT_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="mt-3">
                    <h5>Basic Information</h5>

                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="CITY" value={formData.CITY} onChange={handleChange}   >
                        <option value="SELECT">Select City</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1" >
                      <select className="form-select" name="REGION" value={formData.REGION} onChange={handleChange} >
                        <option value="SELECT"> Select Region</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="DISTRICT" value={formData.DISTRICT} onChange={handleChange} >
                        <option value="SELECT" >Select Disctrict</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="TEHSIL" value={formData.TEHSIL} onChange={handleChange}  >
                        <option value="SELECT">Select Tehsil</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Town/Village" icon="envelope" type="text" error="wrong"
                        success="right" name="TOWN" value={formData.TOWN} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Zone/Circle" icon="envelope" type="text" error="wrong"
                        success="right" name="ZONE" value={formData.ZONE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="UC" icon="envelope" type="text" error="wrong"
                        success="right" name="UC" value={formData.UC} onChange={handleChange} />
                    </MDBCol>

                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>School Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Session" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_SESSION" value={formData.SCH_SESSION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Admission Date" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                        success="right" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Admission No" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_ADMISSION_NO" value={formData.SCH_ADMISSION_NO} onChange={handleChange} />
                    </MDBCol>

                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="SCH_STUDENT_CLASS" value={formData.SCH_STUDENT_CLASS} onChange={handleChange}>
                        <option value="SELECT"> Select student class</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Monthly Fee" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_FEES" value={formData.SCH_FEES} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_NAME" value={formData.SCH_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="SCH_MEDIUM" value={formData.SCH_MEDIUM} onChange={handleChange}  >
                        <option value="SELECT">Select school medium</option>
                        <option value="1">Govt.</option>
                        <option value="2">Private</option>

                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Phone" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_PHONE" value={formData.SCH_PHONE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Principal/Headmaster name" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_PRINCIPAL" value={formData.SCH_PRINCIPAL} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Principal/Headmaster phone" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_PRINCIPAL_PHONE" value={formData.SCH_PRINCIPAL_PHONE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="SCH_PRINCIPAL_TYPE" value={formData.SCH_PRINCIPAL_TYPE} onChange={handleChange} >
                        <option value="SELECT">Princial/Headmaster is ?</option>
                        <option value="1">Employee</option>
                        <option value="2">Owner</option>

                      </select>
                    </MDBCol>
                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Address" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_ADDRESS" value={formData.SCH_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>School Bank Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_BANK_NAME" value={formData.SCH_BANK_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Branch Code" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                        success="right" name="SCH_BRANCH_CODE" value={formData.SCH_BRANCH_CODE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Account No" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_ACCOUNT_NO" value={formData.SCH_ACCOUNT_NO} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Account Title" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_ACCOUNT_TITLE" value={formData.SCH_ACCOUNT_TITLE} onChange={handleChange} />
                    </MDBCol>

                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Address" icon="envelope" type="text" error="wrong"
                        success="right" name="SCH_BANK_ADDRESS" value={formData.SCH_BANK_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Father Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="FATHER_NAME" value={formData.FATHER_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Date of Death" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                        success="right" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Reason of death" icon="envelope" type="text" error="wrong"
                        success="right" name="FATHER_ROD" value={formData.FATHER_ROD} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="CNIC" icon="envelope" type="text" error="wrong"
                        success="right" name="FATHER_CNIC" value={formData.FATHER_CNIC} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Occupation" icon="envelope" type="text" error="wrong"
                        success="right" name="FATHER_OCCUPATION" value={formData.FATHER_OCCUPATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Designation" icon="envelope" type="text" error="wrong"
                        success="right" name="FATHER_DESIGNATION" value={formData.FATHER_DESIGNATION} onChange={handleChange} />
                    </MDBCol>

                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Mother Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_NAME" value={formData.MOTHER_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">

                      <MDBInput label="Date of Death" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                        success="right" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Reason of death" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_ROD" value={formData.MOTHER_ROD} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="CNIC" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_CNIC" value={formData.MOTHER_CNIC} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Occupation" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_OCCUPATION" value={formData.MOTHER_OCCUPATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Designation" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_DESIGNATION" value={formData.MOTHER_DESIGNATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Education" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_EDUCATIOn" value={formData.MOTHER_EDUCATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Mobile Number" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_MOB_NUM" value={formData.MOTHER_MOB_NUM} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Phone Number" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_PHONE" value={formData.MOTHER_PHONE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Present Address" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_PRESENT_ADDRESS" value={formData.MOTHER_PRESENT_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Permanent Address" icon="envelope" type="text" error="wrong"
                        success="right" name="MOTHER_PERMANENT_ADDRESS" value={formData.MOTHER_PERMANENT_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Gurdian Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_NAME" value={formData.GURDIAN_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <select className="form-select" name="GURDIAN_RELATION" value={formData.GURDIAN_RELATION} onChange={handleChange} >
                        <option value="SELECT">Relation with child </option>
                        <option value="1">Mother</option>
                        <option value="2">Paternal Uncle</option>
                        <option value="3">Others</option>
                      </select>
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="CNIC" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_CNIC" value={formData.GURDIAN_CNIC} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Occupation" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_OCCUPATIOn" value={formData.GURDIAN_OCCUPATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Designation" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_DESIGNATION" value={formData.GURDIAN_DESIGNATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Education" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_EDUCATION" value={formData.GURDIAN_EDUCATION} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Mobile Number" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_MOB_NUM" value={formData.GURDIAN_MOB_NUM} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Phone Number" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_PHONE" value={formData.GURDIAN_PHONE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Present Address" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_PRESENT_ADDRESS" value={formData.GURDIAN_PRESENT_ADDRESS} onChange={handleChange} />
                    </MDBCol>

                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Gurdian Bank Information</h5>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Name" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_BANK_NAME" value={formData.GURDIAN_BANK_NAME} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Branch code" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_BRANCH_CODE" value={formData.GURDIAN_BRANCH_CODE} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Account No" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_ACCOUNT_NO" value={formData.GURDIAN_ACCOUNT_NO} onChange={handleChange} />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      <MDBInput label="Account Title" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_ACCOUNT_TITLE" value={formData.GURDIAN_ACCOUNT_TITLE} onChange={handleChange} />
                    </MDBCol>

                    <MDBCol lg="12" className="py-1">
                      <MDBInput textarea label="Address" icon="envelope" type="text" error="wrong"
                        success="right" name="GURDIAN_ADDRESS" value={formData.GURDIAN_ADDRESS} onChange={handleChange} />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <h5>Documents</h5>
                    <MDBCol lg="4" className="py-1">
                      Child picture: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      Child birth certificate: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      School attendance certificate: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      Father death certificate: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      CNIC father: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      CNIC mother: <input type="file" />
                    </MDBCol>
                    <MDBCol lg="4" className="py-1">
                      CNIC gurdian: <input type="file" />
                    </MDBCol>
                  </MDBRow>

                </div>
                <div className="text-end w-100">
                <Link to={"/home/child/list"}><MDBBtn color="danger" className="mx-2 my-5" >Close</MDBBtn></Link><MDBBtn type={"button"} className="mx-2  my-5" onClick={onSubmit} >Add</MDBBtn>
                </div>
              </form>

            </MDBRow>
          </MDBContainer>
        </MDBCardBody>

      </MDBCard>

    </div>
  );
}
