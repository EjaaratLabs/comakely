import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as ChStore from '../../../Stores/Channels-store.js';
import * as ChAction from '../../../Actions/Channels-action.js';
import * as CtStore from '../../../Stores/Centers-store';
import * as CtAction from '../../../Actions/Centers-action';
import * as UrStore from '../../../Stores/Roles-store';
import * as UrAction from '../../../Actions/Roles-action';
import * as UStore from '../../../Stores/Users-store';
import * as UAction from '../../../Actions/User-action';


import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';

const columns = [

    {
        label: 'User Name',
        field: 'UserName',
        sort: 'asc'

    },
    {
        label: 'Name',
        field: 'Name',
        sort: 'asc'
    }
    ,
    {
        label: 'Phone',
        field: 'phone',
        sort: 'asc'

    },
    {
        label: 'Acount Type',
        field: 'accounttype',
        sort: 'asc'

    }
];

class Users extends Component {
    constructor(props) {
        super(props)
        ChAction.fetchChannels();
        CtAction.fetchCenters();
        UrAction.fetchRole();
        UAction.fetchUsers();
        this.wrapper = React.createRef();
        this.state = {
            channels: ChStore.getChannels(),
            centers: CtStore.getCenters(),
            roles: UrStore.getRoles(),
            users: UStore.getUsers(),
            userModal: false,
            name:'',
            phone:'',
            address:'',
            userName:'',
            password:'',
            channelId:'',
            roleId:'',
            centerId:''

        }

    }
    componentDidMount() {
        ChStore.addChangeListener(this.onChange);
        CtStore.addChangeListener(this.onChange);
        UrStore.addChangeListener(this.onChange);
        UStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        ChStore.removeChangeListener(this.onChange);
        CtStore.removeChangeListener(this.onChange);
        UrStore.removeChangeListener(this.onChange);
        UStore.removeChangeListener(this.onChange);
    }
    toggleUserModal = () => {
        this.setState({
            userModal: !this.state.userModal
        })
    }
    onChange = () => {

        this.setState({
            channels: ChStore.getChannels(),
            centers: CtStore.getCenters(),
            roles: UrStore.getRoles(),
            users: UStore.getUsers(),
        })
    }
    createNewUser=()=>{
       // var data = document.getElementById("createUserForm");
   console.log(this.state)
        if (this.state.name&& this.state.phone&& this.state.address&& this.state.userName && this.state.password && this.state.channelId && this.state.roleId && this.state.centerId) {
            UAction.createNewUser({
                "name": this.state.name,
                "phone":this.state.phone,
                "address":this.state.address,
                "userName":this.state.userName,
                "password":this.state.password,
                "channelId":this.state.channelId,
                "roleId":this.state.roleId,
                "centerId":this.state.centerId,
            }, this.toggleUserModal)
        }
    }
    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        var chlist = [];
        this.state.channels.forEach((val) => {
            chlist.push(<option value={val["channelId"]}>{val["channelname"]}</option>)
        });
        var ctlist = [];
        this.state.centers.forEach((val) => {
            ctlist.push(<option value={val["id"]}>{val["name"]}</option>)
        });

        var Urlist = [];
        this.state.roles.forEach((val) => {
            Urlist.push(<option value={val["RoleID"]}>{val["RoleName"]}</option>)
        });

        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Users
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleUserModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.users }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.userModal} toggle={this.toggleUserModal}>
                    <MDBModalHeader toggle={this.toggleUserModal}>New User</MDBModalHeader>
                    <form  className="text-left" id="createUserForm" onSubmit={(e)=>{
                        e.preventDefault()
                    }}>
                    <MDBModalBody>
                        

                            <label htmlFor="formUserName" className="grey-text">
                                Name
        </label>
                            <input type="text" id="formUserName" name="name" className="form-control" required value={this.state.name} onChange={this.changeHandler} />
                            <br />
                            <label htmlFor="formUserUserName" className="grey-text">
                                Username
        </label>
                            <input type="text" id="formUserUserName" name="userName" className="form-control" required value={this.state.userName} onChange={this.changeHandler} />
                            <br />
                            <label htmlFor="formUserPassword" className="grey-text">
                                Password
        </label>
                            <input type="password" id="formUserPassword" name="password" className="form-control" required value={this.state.password} onChange={this.changeHandler} />
                            <br />
                            <label htmlFor="formUserPhone" className="grey-text">
                                Phone
        </label>
                            <input type="text" id="formUserPhone" name="phone" className="form-control" required  value={this.state.phone} onChange={this.changeHandler} />
                            <br />
                            <label htmlFor="formUserEmail" className="grey-text">
                                Email
        </label>
                            <input type="email" id="formUserEmail" name="email" className="form-control" required value={this.state.email} onChange={this.changeHandler} />
                            <br />
                            <label htmlFor="formUserAddr" className="grey-text">
                                Address
        </label>
                            <input type="text" id="formUserAddr" name="address" className="form-control" required value={this.state.address} onChange={this.changeHandler} />
                            <br />
                            <label className="grey-text">
                                Role
        </label>
                            <select className="browser-default custom-select" name="roleId" required value={this.state.roleId} onChange={this.changeHandler}>
                                {Urlist}
                            </select>
                            <br />
                            <br />
                            <label className="grey-text">
                                Channel
        </label>
                            <select className="browser-default custom-select" name="channelId" required value={this.state.channelId} onChange={this.changeHandler}>
                                {chlist}
                            </select>
                            <br />
                            <br />
                            <label className="grey-text">
                                Center
        </label>
                            <select className="browser-default custom-select" name="centerId" required value={this.state.centerId} onChange={this.changeHandler}>
                                {ctlist}
                            </select>


                       
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleUserModal}>Close</MDBBtn>
                        <MDBBtn color="primary" type="submit" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewUser}>Save</MDBBtn>
                    </MDBModalFooter>
                    </form>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default Users;