import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Centers-store';
import * as Action from '../../../Actions/Centers-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'id',
        sort: 'asc'

    },
    {
        label: 'Name',
        field: 'name',
        sort: 'asc'
    },
    {
        label: 'City',
        field: 'city',
        sort: 'asc'
    }
];

class Centers extends Component {
    constructor(props) {
        super(props)
        Action.fetchCenters();
        
        this.state = {
            centers: Store.getCenters(),
            centerModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleCenterModal = () => {
        this.setState({
            centerModal: !this.state.centerModal
        })
    }
    onChange = () => {

        this.setState({
            centers: Store.getCenters()
        })
    }
    createNewCenter = () => {
        var data = document.getElementById("createCenterForm");
   
        if (data) {
            Action.createNewCenter({
                "name": data.elements["name"].value,
                "phone":data.elements["phone"].value,
                "address":data.elements["address"].value,
                "city":data.elements["city"].value
            }, this.toggleCenterModal)
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
                                    Centers
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleCenterModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.centers }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.centerModal} toggle={this.toggleCenterModal}>
                    <MDBModalHeader toggle={this.toggleCenterModal}>New Center</MDBModalHeader>
                    <MDBModalBody>
                        <form  className="text-left" id="createCenterForm">
                            <label  className="grey-text">
                                Name
        </label>
                            <input type="text" id="formAreaName" name="name" className="form-control" required />
                            <br/>
                            <label  className="grey-text">
                                Address
        </label>
                            <input type="text" id="formCenterAddress" name="address" className="form-control" required />
                            <br/>
                            <label   className="grey-text">
                                Phone
        </label>
                            <input type="text" id="formCenterPhone" name="phone" className="form-control" required />
                            <br/>
                            <label   className="grey-text">
                                City
        </label>
                            <input type="text" id="formCenterCity" name="city" className="form-control" required />
                            <br/>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleCenterModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewCenter}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default Centers;