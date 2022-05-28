import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Area-store';
import * as Action from '../../../Actions/Areas-action';

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
    }
];

class Areas extends Component {
    constructor(props) {
        super(props)
        Action.fetchAreas();
        this.wrapper = React.createRef();
        this.state = {
            areas: Store.getAreas(),
            areaModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleAreasModal = () => {
        this.setState({
            areaModal: !this.state.areaModal
        })
    }
    onChange = () => {

        this.setState({
            areas: Store.getAreas()
        })
    }
    createNewArea = () => {
        var valueName = document.getElementById("formAreaName").value;
        var valueId = document.getElementById("formAreaId").value;
        if (valueName && valueId) {
            Action.createNewArea({
                "id": valueId,
                "name": valueName
            }, this.toggleAreasModal)
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
                                    Domains
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleAreasModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.areas }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.areaModal} toggle={this.toggleAreasModal}>
                    <MDBModalHeader toggle={this.toggleAreasModal}>New Domain</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">

                            <label htmlFor="formAreaId" className="grey-text">
                                ID
        </label>
                            <input type="text" id="formAreaId" className="form-control" required />
                            <br />
                            <label htmlFor="formAreaName" className="grey-text">
                                Name
        </label>
                            <input type="text" id="formAreaName" className="form-control" required />

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleAreasModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewArea}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default Areas;