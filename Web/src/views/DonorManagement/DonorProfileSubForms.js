import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GridButton } from '../../CustomComponents/GridButton';
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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,

} from 'mdb-react-ui-kit';
import DataTable from 'react-data-table-component';
import { getToken } from '../../reducers/AuthSlice'
import { GetAvailableChildProfilesListAsync, getAvailableProfiles, linkDonorAsync, deLinkDonorAsync } from '../../reducers/ChildProfileSlice'
import { GetDonorLinkedAsync, getLinkedChild } from '../../reducers/DonorProfileSlice'
import { Link } from 'react-router-dom';
const statusMap = { "1": "Active", "2": "Suspended", "3": "Dropped" }
  ;



const childData = [
  {
    id: 1,
    name: 'Ashar Ali',
    age: '12',
    status: 'Active',
    // action: <GridButton iconName="user-times" color="red" />
  },
  {
    id: 1,
    name: 'Ashar Ali',
    age: '12',
    status: 'Active',
    // action: <GridButton iconName="user-times" color="red" />
  },
  {
    id: 1,
    name: 'Ashar Ali',
    age: '12',
    status: 'Active',
    //action: 
  },
]

export const DonorSubProfile = (props) => {
  var data = useSelector(state => state.donorProfile.profileData);
  const [formData, setFormData] = useState(data.details);

  return (
    <div className="p-4 text-start w-100">

      <form>

        <div className="grey-text text-start">

          <MDBRow>
            <h5>Donor Information</h5>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Name" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.name} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="CNIC" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.cnic} />
            </MDBCol>

            <MDBCol lg="4" className="py-1">
              <MDBInput label="Phone" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.phone} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Email" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.email} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Whatsapp" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.whatsapp} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">

              <MDBInput label="Date of Birth" icon="envelope" type="date" defaultValue={new Date().toString()} value={new Date().toString()} error="wrong"
                success="right" />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <select className="form-select" value={formData?.gender} >
                <option>Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Others</option>
              </select>
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Care of" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.careof} />
            </MDBCol>

          </MDBRow>
          <hr />
          <MDBRow className="mt-3">
            <h5>Basic Information</h5>

            <MDBCol lg="4" className="py-1">
              <select className="form-select" value={formData?.city} >
                <option>Select City</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <select className="form-select" value={formData?.region}>
                <option>Select Region</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <select className="form-select" value={formData?.district}>
                <option>Select Disctrict</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <select className="form-select" value={formData?.tehsil} >
                <option>Select Tehsil</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Town/Village" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.town} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="Zone/Circle" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.zone} />
            </MDBCol>
            <MDBCol lg="4" className="py-1">
              <MDBInput label="UC" icon="envelope" group type="text" validate error="wrong"
                success="right" value={formData?.uc} />
            </MDBCol>

          </MDBRow>

          <hr />
          <MDBRow>
            <h5>Documents</h5>
            <MDBCol lg="4" className="py-1">
              Donor picture: <input type="file" />
            </MDBCol>

            <MDBCol lg="4" className="py-1">
              Donor CNIC: <input type="file" />
            </MDBCol>

          </MDBRow>
        </div>

      </form>
      <MDBCol size="12">
        <div className="text-end w-100">
          <Link to="/home/donors/list"><MDBBtn color="danger" className="mx-2 my-5" type={'button'} className="mx-2 my-5" >Close</MDBBtn></Link><MDBBtn className="mx-2  my-5">Save</MDBBtn>
        </div>
      </MDBCol>

    </div>
  );
}

export function DonorSubStatus() {

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => {

    setBasicModal(!basicModal)
  };

  return (
    <div className="p-4 text-start w-100">

      <form>
        <MDBRow>
          <MDBCol size='4'>
            <MDBInput className="mt-3" label="Child adopted" type="text" value={"3"} disabled style={{ backgroundColor: "#FFFFFF" }}
            />
          </MDBCol>
          <MDBCol size='4'>
            <MDBInput className="mt-3" label="Amount payable" type="text" value={"0"} disabled style={{ backgroundColor: "#FFFFFF" }}
            />
          </MDBCol>
          <MDBCol size='4'>
            <MDBInput className="mt-3" label="Amount paid (Current Month)" type="text" value={"30000"} disabled style={{ backgroundColor: "#FFFFFF" }}
            />
          </MDBCol>
          <MDBCol size='4'>
            <MDBInput className="mt-3" label="Total amount paid" type="text" value={"30000"} disabled style={{ backgroundColor: "#FFFFFF" }}
            />
          </MDBCol>
        </MDBRow>
      </form>
      <MDBCol size="12">
        <div className="text-end w-100">
          <Link to="/home/donors/list"><MDBBtn color="danger" className="mx-2 my-5" type={'button'} className="mx-2 my-5" >Close</MDBBtn></Link>
        </div>
      </MDBCol>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' backdrop={false} staticBackdrop={true} >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Pay amount</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <MDBRow>
                  <MDBCol size='6'>
                    <MDBInput className="mt-3" label="Amount payable" type="text" value={"3"} disabled style={{ backgroundColor: "#FFFFFF" }}
                    />
                  </MDBCol>
                  <MDBCol size='6'>
                    <MDBInput className="mt-3" label="Amount" type="text" value={"0"} style={{ backgroundColor: "#FFFFFF" }}
                    />
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color='success' onClick={toggleShow}>
                Collect
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export function DonorOperations() {

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => {

    setBasicModal(!basicModal)
  };

  return (
    <div className="p-4 text-start w-100">

      <form>
        <MDBRow>
          <MDBCol size='8'>
            <div>Collect payment manually.</div>
          </MDBCol>
          <MDBCol size='4'>
            <MDBBtn color="success" className="mx-2 my-5" type={'button'} className="mx-2 my-5" onClick={toggleShow} >Pay amount payable</MDBBtn>
          </MDBCol>

        </MDBRow>
        <MDBRow>
          <MDBCol size='8'>
            Block Donor
          </MDBCol>
          <MDBCol size='4'>
            <MDBBtn color="success" className="mx-2 my-5" type={'button'} className="mx-2 my-5" onClick={toggleShow} >Block</MDBBtn>
          </MDBCol>

        </MDBRow>
        <MDBRow>
          <MDBCol size='8'>
            Block Donor
          </MDBCol>
          <MDBCol size='4'>
            <MDBBtn color="success" className="mx-2 my-5" type={'button'} className="mx-2 my-5" onClick={toggleShow} >Reset user credentials</MDBBtn>
          </MDBCol>

        </MDBRow>
      </form>
      <MDBCol size="12">
        <div className="text-end w-100">
          <Link to="/home/donors/list"><MDBBtn color="danger" className="mx-2 my-5" type={'button'} className="mx-2 my-5" >Close</MDBBtn></Link>
        </div>
      </MDBCol>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' backdrop={false} staticBackdrop={true} >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Pay amount</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <MDBRow>
                  <MDBCol size='6'>
                    <MDBInput className="mt-3" label="Amount payable" type="text" value={"3"} disabled style={{ backgroundColor: "#FFFFFF" }}
                    />
                  </MDBCol>
                  <MDBCol size='6'>
                    <MDBInput className="mt-3" label="Amount" type="text" value={"0"} style={{ backgroundColor: "#FFFFFF" }}
                    />
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color='success' onClick={toggleShow}>
                Collect
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}


export const DonorSubChild = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  var formData = useSelector(state => state.donorProfile.profileData);


  const data = useSelector(getAvailableProfiles);
  // const linkeeddata = useSelector(getLinkedChild);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => {
    if (!basicModal) { dispatch(GetAvailableChildProfilesListAsync({ token })); }
    setBasicModal(!basicModal)
  };

  const linkChild = (childId) => {

    dispatch(linkDonorAsync({ token, formData: { childId: childId, donorId: formData.details.regid } }));
  }
  const deLinkChild = (childId) => {

    dispatch(deLinkDonorAsync({ token, formData: { childId: childId, donorId: formData.details.regid } }));
  }

  const childColumns = [
    {
      name: 'Registration ID',
      selector: row => row.regid,
    },
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Status',
      selector: row => statusMap[row.status],
    },
    {
      //row.action
      name: 'Actions',
      selector: row => <MDBBtn tag='a' color='none' style={{ color: "red" }} onClick={() => {
        deLinkChild(row.regid)
      }} >
        <MDBIcon fas icon={"user-times"} size="sm" />
      </MDBBtn>,
    },
  ];

  const modalChildColumns = [
    {
      name: 'Registration ID',
      selector: row => row.regid,
    },
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Actions',
      selector: row => <MDBBtn tag='a' color='none' style={{ color: "green" }} onClick={() => linkChild(row.regid)}>
        <MDBIcon fas icon={"user-plus"} size="sm" />
      </MDBBtn>,
    },
  ];
  console.log(formData.children)
  return (
    <div className="p-4 text-start w-100">
      <div className="w-100 d-flex p-4 justify-content-end" >
        <MDBBtn onClick={() => { toggleShow() }} >Add Child</MDBBtn>
      </div>
      <DataTable
        pagination="true"
        columns={childColumns}
        data={formData.children}

      />
      <MDBCol size="12">
        <div className="text-end w-100">
          <Link to="/home/donors/list"><MDBBtn color="danger" className="mx-2 my-5" type={'button'} className="mx-2 my-5">Close</MDBBtn></Link>
        </div>
      </MDBCol>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' backdrop={false} staticBackdrop={true} >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign Child</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>

              <DataTable
                pagination="true"
                columns={modalChildColumns}
                data={data}

              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </div>
  );
}