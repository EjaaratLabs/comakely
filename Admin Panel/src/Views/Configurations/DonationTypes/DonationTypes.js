import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/DonationType-store';
import * as Action from '../../../Actions/DonationTypes-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'id',
        sort: 'asc'

    },
    {
        label: 'Type',
        field: 'type',
        sort: 'asc'
    }
];

class DonationTypes extends Component {
    constructor(props) {
        super(props)
        Action.fetchTypes();
        this.wrapper = React.createRef();
        this.state = {
            types: Store.getTypes(),
            donationTypeModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleTypeModal = () => {
        this.setState({
            donationTypeModal: !this.state.donationTypeModal
        })
    }
    onChange = () => {

        this.setState({
            types: Store.getTypes()
        })
    }
    createNewType = () => {
        var valueName = document.getElementById("formTypeName").value;
        var valueId = document.getElementById("formTypeId").value;
        if (valueName && valueId) {
            Action.createNewType({
                "id": valueId,
                "type": valueName
            }, this.toggleTypeModal)
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
                                    Donation Types
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleTypeModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.types }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.donationTypeModal} toggle={this.toggleTypeModal}>
                    <MDBModalHeader toggle={this.toggleTypeModal}>New Donation Types</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">

                            <label htmlFor="formTypeId" className="grey-text">
                                ID
        </label>
                            <input type="text" id="formTypeId" className="form-control" required />
                            <br />
                            <label htmlFor="formTypeName" className="grey-text">
                                Type
        </label>
                            <input type="text" id="formTypeName" className="form-control" required />

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleTypeModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewType}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default DonationTypes;