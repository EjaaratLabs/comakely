import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Donations-store';
import * as AuthStore from '../../../Stores/Authentication-store';
import * as Action from '../../../Actions/Donations-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Area',
        field: 'areaname',
        sort: 'asc'
    },
    {
        label: 'Project',
        field: 'projectname',
        sort: 'asc'
    },
    {
        label: 'Type',
        field: 'donationtype',
        sort: 'asc'
    },
    {
        label: 'Quanity',
        field: 'quantity',
        sort: 'asc'
    }
    ,
    {
        label: 'Amount',
        field: 'amtCurr',
        sort: 'asc'
    }
];

class DonationsForm extends Component {
    constructor(props) {
        super(props)

        // this.wrapper = React.createRef();
        this.state = {
            donationDetails: null,
            actionCommentModal: false,
            modalActionComments: "",
            userPermission: AuthStore.getUserPermissions()
        }
    }
    componentDidMount() {
        const { refNum } = this.props;
        console.log(refNum, "DonationForm.js: ref num");
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    closeDetail = () => {
        this.props.isShowList(true);
    }

    onChange = () => {

        this.setState({
            donationDetails: Store.getDonationDetails(),
            userPermission: AuthStore.getUserPermissions()
        })
    }
    toggleActionCommentModal = () => {
        this.setState({
            actionCommentModal: !this.state.actionCommentModal,
            modalActionComments: ""
        })

    }
    updateTransaction = () => {
        Action.updateDonation({
            donationRefNum: this.state.donationDetails.info.donationrefnum,
            status: '4',
            comment: this.state.modalActionComments
        }, this.toggleActionCommentModal)
    }
    onInputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {

        const { donationDetails } = this.state;
        console.log(donationDetails, "DonationForm.js: details");
        if (donationDetails) {
            return (
                <React.Fragment>
                    <MDBContainer className="py-2">
                        <MDBRow>
                            <MDBCol size="12" className="mx-auto text-left">
                                <MDBCard className="shadow-sm">
                                    <MDBCardHeader>
                                        Mistake Donations-Donation Details
                                    </MDBCardHeader>
                                    <MDBCardBody>

                                        <br />
                                        <br />
                                        <form className="row">
                                            <div className="col-lg-6">
                                                <label

                                                    className="grey-text font-weight-light"
                                                >
                                                    Donation No
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.donationrefnum}
                                                    className="form-control"

                                                    placeholder={""}
                                                    disabled

                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label

                                                    className="grey-text font-weight-light"
                                                >
                                                    Source
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.sourcename}
                                                    className="form-control"

                                                    placeholder={""}
                                                    disabled

                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label

                                                    className="grey-text font-weight-light"
                                                >
                                                    Status
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.statusmsg}
                                                    className="form-control"

                                                    placeholder={""}
                                                    disabled

                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Phone - فون<span className="required-ast"> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.phone}
                                                    className="form-control"
                                                    name="phone"
                                                    placeholder={"03xxxxxxxxx"}
                                                    disabled

                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label
                                                    htmlFor="donationFormName"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Full Name - پورا نام <span className="required-ast"> *</span>
                                                </label>
                                                <input
                                                    id="donationFormName"
                                                    type="text"
                                                    value={this.state.donationDetails.info.name}
                                                    className="form-control"
                                                    name="name"
                                                    disabled
                                                    placeholder={"Name"}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Whatsapp - واٹس ایپ<span className="required-ast"> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.whatsapp}
                                                    className="form-control"
                                                    name="whatsapp"
                                                    disabled
                                                    placeholder={"03xxxxxxxxx"}
                                                />

                                            </div>
                                            <div className="col-lg-6">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Email - ای میل (Optional)
                                                </label>
                                                <input
                                                    type="email"
                                                    value={this.state.donationDetails.info.email}
                                                    className="form-control"
                                                    name="email"
                                                    disabled
                                                    placeholder={"abc@alkhidmat.com"}
                                                />
                                            </div>

                                            <div className="col-lg-6">
                                                <label className="grey-text">
                                                    Payment Method - ادائیگی کا طریقہ<span className="required-ast"> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.donationmethod}
                                                    className="form-control"
                                                    name="paymentMethod"
                                                    disabled
                                                    placeholder={""}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Care of(Reference) - حوالہ
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.reference}
                                                    className="form-control"
                                                    name="ref"
                                                    disabled
                                                    placeholder={"ref"}
                                                />
                                            </div>
                                            <div className="col-lg-12">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Address - پتہ
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.donationDetails.info.address}
                                                    className="form-control"
                                                    name="address"
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-lg-12">
                                                <label
                                                    htmlFor="defaultFormCardNameEx"
                                                    className="grey-text font-weight-light"
                                                >
                                                    Comments - تبصرے
                                                </label>
                                                <textarea
                                                    value={this.state.donationDetails.info.comments}
                                                    className="form-control"
                                                    name="comments"
                                                    onChange={() => { }}
                                                    rows={3}
                                                />
                                            </div>

                                            <div className="col-12 mt-4">

                                                <MDBDataTable
                                                    striped
                                                    bordered
                                                    small
                                                    searching={false}
                                                    noBottomColumns

                                                    paging={false}
                                                    data={{ columns: columns, rows: this.state.donationDetails.details }}
                                                />
                                                <div className="form-group ml-auto d-flex">
                                                    <label for="inputEmail3" className=" col-form-label ml-auto">Total Amount </label>
                                                    <div className="mx-2">
                                                        <input type="text" className="form-control ml-2 " value={this.state.donationDetails.info.amount} disabled />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="text-center py-4 mt-3 ml-auto">

                                                <MDBBtn color="dark-green" className="py-2  shadow-sm btn-custom" onClick={this.closeDetail} >
                                                    Back to list
                                                </MDBBtn>

                                            </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>


                    </MDBContainer>
                    <MDBModal isOpen={this.state.actionCommentModal} toggle={this.toggleActionCommentModal}>
                        <MDBModalHeader toggle={this.toggleActionCommentModal}>Are you sure you want to perform this action ?</MDBModalHeader>
                        <MDBModalBody>
                            <form className="text-left">
                                <label htmlFor="commentsForCollection" className="grey-text">
                                    Comments
                                </label>
                                <textarea type="text" name="modalActionComments" id="commentsForCollection" className="form-control" value={this.state.modalActionComments} onChange={this.onInputChangeHandler} required rows={3} />

                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleActionCommentModal}>No</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.updateTransaction}>Yes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>


                </React.Fragment>
            );
        } else {
            return <h1>loading...</h1>;
        }
    }

}
export default DonationsForm;