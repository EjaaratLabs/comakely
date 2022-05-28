import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Request-store';
import * as Action from '../../../Actions/Request-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const reqcolumns = [
    {
        label: 'Subject',
        field: 'title',
        sort: 'asc'
      
    },
    {
        label: 'Message',
        field: 'msgdata',
        sort: 'asc'
    },
    {
        label: 'User',
        field: 'user',
        sort: 'asc'
    },
    {
        label: 'Date',
        field: 'time'
      
    } ,
    {
        label: 'Center',
        field: 'centername'
    } 
   
];

class Requests extends Component {
    constructor(props) {
        super(props)
        Action.fetchRequest()
      
        this.state = {
            requests: Store.getRequests()
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
            requests: Store.getRequests()
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
                                    Requests
                            </MDBCardHeader>
                                <MDBCardBody>
                                  
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: reqcolumns, rows: this.state.requests }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
           
            </React.Fragment>
        );
    }

}
export default Requests;