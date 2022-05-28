import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Request-store';
import * as Action from '../../../Actions/Request-action';
import { CSVLink } from "react-csv";
import * as CenterStore from '../../../Stores/Centers-store';
import * as CenterAction from '../../../Actions/Centers-action';

import * as ChannelStore from '../../../Stores/Channels-store.js';
import * as ChannelAction from '../../../Actions/Channels-action.js';

import * as DonationMethodStore from '../../../Stores/DonationMethod-store';
import * as DonationMethodAction from '../../../Actions/DonationMethods-action';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const { format } = require('number-currency-format');



const columns = [
    {
        label: 'User Id',
        field: 'UserName',
        sort: 'asc'

    },
    {
        label: 'Name',
        field: 'Name'

    },
    {
        label: 'Phone',
        field: 'Phone'

    },
    {
        label: 'Account Type',
        field: 'accounttype'

    },
    {
        label: 'Action',
        field: 'action'

    }
];

class DonationsList extends Component {
    constructor(props) {
        super(props)
        Action.fetchUserRequests()
     
        // this.wrapper = React.createRef();
        this.state = {
            users: Store.getUserRequests(),

            renderChild: true,

            centerSelected: null,
            donationMethodSelected: null,
            channelSelected: null,
            donationStageSelected: null,
            startDateSelected: null,
            endDateSelected: null,
          
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);

    }
    componentWillUnmount() {
        this.setState({ renderChild: false });
        Store.removeChangeListener(this.onChange);

    }

    onChange = () => {
        var users = Store.getUserRequests()
        if (this.state.renderChild) {
            users.forEach((val) => {
                val.action = <div><Link to="#!" onClick={()=>{Action.updateUserRequestStatus({status:"1",userName:val.UserName},()=>{})}} style={{ color: "green" }}>Approve</Link> <Link  to="#!" onClick={()=>{Action.updateUserRequestStatus({status:"3",userName:val.UserName},()=>{})}} style={{ color: "red" }}>Reject</Link> </div>
       
            });

            this.setState({
                users: users
            })
        }

      
    }

    openDetail = (refNum) => {
        console.log(refNum, "DonationList.js: ref num");
        this.props.openDetail(refNum);
    }



    render() {
     
        return (
            <React.Fragment >
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader className='d-flex justify-content-between'> 
                                    <div>
                                   User requests
                                    </div>
                                       
                                </MDBCardHeader>
                                <MDBCardBody>

                                    <MDBDataTable
                                        sortable
                                        striped
                                        bordered
                                        small
                                        noBottomColumns
                                        data={{ columns: columns, rows: this.state.users }}
                                    />
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>

            </React.Fragment >
        );
    }

}
export default DonationsList;