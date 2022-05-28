import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import EntryForm from './EntryForm';

class Donation extends Component {
    render() {
        return (
            <div className="w-100 text-left py-5 px-2">
                
                <MDBCol size={"12"}>
                    <EntryForm />
                </MDBCol>
            </div>
        );
    }

}
export default Donation;