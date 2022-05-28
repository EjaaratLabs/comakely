import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Reference Number',
        field: 'donationrefnum',
        sort: 'asc'

    },
    {
        label: 'Donor',
        field: 'name'
      
    },
    {
        label: 'Amount',
        field: 'amount'
       
    },
    {
        label: 'date',
        field: 'time'
      
    } ,
    {
        label: 'Enter by',
        field: 'user'
       
    }
];

class CustomReports extends Component {
    constructor(props) {
        super(props)
        Action.fetchDonations()
        this.wrapper = React.createRef();
        this.state = {
            donations: Store.getDonationList()
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);  
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {

        this.setState({
            donations: Store.getDonationList()
        })
    }
    render() {

        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Custom Reports
                            </MDBCardHeader>
                                <MDBCardBody>
                                  
                                    
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
           
            </React.Fragment>
        );
    }

}
export default CustomReports ;