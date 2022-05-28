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
import { ChildSubProfile, ChildubStatus, ChildSubChild,ChildAcademicReport,ChildHealthReport,ChildDonors } from './ChildProfileSubForms';
const statusMap = { "1": "Active", "2": "Suspended", "3": "Dropped" }
  ;


export const ChildProfile = (props) => {
  var data = useSelector(state => state.donorProfile.profileData);
  var formData=useState({})
  const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
  var badge = <MDBBadge color='success'>Paid</MDBBadge>;
  /*if (props.details.status == "1") {
    badge = <MDBBadge color='success'>{statusMap[props.details.status]}</MDBBadge>
  } else if (props.details.status == "2") {
    badge = <MDBBadge color='danger'>{statusMap[props.details.status]}</MDBBadge>
  } else if (props.details.status == "3") {
    badge = <MDBBadge color='danger'>{statusMap[props.details.status]}</MDBBadge>
  }*/
  return (
    <div className="p-4 text-start w-100">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a >Home</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem>
          <a href='/home/donors'>Child</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Profile</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <MDBCard alignment='center' >

        <MDBCardHeader className="text-start"><h5 style={{ marginBottom: 0 }}> Child profile</h5></MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <MDBRow >
              <MDBCol size="12">

                <img
                  src='https://mdbcdn.b-cdn.net/img/new/standard/city/047.jpg'
                  className=' rounded-circle'
                  style={{ height: "150px", width: "150px" }}
                />

                <h4 className='mt-3'>{formData.name}</h4>
                <p className=''> {badge} </p>
                <hr />
              </MDBCol>
              <MDBCol size="12">
                <MDBTabs fill className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
                      Overview
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
                      Profile
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
                      Academic
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab4')} active={fillActive === 'tab4'}>
                      Health
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab5')} active={fillActive === 'tab5'}>
                      Donor
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab6')} active={fillActive === 'tab6'}>
                      Gallery
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab7')} active={fillActive === 'tab7'}>
                      Reports
                    </MDBTabsLink>
                  </MDBTabsItem>

                </MDBTabs>

                <MDBTabsContent>
                  <MDBTabsPane show={fillActive === 'tab1'}><div>Overview </div></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab2'}><ChildSubProfile  details={{}} /></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab3'}>< ChildAcademicReport /></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab4'}><ChildHealthReport/></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab5'}><ChildDonors/></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab6'}><div>adasd</div></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab7'}><div>adasd</div></MDBTabsPane>
                  <MDBTabsPane show={fillActive === 'tab8'}><div>adasd</div></MDBTabsPane>
                </MDBTabsContent>
              </MDBCol>
            
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>

      </MDBCard>

    </div>
  );
}
