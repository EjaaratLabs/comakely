import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { ToWords } from 'to-words';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';

import * as PMStore from '../../../Stores/Common-store';
import * as PMAction from '../../../Actions/Common-action';

import * as CenterStore from '../../../Stores/Centers-store';
import * as CenterAction from '../../../Actions/Centers-action';

import * as ChannelStore from '../../../Stores/Channels-store.js';
import * as ChannelAction from '../../../Actions/Channels-action.js';

import * as DonationMethodStore from '../../../Stores/DonationMethod-store';
import * as DonationMethodAction from '../../../Actions/DonationMethods-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';


const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    }
  });
const enums = {
    allCenters: "All centers",
    allChannels: "All sources",
    allDonationMethods: "All methods",
}

const dateEnums = {
    startDateSelect: 0,
    endDateSelect: 1,
}

const columns = [
    {
        label: 'Reference Number',
        field: 'donationrefnumlink',
        sort: 'asc'

    },
    {
        label: 'Donor',
        field: 'name'

    },
    {
        label: 'date',
        field: 'time'

    },
    {
        label: 'Center',
        field: 'centername'
    },
    {
        label: 'Action',
        field: 'action'
    }
];

class HomeCollectionList extends Component {
    constructor(props) {
        super(props)
        Action.fetchDonationsPickUp();
        CenterAction.fetchCenters();
        ChannelAction.fetchChannels();
        DonationMethodAction.fetchMethods();
        PMAction.fetchPaymentMethods();
        // this.wrapper = React.createRef();
        this.state = {
            donations: Store.getDonationPickUpList(),
            centers: CenterStore.getCenters(),
            channels: ChannelStore.getChannels(),
            donationMethods: DonationMethodStore.getMethods(),
            renderChild: true,
            paymentMethods: PMStore.getPaymentMethods(),
            centerSelected: null,
            donationMethodSelected: null,
            channelSelected: null,
            paymentMethodId:"1",
            startDateSelected: null,
            endDateSelected: null,
            amtColModal: false,
            modalRecipt: false,
            comments:''
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
        CenterStore.addChangeListener(this.onChange);
        ChannelStore.addChangeListener(this.onChange);
        DonationMethodStore.addChangeListener(this.onChange);
        PMStore.addChangeListener(this.onChange);
        
    }
    componentWillUnmount() {
        this.setState({ renderChild: false });
        Store.removeChangeListener(this.onChange);
        CenterStore.removeChangeListener(this.onChange);
        ChannelStore.removeChangeListener(this.onChange);
        DonationMethodStore.removeChangeListener(this.onChange);
        PMStore.removeChangeListener(this.onChange);
    }
    toggleCollectionModel = () => {
        this.setState({
            amtColModal: !this.state.amtColModal
        })
    }
    openCollectModal = (data) => {
        this.setState({
            "amountCollectionName": data.name,
            "amountToCollectValue": data.amount,
            "amountCollected": data.amount,
            "donationrefnum": data.donationrefnum
        });
        this.toggleCollectionModel();
    }
    onInputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChange = () => {
        var col = Store.getDonationPickUpList()
        if (this.state.renderChild) {
            col.forEach((val) => {
                val.donationrefnumlink = <Link key={val.donationrefnum} to="#!" onClick={this.openDetail.bind(this, val.donationrefnum)} style={{ color: "green" }}>{val.donationrefnum}</Link>
                val.action = <Link onClick={this.openCollectModal.bind(this, val)} style={{ color: "green" }}>Collect</Link>
            });

            this.setState({
                donations: col
            })
        }

        var centers = CenterStore.getCenters();
        var channels = ChannelStore.getChannels();
        var donationMethods = DonationMethodStore.getMethods();
        var paymentMethods=PMStore.getPaymentMethods();
        this.setState({
            centers,
            channels,
            donationMethods,
            paymentMethods
        })
    }

    openDetail = (refNum) => {
        console.log(refNum, "DonationList.js: ref num");
        this.props.openDetail(refNum);
    }

    // SELECTORS [START]
    onCenterSelect = (e) => {
        this.setState({
            [e.target.id]: e.target.value === enums.allCenters ? null : e.target.value
        });
    }
    onDonationMethodSelect = (e) => {
        this.setState({
            [e.target.id]: e.target.value === enums.allDonationMethods ? null : e.target.value
        });
    }
    onChannelSelect = (e) => {
        console.log(e.target.value === enums.allChannels)
        this.setState({
            [e.target.id]: e.target.value === enums.allChannels ? null : e.target.value
        });
    }
    onDateRangeSelect = (e, dateEnum) => {
        var dateValue = e.target.valueAsDate;
        dateValue = dateValue ? dateValue : null;
        console.log(dateValue, dateEnum);

        if (dateEnum === dateEnums.startDateSelect) {
            this.setState({
                startDateSelected: dateValue,
            })
        } else {
            this.setState({
                endDateSelected: dateValue,
            })
        }
    }
    fseparator=(numb)=> {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }
    // SELECTORS [END]
    submitDonation = () => {

        Action.collectHomeDonation({
            donationRefNum: this.state.donationrefnum,
            amountCollected:this.state.amountCollected,
            paymentMethodId:this.state.paymentMethodId,
            comment:this.state.comments
        }, this.processRecipt);



    }
    processRecipt = (details) => {


        var detailTable = "";

        details.donationDetails.forEach((element) => {
            detailTable += `<tr style="padding:5px">
            <td style='font-size:9px'>`
                + element.projectName +"-"+element.donationType +
                `</td>
                <td style='font-size:9px;text-align:center'>`
                + element.quantity +
                `</td>
            <td style='font-size:9px;text-align:center'>
            `
                + this.fseparator(element.totalAmount) +
                `
            </td>
            </tr>`;

        });

        var reciptData = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/aklong.jpg' style="width:150px; height:60px"/>
            <h6>Alkhidmat Welfare society (Regd)<br/>501- Quaideen Colony Opposite Islamia College,Karachi
            </h6>
            <hr>Donation Receipt
            <hr>
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
        <b>
        `
            +
            details.donorName
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        <b>
        `
            +
            details.donorPhone
            +
            `</b>
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
        <tr>
        <td>
        Payment Method:
        </td>
        <td>
        `
            +
            'Home Collection'
            +
            `
        </td>
        </tr>`+
        (details.chequeNo?(`<tr>
        <td>
        Cheque No:
        </td>
        <td>
        `
            +
            details.chequeNo
            +
            `
        </td>
        </tr>`):"")
        +
        (details.reference?(`<td>
        Care of:
        </td>
        <td>
        `
            +
            details.reference
            +
            `
        </td>
        </tr>`):"")+
        `
        </table>
        
        </div>
        <hr>
        <div style='text-align:left;width:100%'>
        <table style='width:100%'>
        <tr  style='border:1px solid black'>
        <th style='color: #686B73;padding:2px;font-size:10px'>
        Project
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
        Qty
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
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
            this.fseparator(details.totalAmount)
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td colspan="2"  style='font-size:10px;text-align:left'>
        `+
        toWords.convert(details.totalAmount, { currency: true })
        +
        `
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
        var reciptData1 = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/aklong.jpg' style="width:150px; height:60px"/>
            <div style='font-size:16px;width:100%'><b>Alkhidmat Welfare Society (Regd.)</b></div>
            <div style='font-size:12px;width:100%'>501- Quaideen Colony Opposite Islamia College,Karachi<br/><br/>UAN 021 111 503 504</div>
            
            <hr>Donation Receipt
                <br/>
                <span style='font-size:12px'>Donor copy<span/>    
            <hr>
        </div>                           
        <div style='text-align:left;width:100%'>
        <table  style='font-size:11px;width:100%'>
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
        <b>`
            +
            details.donorName
            +
            `
            </b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        `
            +
            details.donorPhone
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
        <tr>
        <td>
        Payment Method:
        </td>
        <td>
        `
            +
            'Home Collection'
            +
            `
        </td>
        </tr>`+
        (details.chequeNo?(`<tr>
        <td>
        Cheque No:
        </td>
        <td>
        `
            +
            details.chequeNo
            +
            `
        </td>
        </tr>`):"")
        +
        (details.reference?(`<td>
        Care of:
        </td>
        <td>
        `
            +
            details.reference
            +
            `
        </td>
        </tr>`):"")+
        `

        </table>
        
        </div>
        <hr>
        <div style='text-align:left;width:100%'>
        <table style='width:100%'>
        <tr  style='border:1px solid black'>
        <th style='color: #686B73;padding:2px;font-size:10px'>
        Project
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
        Qty
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
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
            this.fseparator(details.totalAmount)
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td colspan="2"  style='font-size:10px;text-align:left'>
        `+
        toWords.convert(details.totalAmount, { currency: true })
        +
        `
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
        
        <div style='text-align:center;font-size:12px;'>
         Income tax Exemption U/S 2 (36) (C) of Income Tax ordinance 2001
        <br/>
        <div style='text-align:center;font-size:14px;'>
           <b> www.alkhidmat.com</b>
        </div>
        </div>
        
        <hr style="margin-top:40px;margin-bottom:40px;border-style:dashed" />
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/aklong.jpg' style="width:150px; height:60px"/>
            <div style='font-size:16px;width:100%'><b>Alkhidmat Welfare Society (Regd.)</b></div>
            <div style='font-size:12px;width:100%'>501- Quaideen Colony Opposite Islamia College,Karachi<br/><br/>UAN 021 111 503 504</div>
            
            <hr>Donation Receipt
                <br/>
                <span style='font-size:12px'>Agent copy<span/>    
            <hr>
        </div>                           
        <div style='text-align:left;width:100%'>
        <table  style='font-size:11px;width:100%'>
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
        <b>
        `
            +
            details.donorName
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        `
            +
            details.donorPhone
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
        <tr>
        <td>
        Payment Method:
        </td>
        <td>
        `
            +
            'Home Collection'
            +
            `
        </td>
        </tr>`+
        (details.chequeNo?(`<tr>
        <td>
        Cheque No:
        </td>
        <td>
        `
            +
            details.chequeNo
            +
            `
        </td>
        </tr>`):"")
        +
        (details.reference?(`<td>
        Care of:
        </td>
        <td>
        `
            +
            details.reference
            +
            `
        </td>
        </tr>`):"")+
        `
        </table>
        
        </div>
        <hr>
        <div style='text-align:left;width:100%'>
        <table style='width:100%'>
        <tr  style='border:1px solid black'>
        <th style='color: #686B73;padding:2px;font-size:10px'>
        Project
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
        Qty
        </th>
        <th style='color: #686B73;padding:2px;font-size:10px;text-align:center'>
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
            this.fseparator(details.totalAmount)
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td colspan="2"  style='font-size:10px;text-align:left'>
        `+
        toWords.convert(details.totalAmount, { currency: true })
        +
        `
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
        <div style='text-align:center;font-size:12px;'>
         Income tax Exemption U/S 2 (36) (C) of Income Tax ordinance 2001
        <br/>
        <div style='text-align:center;font-size:14px;'>
         <b>   www.alkhidmat.com </b>
        </div>
        </div>
        
        </body>
        </html>
        `;
        this.setState({
            reciptData: reciptData,
            reciptDataPrint:reciptData1
        })
        this.toggleReciptModal();
    }
    /*processRecipt = (details) => {


        var detailTable = "";

        details.donationDetails.forEach((element) => {
            detailTable += `<tr style="padding:5px">
            <td style='font-size:10px'>`
                + element.projectName + "-" + element.donationType +
                `</td>
                <td style='font-size:10px;text-align:center'>`
                + element.quantity +
                `</td>
            <td style='font-size:10px;text-align:center'>
            `
                + element.totalAmount +
                `
            </td>
            </tr>`;

        });

        var reciptData = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/akLogo.png' style="width:50px; height:60px"/>
            <h5>`+ details.centerName + ", " + details.city +
            `</h5>
            <hr>Donation Receipt
            <hr>
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
        <b>
        `
            +
            details.donorName
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        <b>
        `
            +
            details.donorPhone
            +
            `</b>
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
        var reciptData1 = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/akLogo.png' style="width:50px; height:60px"/>
            <h5>`+ details.centerName + ", " + details.city +
            `</h5>
            <hr>Donation Receipt
                <br/>
                <span style='font-size:12px'>Donor copy<span/>    
            <hr>
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
        <b>`
            +
            details.donorName
            +
            `
            </b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        `
            +
            details.donorPhone
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
        <div style='text-align:center;font-size:12px;'>
        For any queries feel free to contact on ‎+92 311 1288881
        </div>
        <hr>
        <div style='text-align:center;font-size:14px;'>
        Powered by Ejaarat
        </div>
        <hr style="margin-top:40px;margin-bottom:40px;border-style:dashed" />
        <div style='text-align:center;width:100%'>
            <img src='https://ejaarat.com/clientlogos/akLogo.png' style="width:50px; height:60px"/>
            <h5>`+ details.centerName + ", " + details.city +
            `</h5>
            <hr>Donation Receipt
                <br/>
                <span style='font-size:12px'>Agent copy<span/>    
            <hr>
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
        <b>
        `
            +
            details.donorName
            +
            `</b>
        </td>
        </tr>
        <tr>
        <td>
        Donor Phone:
        </td>
        <td>
        `
            +
            details.donorPhone
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
        <div style='text-align:center;font-size:12px;'>
        For any queries feel free to contact on ‎+92 311 1288881
        </div>
        <hr>
        <div style='text-align:center;font-size:14px;'>
        Powered by Ejaarat
        </div>
        </body>
        </html>
        `;
        this.setState({
            reciptData: reciptData,
            reciptDataPrint: reciptData1
        })
        this.toggleCollectionModel();
        this.toggleReciptModal();
    }*/
    toggleReciptModal = () => {
        // this._updateIframe();

        this.setState({
            modalRecipt: !this.state.modalRecipt
        })
    }
    printRecipt = () => {
        // this.switchAgentCopy()
        const iframe = document.getElementById("receiptcol1");
        // iframe.style.display="block";
        const iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        iframeWindow.print();
    }
    render() {
        const { centers, channels, donationMethods, donations,
            centerSelected, donationMethodSelected, channelSelected, startDateSelected, endDateSelected,
        } = this.state;
        // console.log(channels, donationMethods);
        // console.log(new Date(startDateSelected).getTime());

        // filtering data by values from spinner
        var filteredByCenter = centerSelected ? donations.filter((e) => e.centername === centerSelected) : donations;
        var filteredByChannel = channelSelected ? filteredByCenter.filter((e) => e.source === channelSelected) : filteredByCenter;
        var filteredByDonationMethod = donationMethodSelected ? filteredByChannel.filter((e) => e.methodid === donationMethodSelected) : filteredByChannel;
        var filteredByGreaterThanEqualToStartDate = startDateSelected ? filteredByDonationMethod.filter((e) => new Date(e.time).getTime() >= new Date(startDateSelected).getTime()) : filteredByDonationMethod;
        var filteredByLessThanEqualToEndDate = endDateSelected ? filteredByGreaterThanEqualToStartDate.filter((e) => new Date(e.time).getTime() <= new Date(endDateSelected).getTime()) : filteredByGreaterThanEqualToStartDate;
        var DMlist = [];

        this.state.paymentMethods.forEach((val) => {
            DMlist.push(<option value={val["id"]}>{val["method"]}</option>)
        });


        return (
            <React.Fragment >
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Donation pick up
                                </MDBCardHeader>
                                <MDBCardBody>

                                    <MDBDataTable
                                        sortable
                                        striped
                                        bordered
                                        small
                                        noBottomColumns
                                        data={{ columns: columns, rows: filteredByLessThanEqualToEndDate }}
                                    />
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.amtColModal} toggle={this.toggleCollectionModel}>
                    <MDBModalHeader toggle={this.toggleCollectionModel}>Collect donation</MDBModalHeader>
                    <MDBModalBody>
                        <form ref={this.wrapper} className="text-left">
                            <label htmlFor="amountCollectionName" className="grey-text">
                                Name
        </label>
                            <input type="text" id="amountCollectionName" name="amountCollectionName" className="form-control" value={this.state.amountCollectionName} required disabled />
                            <br />
                            <label htmlFor="amountCollectionValue" className="grey-text">
                                Amount to be collected
        </label>
                            <input type="text" id="amountCollectionValue" name="amountToCollectValue" className="form-control" value={this.state.amountToCollectValue} required disabled />
                            <br />
                            <label htmlFor="amountForCollection" className="grey-text">
                                Amount collected
        </label>
                            <input type="text" name="amountCollected" id="amountForCollection" className="form-control" value={this.state.amountCollected} onChange={this.onInputChangeHandler} required />
                            <br />
                            <label className="grey-text">
                                Payment Method 
                            </label>
                            <select className="browser-default custom-select" name="methodId" id="collectDonationMethod" required value={this.state.paymentMethodId} onChange={this.onInputChangeHandler}>
                                {DMlist}
                            </select>
                            <br />
                            <label htmlFor="commentsForCollection" className="grey-text">
                                Comments
        </label>
                            <textarea type="text" name="comments" id="commentsForCollection" className="form-control" value={this.state.comments} onChange={this.onInputChangeHandler} required rows={3} />

                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleCollectionModel}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.submitDonation}>Collect</MDBBtn>
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
                <iframe style={{ height: "400px", width: "100%", display: 'none' }} srcdoc={this.state.reciptDataPrint} id="receiptcol1" />
            </React.Fragment>
        );
    }

}
export default HomeCollectionList;