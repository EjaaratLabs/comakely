import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Reports-store';
import * as Action from '../../../Actions/Reports-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Name',
        field: 'name',
        sort: 'asc'

    },
    {
        label: 'Description',
        field: 'description'

    },
    {
        label: 'Action',
        field: 'action'

    }
];
const data=[{
"name":"Daily user collection report",
"description":"Daily collection of user",
"action": <MDBBtn color="primary" className="shadow-none mb-0 px-4 py-2" onClick={Action.generateDailyUserReport} > Generate</MDBBtn>
}];

class Reports extends Component {
    constructor(props) {
        super(props)
    
       

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {

    }
    render() {

        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Reports
                            </MDBCardHeader>
                                <MDBCardBody>
                                <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        searching={false}
                                        displayEntries={false}
                                        paging={false}
                                        data={{ columns: columns, rows: data }}
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
export default Reports;