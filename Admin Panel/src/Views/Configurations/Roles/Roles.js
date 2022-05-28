import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Roles-store';
import * as Action from '../../../Actions/Roles-action';

import { MDBModal, MDBInput, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'RoleID',
        sort: 'asc'

    },
    {
        label: 'Name',
        field: 'RoleName',
        sort: 'asc'
    }
];

class Roles extends Component {
    constructor(props) {
        super(props)
        Action.fetchPermission();
        Action.fetchRole();
        this.state = {
            // centers: Store.getCenters(),
            roles:Store.getRoles(),
            permission: Store.getPermissions(),
            roleModal: false
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
            roleModal: !this.state.roleModal
        })
    }
    onChange = () => {

        this.setState({
            permission: Store.getPermissions(),
            roles:Store.getRoles(),
            // centers: Store.getCenters()
        })
    }
    createNewCenter = () => {
        var data = document.getElementById("createCenterForm");

        /*   if (data) {
               Action.createNewCenter({
                   "name": data.elements["name"].value,
                   "phone":data.elements["phone"].value,
                   "address":data.elements["address"].value,
                   "city":data.elements["city"].value
               }, this.toggleCenterModal)
           }*/
    }
    render() {
        var perm = [];
        this.state.permission.forEach((val) => {
            perm.push(
                <div key={val.permissionId} className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id={val.permissionId} />
                    <label className="custom-control-label" for={val.permissionId} >{val.permissionName}</label>
                </div>
            )
        })
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Roles
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleCenterModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.roles }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.roleModal} toggle={this.toggleCenterModal}>
                    <MDBModalHeader toggle={this.toggleCenterModal}>New Role</MDBModalHeader>
                    <MDBModalBody>
                        <form className="text-left" id="createCenterForm">
                            <label className="grey-text">
                                Name
        </label>
                            <input type="text" id="formAreaName" name="name" className="form-control" required />
                            <br />

                            <div>
                             
                                {perm}
                            </div>
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
export default Roles;