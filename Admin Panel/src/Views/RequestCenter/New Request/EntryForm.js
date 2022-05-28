import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MDBContainer, MDBModalFooter, MDBModal, MDBModalHeader, MDBModalBody, MDBDataTable, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader, MDBLink } from 'mdbreact';
import './style.css';
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from 'react-toastify';
import * as AStore from '../../../Stores/Area-store';
import * as AAction from '../../../Actions/Areas-action';
import * as DTStore from '../../../Stores/DonationType-store';
import * as DTAction from '../../../Actions/DonationTypes-action';
import * as DMStore from '../../../Stores/DonationMethod-store';
import * as DMAction from '../../../Actions/DonationMethods-action';
import * as DPStore from '../../../Stores/DonationPurpose-store';
import * as DPAction from '../../../Actions/DonationPurposes-action';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';
const columns = [
    {
        label: 'Area',
        field: 'areaName',
        sort: 'asc'
    },
    {
        label: 'Purpose',
        field: 'purposeName',
        sort: 'asc'
    },
    {
        label: 'Type',
        field: 'donationType',
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
        field: 'amount',
        sort: 'asc'
    }
];
class EntryForm extends Component {
    constructor(props) {
        super(props);
        AAction.fetchAreas();
        DTAction.fetchTypes();
        DMAction.fetchMethods();

        this.state = {
            firstName: '',
            name: '',
            lastName: '',
            email: '',
            phone: '',
            title: '',
            amount: '',
            subAmount: '',
            phoneTemplate: '',
            cnic: '',
            address: '',
            modifyAmount: true,
            modalAddDonation: false,
            areas: AStore.getAreas(),
            donationTypes: DTStore.getTypes(),
            donationMethods: DMStore.getMethods(),
            donationPurpose: DPStore.getList(),
            purposeId: '',
            purposeName: '',
            subDonations: [],
            modalRecipt: false,
            reciptData: "",
            reciptVerifyData: "",
            subQty: "1",
            subCAmount: '',
            totalAmount: 0,
            ref: '',
            tempQty: 1,
            selectedProject: '',
            whatsapp: '',
            paymentMethod: '',
            modalVerifyRecipt: false,
            comments: '',
            disabledWhatsapp: false
        }

    }
    componentDidMount() {
        AStore.addChangeListener(this.onChange);
        DTStore.addChangeListener(this.onChange);
        DMStore.addChangeListener(this.onChange);
        DPStore.addChangeListener(this.onChange);
        Store.addChangeListener(this.onChange);

    }
    componentWillUnmount() {
        AStore.removeChangeListener(this.onChange);
        DTStore.removeChangeListener(this.onChange);
        DMStore.removeChangeListener(this.onChange);
        DPStore.removeChangeListener(this.onChange);
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {
        var details = Store.getDonorDetails();
        if (!details.phone) {
            this.setState({
                areas: AStore.getAreas(),
                donationTypes: DTStore.getTypes(),
                donationMethods: DMStore.getMethods(),
                donationPurpose: DPStore.getList(),
                detailsTemplate: Store.getDonorDetails(),
            })
        }
        else {
            this.setState({
                areas: AStore.getAreas(),
                donationTypes: DTStore.getTypes(),
                donationMethods: DMStore.getMethods(),
                donationPurpose: DPStore.getList(),
                detailsTemplate: Store.getDonorDetails(),
                firstName: details.firstname,
                lastName: details.lastname,

                email: details.email ? details.email : this.state.email,
                cnic: details.cnic ? details.cnic : this.state.cnic,
                address: details.address ? details.address : this.state.address,
                name: details.name ? details.name : this.state.name,
                whatsapp: details.whatsapp ? details.whatsapp : this.state.whatsapp
            })
        }
    }
    state = {
        customerMode: "1"
    }
    updateCustomerMode = (e) => {
        this.setState({
            customerMode: e.target.value
        });
    }
    changeHandler = (event) => {
        if (event.target.name == "phone" && this.state.disabledWhatsapp) {
            this.setState({ [event.target.name]: event.target.value,whatsapp:event.target.value })
        }
        else {
            this.setState({ [event.target.name]: event.target.value })
        }

    }
    toggleAddDonationModal = () => {
        this.setState({
            selectedProject: '',
            tempQty: 1,
            modalAddDonation: !this.state.modalAddDonation
        })
    }
    processRecipt = (details) => {


        var detailTable = "";

        details.donationDetails.forEach((element) => {
            detailTable += `<tr style="padding:5px">
            <td style='font-size:10px'>`
                + element.projectName +
                `</td>
                <td style='font-size:10px;text-align:center'>`
                + element.quantity +
                `</td>
            <td style='font-size:10px;text-align:center'>
            `
                + element.amount +
                `
            </td>
            </tr>`;

        });

        var reciptData = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://www.alkhidmat.com/wp-content/uploads/2020/04/Logo.jpg' style="width:50px; height:60px"/>
            <h5>`+ details.centerName + ", " + details.city +
            `</h5>
            <hr>Donation Receipt<hr>
        </div>                           
        <div style='text-align:left;width:100%'>
        <table  style='font-size:10px;width:100%'>
        <tr >
        <td >
        Reference#:
        </td>
        <td>`
            +
            details.refNum
            +
            `</td>                      
        </tr>
        <tr>
        <td>
        Issuer:
        </td>
        <td>
        `
            +
            details.issuerName
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Donor Name:
        </td>
        <td>
        `
            +
            details.donorName
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Date:
        </td>
        <td>
        `
            +
            details.date
            +
            `
        </td>
        </tr>
        </table>
        
        </div>
        <hr>
        <div style='text-align:left;width:100%'>
        <table style='width:100%'>
        <tr  style='border:1px solid black'>
        <th style='color: #686B73;padding:2px;font-size:12px'>
        Project
        </th>
        <th style='color: #686B73;padding:2px;font-size:12px;text-align:center'>
        Quantity
        </th>
        <th style='color: #686B73;padding:2px;font-size:12px;text-align:center'>
        Amount
        </th>
        </tr>
        `+
            detailTable +
            `
        </table>
        <hr>
        <table style='width:100%'>
        <tr>
        <td style='font-size:10px'>
        <b>Net Amount:</b>
        </td>
        <td style='font-size:10px;text-align:right'>
        <b>PKR  `
            +
            details.totalAmount
            +
            `</b>
        </td>
        </tr>
        </table>
        </div>`+
            (details.comment ?
                (`<hr>
        <span style="font-size:15px"><b>Comments</b></span>
        <br/>
        `
                    +
                    details.comment) : "")
            +
            `
        <hr>
        <div style='text-align:center;font-size:13px;'>
        Powered by Ejaarat
        </div>
        </body>
        </html>
        `;
        this.setState({
            reciptData: reciptData
        })
        this.toggleReciptModal();
    }
    processVerifyRecipt = () => {

        var val = document.getElementById("createDonationMethod").value.split("-");
        var methodEl = val[1];
        var detailTable = "";
        var total = 0;
        this.state.subDonations.forEach((element) => {
            detailTable += `<tr style="padding:5px">
            <td style='font-size:15px'>`
                + element.purposeName +
                `</td>
                <td style='font-size:15px;text-align:center'>`
                + element.quantity +
                `</td>
            <td style='font-size:15px;text-align:center'>
            `
                + element.amount +
                `
            </td>
            </tr>`;
            total = total + (element.quantity * element.amount);
        });

        var reciptData = `
        <html>
        <body >
                                 
        <div style='text-align:left;width:100%'>
        <table  style='font-size:15px;width:100%'>
        
        <tr>
        <td>
        Donor Name:
        </td>
        <td>
        `
            +
            this.state.name
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Phone:
        </td>
        <td>
        `
            +
            this.state.phone
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Whatsapp:
        </td>
        <td>
        `
            +
            this.state.whatsapp
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Email:
        </td>
        <td>
        `
            +
            this.state.email
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Address:
        </td>
        <td>
        `
            +
            this.state.address
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Payment Method:
        </td>
        <td>
        `
            +
            methodEl
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Reference:
        </td>
        <td>
        `
            +
            this.state.ref
            +
            `
        </td>
        </tr>
        

        </table>
        
        </div>
        <hr>
        <div style='text-align:left;width:100%'>
        <table style='width:100%'>
        <tr  style='border:1px solid black'>
        <th style='color: #686B73;padding:2px;font-size:18px'>
        Project
        </th>
        <th style='color: #686B73;padding:2px;font-size:18px;text-align:center'>
        Quantity
        </th>
        <th style='color: #686B73;padding:2px;font-size:18px;text-align:center'>
        Amount
        </th>
        </tr>
        `+
            detailTable +
            `
        </table>
        <hr>
        <table style='width:100%'>
        <tr>
        <td style='font-size:15px'>
        <b>Net Amount:</b>
        </td>
        <td style='font-size:15px;text-align:right'>
        <b>PKR  `
            +
            total
            +
            `</b>
        </td>
        </tr>
        </table>
        </div>
        <hr>
        <div style='text-align:center;font-size:15px;'>
        Powered by Ejaarat
        </div>
        </body>
        </html>
        `;
        this.setState({
            reciptVerifyData: reciptData
        })

    }
    toggleReciptModal = () => {
        // this._updateIframe();

        this.setState({
            modalRecipt: !this.state.modalRecipt
        })
    }
    toggleVerifyReciptModal = () => {
        // this._updateIframe();
        if (!this.state.modalVerifyRecipt)
            this.processVerifyRecipt();
        this.setState({
            modalVerifyRecipt: !this.state.modalVerifyRecipt
        })
    }
    addSubDonation = () => {
        var data = document.getElementById("createDonationSubForm");

        if (data) {

            var allow = true;
            if (!data.elements["areaId"].value || data.elements["areaId"].value == '0-0') {
                allow = false;
                toast.error("Error ! Domain not selected")
            }
            if (!this.state.purposeId) {
                allow = false;
                toast.error("Error ! Project not selected")
            }
            if (!data.elements["amount"].value || data.elements["amount"].value < 1) {
                allow = false;
                toast.error("Error ! Invalid amount provided")
            }
            if (!data.elements["quanity"].value || data.elements["quanity"].value < 1) {
                allow = false;
                toast.error("Error ! Invalid quantity provided")
            }


            if (allow) {
                this.state.totalAmount = this.state.totalAmount + (parseInt(data.elements["quanity"].value) * parseFloat(data.elements["amount"].value))
                var areaVal = data.elements["areaId"].value.split("-")
                var donVal = data.elements["donationTypeId"].value.split("-")
                this.state.subDonations.push({
                    "amount": data.elements["amount"].value,
                    "areaId": areaVal[0],
                    "areaName": areaVal[1],
                    "donationTypeId": donVal[0],
                    "donationType": donVal[1],
                    "purposeId": this.state.purposeId,
                    "purposeName": this.state.purposeName,
                    "quantity": data.elements["quanity"].value
                })
                this.setState(
                    {
                        subDonations: this.state.subDonations,
                        modalAddDonation: false,
                        totalAmount: this.state.totalAmount,
                        purposeId: '',
                        areaVal: ''
                    }
                )
            }

        }
    }


    submitDonation = () => {
        this.toggleVerifyReciptModal()
        var methodEl = document.getElementById("createDonationMethod").value.split("-");

        Action.createNewDonation({
            "name": this.state.name,
            //  "lastName": this.state.lastName,
            "reference": this.state.ref,
            "email": this.state.email,
            "phone": "+92" + this.state.phone.substring(1, 11),
            "cnic": this.state.cnic,
            "address": this.state.address,
            "methodId": methodEl[0],
            "method": methodEl[1],
            "donationList": this.state.subDonations,
            "comment": this.state.comments
        }, this.processRecipt);

        this.setState({
            //firstName: '',
            // lastName: '',
            name: '',
            email: '',
            phone: '',
            title: '',
            amount: '',
            address: '',
            subDonations: [],
            totalAmount: 0,
        });

    }
    fetchDonorDetails = () => {
        if (this.state.phone && this.state.phone.length == 11) {
            Action.fetchDonorDetails("+92" + this.state.phone.substring(1, 11));

        }
    }
    resetDetails = () => {
        Action.resetDonorDetails();
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            cnic: '',
            address: '',
            subDonations: []
        });
    }
    defaultDetails = () => {
        Action.resetDonorDetails();
        this.setState({
            firstName: 'Guest',
            lastName: 'Guest',
            email: '',
            phone: '03000000000',
            cnic: '',
            address: '',
            amount: "0",
            subDonations: []
        });
    }
    handleChange = (event) => {
        var val = event.target.value;
        var values = val.split("-")
        this.setState({ purposeId: values[0], purposeName: values[1] })
        this.handleAmount(values[2], values[3] == "1")
    }
    handleChangeArea = (event) => {
        var val = event.target.value.split("-");
        DPAction.fetchPurposes(val[0]);
    }
    handleAmount = (amount, modify) => {

        this.setState({ subAmount: amount, subCAmount: amount, modifyAmount: modify })
    }
    handleFormAmount = (event) => {

        this.setState({ subCAmount: event.target.value })
    }

    handleQuantityChange = (event) => {
        this.setState({ tempQty: event.target.value })
    }
    setWhatsappAsPhone = (e) => {
        if (e.target.checked) {
            this.setState({
                whatsapp: this.state.phone,
                disabledWhatsapp: true
            })
        }
        else {
            this.setState({
                disabledWhatsapp: false
            })
        }
    }
    verifyDetails = () => {
        var allow = true;
        if (!this.state.name) {
            allow = false;
            toast.error("Error ! Name not provided")
        }
        /*  if (!this.state.lastName) {
              allow = false;
              toast.error("Error ! Last Name not provided")
          }*/
        if (!this.state.phone) {
            allow = false;
            toast.error("Error ! Phone not provided.")
        }
        if (!this.state.whatsapp) {
            allow = false;
            toast.error("Error ! Whatsapp not provided.")
        }
        if (this.state.phone && this.state.phone.length != 11) {
            allow = false;
            toast.error("Error ! Invalid phone number provied.")
        }
        if (this.state.whatsapp && this.state.whatsapp.length != 11) {
            allow = false;
            toast.error("Error ! Invalid whatsapp number provied.")
        }
        if (this.state.subDonations.length == 0) {
            allow = false;
            toast.error("Error ! No donations added.")
        }
        if (this.state.email && ! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
            allow = false;
            toast.error("Error ! Invalid email provided.")
        }
        if (allow) {

            this.toggleVerifyReciptModal()
        }
    }

    printRecipt = () => {
        const iframe = document.getElementById("receipt");
        const iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        iframeWindow.print();
    }


    render() {
        var Alist = [<option value={"0-0"}>{"Select a domain"}</option>];
        this.state.areas.forEach((val) => {
            Alist.push(<option value={val["id"] + "-" + val["name"]}>{val["name"]}</option>)
        });
        var DTlist = [];
        this.state.donationTypes.forEach((val) => {
            DTlist.push(<option value={val["id"] + "-" + val["type"]}>{val["type"]}</option>)
        });
        var DMlist = [];
        this.state.donationMethods.forEach((val) => {
            DMlist.push(<option value={val["id"] + "-" + val["method"]}>{val["method"]}</option>)
        });
        var DPlist = [];
        this.state.donationPurpose.forEach((val) => {
            DPlist.push(<div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" value={val["id"] + "-" + val["purpose"] + "-" + val["defaultamount"] + "-" + val["customallowed"]} id={"DP-" + val["id"]} onClick={this.handleChange} checked={this.state.purposeId == val["id"]} />
                <label class="custom-control-label" htmlFor={"DP-" + val["id"]} >{val["purpose"]}</label>
            </div>)
        });
        return (
            <React.Fragment>
                <MDBContainer className="py-2">
                    <MDBRow>
                        {/* <MDBCol size="12" className="mx-auto text-left mb-2">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Customer Profile
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <form className="form-inline">


                                        <div className="d-flex w-100">
                                            <label
                                                htmlFor="defaultFormCardNameEx"
                                                className=" ml-2 grey-text font-weight-light"
                                            >
                                                Phone
                </label>
                                            <input
                                                type="text"
                                                value={this.state.phoneTemplate}
                                                className="mx-2 form-control"
                                                name="phoneTemplate"
                                                onChange={this.changeHandler}
                                            />
                                            <MDBBtn color="primary" className="my-0 py-0 shadow-sm btn-custom" onClick={this.fetchDonorDetails} >Import </MDBBtn>

                                            <MDBBtn color="primary" className="my-0 py-0 shadow-sm btn-custom" onClick={this.resetDetails} >Reset </MDBBtn>
                                            <MDBBtn color="primary" className="my-0 py-0 shadow-sm btn-custom" onClick={this.toggleReciptModal} >Default </MDBBtn>

                                        </div>

                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>*/}
                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    New Donation
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <span class="required-ast" style={{ fontSize: "12px" }}> * fields are required. </span>
                                    <br />
                                    <br />
                                    <form className="row">
                                        <div className="col-lg-6">
                                            <label
                                                htmlFor="defaultFormCardNameEx"
                                                className="grey-text font-weight-light"
                                            >
                                                Phone - فون<span class="required-ast"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={this.state.phone}
                                                className="form-control"
                                                name="phone"
                                                onChange={this.changeHandler}
                                                placeholder={"03xxxxxxxxx"}
                                                onBlur={this.fetchDonorDetails}

                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <label
                                                htmlFor="donationFormName"
                                                className="grey-text font-weight-light"
                                            >
                                                Full Name - پورا نام <span class="required-ast"> *</span>
                                            </label>
                                            <input
                                                id="donationFormName"
                                                type="text"
                                                value={this.state.name}
                                                className="form-control"
                                                name="name"
                                                onChange={this.changeHandler}
                                                required={true}
                                                placeholder={"Name"}
                                            />
                                        </div>
                                        {/*<div className="col-lg-6">
                                            <label
                                                htmlFor="defaultFormCardNameEx"
                                                className="grey-text font-weight-light"
                                            >
                                                Last Name<span class="required-ast"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={this.state.lastName}
                                                className="form-control"
                                                name="lastName"
                                                onChange={this.changeHandler}
                                            />
                    </div>*/}
                                        <div className="col-lg-6">
                                            <label
                                                htmlFor="defaultFormCardNameEx"
                                                className="grey-text font-weight-light"
                                            >
                                                Whatsapp - واٹس ایپ<span class="required-ast"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={this.state.whatsapp}
                                                className="form-control"
                                                name="whatsapp"
                                                onChange={this.changeHandler}
                                                disabled={this.state.disabledWhatsapp}
                                                placeholder={"03xxxxxxxxx"}
                                            />
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="same-as-phone-whatsapp" onChange={this.setWhatsappAsPhone} />
                                                <label class="custom-control-label" for="same-as-phone-whatsapp">Same as phone</label>
                                            </div>
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
                                                value={this.state.email}
                                                className="form-control"
                                                name="email"
                                                onChange={this.changeHandler}
                                                placeholder={"abc@alkhidmat.com"}
                                            />
                                        </div>

                                        <div className="col-lg-6">
                                            <label className="grey-text">
                                                Payment Method - ادائیگی کا طریقہ<span class="required-ast"> *</span>
                                            </label>
                                            <select className="browser-default custom-select" name="methodId" id="createDonationMethod" required>
                                                {DMlist}
                                            </select>
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
                                                value={this.state.ref}
                                                className="form-control"
                                                name="ref"
                                                onChange={this.changeHandler}
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
                                                value={this.state.address}
                                                className="form-control"
                                                name="address"
                                                onChange={this.changeHandler}
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

                                                value={this.state.comments}
                                                className="form-control"
                                                name="comments"
                                                onChange={this.changeHandler}
                                                rows={3}
                                            />
                                        </div>

                                        <div className="col-12 mt-4">
                                            <div className="w-100 d-flex mb-3">
                                                <h4>Donations</h4>
                                                <MDBBtn color="primary" className="py-2 ml-auto  shadow-sm btn-custom" onClick={this.toggleAddDonationModal}>
                                                    Add to cart

                                        </MDBBtn>
                                            </div>
                                            <MDBDataTable
                                                striped
                                                bordered
                                                small
                                                searching={false}
                                                paging={false}
                                                data={{ columns: columns, rows: this.state.subDonations }}
                                            />
                                            <div class="form-group ml-auto d-flex">
                                                <label for="inputEmail3" className=" col-form-label ml-auto">Total Amount </label>
                                                <div className="mx-2">
                                                    <input type="text" className="form-control ml-2 " value={this.state.totalAmount} />
                                                </div>
                                            </div>
                                        </div>

                                        {/*<label
                                            htmlFor="defaultFormCardNameEx"
                                            className="grey-text font-weight-light"
                                        >
                                            Amount
                </label>
                                        <input
                                            type="text"
                                            value={this.state.amount}
                                            className="form-control"
                                            name="amount"
                                            onChange={this.changeHandler}
                                        />
                                        <br />*/}
                                        <div className="text-center py-4 mt-3 ml-auto">
                                            <MDBBtn color="primary" className="py-2  shadow-sm btn-custom" onClick={this.verifyDetails}>
                                                Submit
                                            </MDBBtn>
                                        </div>

                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal isOpen={this.state.modalAddDonation} toggle={this.toggleAddDonationModal} size="lg">
                        <MDBModalHeader toggle={this.toggleAddDonationModal}>Add Donation</MDBModalHeader>
                        <MDBModalBody>
                            <form ref={this.wrapper} className="text-left w-100 d-flex flex-wrap" id="createDonationSubForm" >


                                <div className="col-lg-6">
                                    <label className="grey-text">
                                        Domain / Areas - ڈومین
        </label>
                                    <select className="browser-default custom-select" name="areaId" required onClick={this.handleChangeArea}>
                                        {Alist}
                                    </select>
                                </div>
                                {DPlist.length > 0 ? <div className="col-lg-6">
                                    <label className="grey-text">
                                        Donation Type - عطیہ کی قسم
        </label>
                                    <select className="browser-default custom-select" name="donationTypeId" required>
                                        {DTlist}
                                    </select>
                                </div> : ""}

                                {this.state.modifyAmount && this.state.purposeId && DPlist.length > 0 ? <div className="col-lg-6">
                                    <label htmlFor="formSubAmount" className="grey-text">
                                        Amount - رقم
        </label>
                                    <input type="text" id="formSubAmount" name="amountlb" className="form-control" required value={this.state.subAmount} disabled={true} />
                                </div> : ""}
                                {DPlist.length > 0 ? <div className="col-lg-6">
                                    <label htmlFor="formSubAmount" className="grey-text">
                                        {this.state.modifyAmount && this.state.purposeId && DPlist.length > 0 ? "Custom Amount - اپنی مرضی کے مطابق رقم" : "Amount - رقم"}
                                    </label>
                                    <input type="text" id="formSubAmount" name="amount" className="form-control" required value={this.state.subCAmount} disabled={!this.state.modifyAmount} onChange={this.handleFormAmount} />
                                </div> : ""}
                                {DPlist.length > 0 ? <div className="col-lg-6">
                                    <label htmlFor="formSubQty" className="grey-text">
                                        Quanity - مقدار
        </label>
                                    <input type="number" id="formSubQty" name="quanity" className="form-control" required value={this.state.tempQty} onChange={this.handleQuantityChange} min={1} />
                                </div> : ""}
                                <div className="col-12">
                                    {DPlist.length > 0 ? <label className="grey-text">
                                        Project - پروجیکٹ
        </label> : ""}
                                    <div className="w-100 d-flex flex-wrap">
                                        {DPlist}
                                    </div>


                                </div>

                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleAddDonationModal}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.addSubDonation}>Add</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.modalRecipt} toggle={this.toggleReciptModal} >
                        <MDBModalHeader toggle={this.toggleReciptModal}>Recipt</MDBModalHeader>
                        <MDBModalBody className="text-center">
                            <iframe style={{ height: "400px", width: "100%" }} srcdoc={this.state.reciptData} id="receipt" />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleReciptModal}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.printRecipt}>Print</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.modalVerifyRecipt} toggle={this.toggleVerifyReciptModal} >
                        <MDBModalHeader toggle={this.toggleVerifyReciptModal}>Are details provided correct ?</MDBModalHeader>
                        <MDBModalBody className="text-center">
                            <iframe style={{ height: "400px", width: "100%" }} srcdoc={this.state.reciptVerifyData} id="verify-receipt" />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleVerifyReciptModal}>No</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.submitDonation}>Yes </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

            </React.Fragment>
        )
    }
}


export default EntryForm
