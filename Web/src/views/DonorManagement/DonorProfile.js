import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCardHeader,
  MDBBadge,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem

} from 'mdb-react-ui-kit';
import { DonorSubProfile, DonorSubStatus, DonorSubChild,DonorOperations } from './DonorProfileSubForms';
import { changeScreen, GetDonorDetailsAsync } from '../../reducers/DonorProfileSlice'
import { getToken} from '../../reducers/AuthSlice'

export const DonorProfile = (props) => {
  const dispatch = useDispatch();
  let params = useParams();
  const token = useSelector(getToken);
  useEffect(() => {

    dispatch(GetDonorDetailsAsync({params:{donorId:params.profileId,},token}))
  }, []);


  var formData = useSelector(state => state.donorProfile.profileData);

  const [fillActive, setFillActive] = useState('tab1');
 
  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
  return (
    <div className="p-4 text-start w-100">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a >Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem>
          <a href='/home/donors'>Donors</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Profile</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBCard alignment='center' >

        <MDBCardHeader className="text-start"><h5 style={{ marginBottom: 0 }}> Donor profile</h5></MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <MDBRow >
              <MDBCol size="12">

                <img
                  src='https://mdbcdn.b-cdn.net/img/new/standard/city/047.jpg'
                  className=' rounded-circle'
                  style={{ height: "150px", width: "150px" }}
                />

                <h4 className='mt-3'>{formData?.details?.name}</h4>
                <p className=''>3 Child Adopted | <MDBBadge color='success'>Paid</MDBBadge> </p>
                <hr />
              </MDBCol>
              <MDBCol size="12">
                <MDBTabs fill className='mb-3'>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                      Status
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab5')} active={fillActive === 'tab5'}>
                      Operations
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                      Profile
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
                      Children
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab4')} active={fillActive === 'tab4'}>
                      Transaction History
                    </MDBTabsLink>
                  </MDBTabsItem>

                </MDBTabs>

                <MDBTabsContent>
                  <MDBTabsPane show={fillActive === 'tab1'}><DonorSubStatus /></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab5'}><DonorOperations /></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab2'}><DonorSubProfile data={formData?formData:{}} /></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab3'}>< DonorSubChild data={formData?formData:{}} /></MDBTabsPane>
                </MDBTabsContent>
              </MDBCol>
              
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>

      </MDBCard>

    </div>
  );
}
