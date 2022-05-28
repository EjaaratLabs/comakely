import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Channels-store.js';
import * as Action from '../../../Actions/Channels-action.js';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'channelId',
        sort: 'asc'

    },
    {
        label: 'Name',
        field: 'channelname',
        sort: 'asc'
    }
];

class Channels extends Component {
    constructor(props) {
        super(props)
        Action.fetchChannels();
        this.wrapper = React.createRef();
        this.state = {
            channels: Store.getChannels(),
            channelModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleChannelModal = () => {
        this.setState({
            channelModal: !this.state.channelModal
        })
    }
    onChange = () => {

        this.setState({
            channels: Store.getChannels()
        })
    }
    createNewChannel = () => {
        var value = document.getElementById("formChannelName").value;
        if (value) { Action.createNewChannel(value,this.toggleChannelModal) }
    }
    render() {
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Channels
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleChannelModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.channels }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.channelModal} toggle={this.toggleChannelModal}>
                    <MDBModalHeader toggle={this.toggleChannelModal}>New Channel</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">

                            <label htmlFor="channelName" className="grey-text">
                                Channel Name
        </label>
                            <input type="text" id="formChannelName" className="form-control" required />
                            <br />


                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleChannelModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewChannel}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default Channels;