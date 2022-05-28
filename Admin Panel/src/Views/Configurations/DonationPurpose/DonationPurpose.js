import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/DonationPurpose-store';
import * as Action from '../../../Actions/DonationPurposes-action';
import * as AStore from '../../../Stores/Area-store';
import * as AAction from '../../../Actions/Areas-action';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'id',
        sort: 'asc'

    },
    {
        label: 'Project',
        field: 'purpose',
        sort: 'asc'
    },
    {
        label: 'Domain',
        field: 'areaname',
        sort: 'asc'
    },
    {
        label: 'Amount',
        field: 'defaultamount',
        sort: 'asc'
    }
];

class DonationPurpose extends Component {
    constructor(props) {
        super(props)
        Action.fetchPurposes("");
        AAction.fetchAreas();
        Action.fetchProjects();
        this.wrapper = React.createRef();
        this.state = {
            areas: AStore.getAreas(),
            types: Store.getList(),
            projects: Store.getProjects(),
            donationPurposeModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
        AStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
        AStore.removeChangeListener(this.onChange);
    }
    togglePurposeModal = () => {
        this.setState({
            donationPurposeModal: !this.state.donationPurposeModal
        })
    }
    onChange = () => {

        this.setState({
            types: Store.getList(),
            areas: AStore.getAreas(),
            projects: Store.getProjects(),
        })
    }
    createPurposeType = () => {
        var valueName = document.getElementById("formPurposeName").value;
        var valueId = document.getElementById("formPurposeId").value;
        var valueAllowedCheck = document.getElementById("formCustomCheck").checked?"1":"0";
        var valueAreaId = document.getElementById("areaId").value;
        var valueAllowedAmount = document.getElementById("formPurposeAmount").value;
        var valueZakatCheck = document.getElementById("formZakatCheck").checked?"1":"0";
        var valueSadqaCheck = document.getElementById("formSadqaCheck").checked?"1":"0";

        if (valueName && valueId) {
            Action.createNewPurposes({
                "id": valueId,
                "purpose": valueName,
                "areaId":valueAreaId,
                "customAllowed":valueAllowedCheck,
                "amount":valueAllowedAmount,
                "isZakat": valueZakatCheck,
                "isSadqa": valueSadqaCheck
            })
        }
        this.togglePurposeModal();
    }
    setProjectId = () => {
        var selection = document.getElementById("formPurposeName");
        var target = this.state.projects.find( object => object.VALUE == selection.value)
        document.getElementById("formPurposeId").value = target.ID;
    }
    render() {
        var Alist = [];
        this.state.areas.forEach((val) => {
            Alist.push(<option value={val["id"]}>{val["name"]}</option>)
        });
        var Plist = [];
        this.state.projects.forEach((val) => {
            Plist.push(<option value={val["VALUE"] }>{val["VALUE"]}</option>)
        })
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Projects
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.togglePurposeModal}><MDBIcon icon="plus" /> Add</MDBBtn>
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
                <MDBModal isOpen={this.state.donationPurposeModal} toggle={this.togglePurposeModal}>
                    <MDBModalHeader toggle={this.togglePurposeModal}>New Donation Purpose</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">

                            <label htmlFor="formPurposeId" className="grey-text">
                                ID
                            </label>
                            <input type="text" id="formPurposeId" className="form-control" disabled={true} required />
                            <br />

                            <label htmlFor="formPurposeName" className="grey-text">
                                Project
                            </label>
                            {/*<input type="text" id="formPurposeName" className="form-control" required />*/}
                            <select className="browser-default custom-select"  name="formPurposeName" id="formPurposeName"  onChange={this.setProjectId}  required>
                                {Plist}
                            </select>
                            <br />
                            <br />

                            <label className="grey-text">
                                Domain
                            </label>
                            <select className="browser-default custom-select"  name="areaId" id="areaId" required>
                                {Alist}
                            </select>
                            <br />
                            <br />

                            <label htmlFor="formPurposeAmount" className="grey-text">
                                Amount
                            </label>
                            <input type="text" id="formPurposeAmount" className="form-control" required />
                            <br />
                            <br />

                            <div className="form-check ml-1">
                                <input type="checkbox" id="formCustomCheck" className="form-check-input" />
                                <label htmlFor="formCustomCheck" className="grey-text form-check-label">
                                    Custom value allowed
                                </label>   
                            </div>

                            <div className="form-check ml-1">
                                <input type="checkbox" id="formZakatCheck" className="form-check-input" />
                                <label htmlFor="formZakatCheck" className="grey-text form-check-label">
                                    Zakat enabled
                                </label> 
                            </div>
                            <div className="form-check ml-1">
                                <input type="checkbox" id="formSadqaCheck" className="form-check-input" />
                                <label htmlFor="formSadqaCheck" className="grey-text form-check-label">
                                    Sadqa enabled
                                </label> 
                            </div>

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.togglePurposeModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createPurposeType}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default DonationPurpose;