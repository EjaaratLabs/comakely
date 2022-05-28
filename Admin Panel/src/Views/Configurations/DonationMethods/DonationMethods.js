import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/DonationMethod-store';
import * as Action from '../../../Actions/DonationMethods-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'id',
        sort: 'asc'

    },
    {
        label: 'Method',
        field: 'method',
        sort: 'asc'
    }
];

class DonationMethods extends Component {
    constructor(props) {
        super(props)
        Action.fetchMethods();
        this.wrapper = React.createRef();
        this.state = {
            methods: Store.getMethods(),
            donationMethodModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleMethodModal = () => {
        this.setState({
            donationMethodModal: !this.state.donationMethodModal
        })
    }
    onChange = () => {

        this.setState({
            methods: Store.getMethods()
        })
    }
    createNewType = () => {
        var valueName = document.getElementById("formMethodName").value;
        var valueId = document.getElementById("formMethodId").value;
        if (valueName && valueId) {
            Action.createNewMethod({
                "id": valueId,
                "method": valueName
            }, this.toggleMethodModal)
        }
    }
    render() {
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Donation Methods
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleMethodModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.methods }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.donationMethodModal} toggle={this.toggleMethodModal}>
                    <MDBModalHeader toggle={this.toggleMethodModal}>New Donation Method</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">

                            <label htmlFor="formMethodId" className="grey-text">
                                ID
        </label>
                            <input type="text" id="formMethodId" className="form-control" required />
                            <br />
                            <label htmlFor="formMethodName" className="grey-text">
                                Method
        </label>
                            <input type="text" id="formMethodName" className="form-control" required />

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleMethodModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewType}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default DonationMethods;