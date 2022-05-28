import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MDBContainer, MDBModalFooter, MDBModal, MDBModalHeader, MDBModalBody, MDBDataTable, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader, MDBLink } from 'mdbreact';
import './style.css';
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from 'react-toastify';
import { ToWords } from 'to-words';

import * as AStore from '../../Stores/Area-store';
import * as AAction from '../../Actions/Areas-action';
import * as DTStore from '../../Stores/DonationType-store';
import * as DTAction from '../../Actions/DonationTypes-action';
import * as PMStore from '../../Stores/Common-store';
import * as PMAction from '../../Actions/Common-action';
import * as DPStore from '../../Stores/DonationPurpose-store';
import * as DPAction from '../../Actions/DonationPurposes-action';
import * as Store from '../../Stores/Donations-store';
import * as Action from '../../Actions/Donations-action';
const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    }
  });
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
    },
    {
        label: 'Action',
        field: 'action',
        sort: 'asc'
    }
];

class EntryForm extends Component {
    
    constructor(props) {
        super(props);
        AAction.fetchAreas();
        DPAction.fetchPurposesPackages("-1");
       // DTAction.fetchTypes();
        PMAction.fetchPaymentMethods();
        Store.resetDonorDetails()
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
            paymentMethods: PMStore.getPaymentMethods(),
            donationPurpose: DPStore.getList(),
            donationPackages:DPStore.getPackages(),
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
            disabledWhatsapp: false,
            detailsTemplate:{},
            index:1,
            packageId:'-1',
            packageName:'',
            donationPackagesList:[],
        }

    }
    componentDidMount() {
        AStore.addChangeListener(this.onChange);
        DTStore.addChangeListener(this.onChange);
        PMStore.addChangeListener(this.onChange);
        DPStore.addChangeListener(this.onChange);
        Store.addChangeListener(this.onChange);

    }
    componentWillUnmount() {
        AStore.removeChangeListener(this.onChange);
        DTStore.removeChangeListener(this.onChange);
        PMStore.removeChangeListener(this.onChange);
        DPStore.removeChangeListener(this.onChange);
        Store.removeChangeListener(this.onChange);
    }
    fseparator=(numb)=> {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }
    onChange = () => {
        var details = Store.getDonorDetails();
        if (!details.phone) {
            this.setState({
                areas: AStore.getAreas(),
                donationTypes: DTStore.getTypes(),
                paymentMethods: PMStore.getPaymentMethods(),
                donationPurpose: DPStore.getList(),
                donationPackages:DPStore.getPackages(),
                detailsTemplate: Store.getDonorDetails(),
                packageId:'-1',
                packageName:'',
                donationPackagesList:[],
            })
        }
        else {
            this.setState({
                areas: AStore.getAreas(),
                donationTypes: DTStore.getTypes(),
                paymentMethods: PMStore.getPaymentMethods(),
                donationPurpose: DPStore.getList(),
                detailsTemplate: Store.getDonorDetails(),
                donationPackages:DPStore.getPackages(),
                packageId:'-1',
                packageName:'',
                donationPackagesList:[],
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
    changeDontarTemplateHandler = (event) => {
        if (event.target.name == "phone" && this.state.disabledWhatsapp) {
            this.state.detailsTemplate[event.target.name]=event.target.value;
            this.state.detailsTemplate["whatsapp"]=event.target.value;
            
            this.setState( {detailsTemplate:this.state.detailsTemplate  })
        }
        else {
            this.state.detailsTemplate[event.target.name]=event.target.value;
            this.setState( {detailsTemplate:this.state.detailsTemplate  })
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
            <img src='https://alkhidmat.com/helplogo/aklong.jpg' style="width:150px; height:60px"/>
            <div style='font-size:20px;width:100%'><b>Alkhidmat Welfare Society (Regd.)</b></div>
            <div style='font-size:17px;width:100%'>501- Quaideen Colony Opposite Islamia College,Karachi</div>
            
            <hr>Receipt
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
            details.paymentMethod
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
            <img src='https://alkhidmat.com/helplogo/aklong.jpg' style="width:150px; height:60px"/>
            <div style='font-size:16px;width:100%'><b>Alkhidmat Welfare Society (Regd.)</b></div>
            <div style='font-size:12px;width:100%'>501- Quaideen Colony Opposite Islamia College,Karachi<br/><br/>UAN 021 111 503 504</div>
            
            <hr>Receipt
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
            details.paymentMethod
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
            <img src='https://alkhidmat.com/helplogo/aklong.jpg' style="width:150px; height:60px"/>
            <div style='font-size:16px;width:100%'><b>Alkhidmat Welfare Society (Regd.)</b></div>
            <div style='font-size:12px;width:100%'>501- Quaideen Colony Opposite Islamia College,Karachi<br/><br/>UAN 021 111 503 504</div>
            
            <hr>Receipt
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
            details.paymentMethod
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
    switchAgentCopy=()=>{
        this.setState({
            reciptData: this.state.reciptDataPrint
        })
    }
    processVerifyRecipt = () => {

        var val = document.getElementById("createDonationMethod").value.split("-");
        var methodEl = val[1];
        var detailTable = "";
        var total = 0;
        this.state.subDonations.forEach((element) => {
            console.log(element)
            detailTable += `<tr style="padding:5px">
            <td style='font-size:15px'>`
                + element.purposeName +"-"+element.donationType +
                `</td>
                <td style='font-size:15px;text-align:center'>`
                + element.quantity +
                `</td>
            <td style='font-size:15px;text-align:center'>
            `
                + this.fseparator(element.amount) +
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
            this.state.detailsTemplate.name
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
            this.state.detailsTemplate.phone
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
            this.state.detailsTemplate.whatsapp
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
            this.state.detailsTemplate.email
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
            this.state.detailsTemplate.address
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
        </tr>`+(this.state.chequeNo?
        (`<tr>
        <td>
        Cheque No:
        </td>
        <td>
        `
            +
            this.state.chequeNo
            +
            `
        </td>
        </tr>`):"")+

        
        `<tr>
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
            this.fseparator(total)
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
    success=()=>{
        this.state.detailsTemplate.name="";
        this.state.ref="";
        this.state.detailsTemplate.whatsapp="";
        this.state.detailsTemplate.email="";
        this.state.detailsTemplate.phone="";
        this.state.detailsTemplate.cnic="";
        this.state.detailsTemplate.address="";
        this.state.chequeNo="";
        this.state.subDonations=[];
        this.state.comments=""
        this.setState({
            detailsTemplate: this.state.detailsTemplate,
            ref:"",
            chequeNo:"",
            subDonations:[],
            comments:"",
        
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
            if (!data.elements["donationTypeId"] || !data.elements["donationTypeId"].value) {
                allow = false;
                toast.error("Error ! Donation type not selected")
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
                    "index":this.state.index,
                    "amount": data.elements["amount"].value,
                    "areaId": areaVal[0],
                    "areaName": areaVal[1],
                    "donationTypeId": donVal[0],
                    "donationType": donVal[1],
                    "packageId":this.state.packageId,
                    "packageName":((this.state.packageName&&this.state.packageName!='-1')?this.state.packageName:''),
                    "purposeId": this.state.purposeId,
                    "purposeName": this.state.purposeName,
                    "quantity": data.elements["quanity"].value,
                    "action":<Link style={{color:"red"}} onClick={this.removeSubDonation.bind(this,this.state.index)}>Remove</Link>
                })
                this.setState(
                    {
                        subDonations: this.state.subDonations,
                        modalAddDonation: false,
                        totalAmount: this.state.totalAmount,
                        purposeId: '',
                        areaVal: '',
                        index:this.state.index+1,
                        packageId:'-1',
                        packageName:'',
                        donationPackagesList:[]
                    }
                )
            }

        }
    }
    removeSubDonation=(index)=>{
        var values=this.state.subDonations.filter(e=>e.index==index)
        this.setState({
            subDonations:this.state.subDonations.filter(e=>e.index!=index),
            totalAmount:this.state.totalAmount-values[0].amount
        });
    }

    submitDonation = () => {
        this.toggleVerifyReciptModal()
        var methodEl = document.getElementById("createDonationMethod").value.split("-");
        var phone=this.state.detailsTemplate.phone;
        phone=this.state.detailsTemplate.phone.length<=11?("+92" +this.state.detailsTemplate.phone.substring(1, 11)):this.state.detailsTemplate.phone;
    
        Action.createNewDonation({
            "name": this.state.detailsTemplate.name,
            //  "lastName": this.state.lastName,
            "reference": this.state.ref,
            "email": this.state.detailsTemplate.email,
            "phone": phone,
            "cnic": this.state.detailsTemplate.cnic,
            "address": this.state.detailsTemplate.address,
            "methodId": methodEl[0],
            "method": methodEl[1],
            "chequeNo":this.state.chequeNo,
            "donationList": this.state.subDonations,
            "comment": this.state.comments
        }, this.processRecipt,this.success);
        Action.resetDonorDetails()
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
            detailsTemplate:{},
            disabledWhatsapp:false,
            chequeNo:'',
            ref:'',
            comments:'',
            packageId:''
        });
        

    }
    fetchDonorDetails = () => {
        if (this.state.detailsTemplate.phone && this.state.detailsTemplate.phone.length == 11) {
            Action.fetchDonorDetails("+92" + this.state.detailsTemplate.phone.substring(1, 11));

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
  
        this.state.donationTypes=[]
        var val = event.target.value;
        var values = val.split("-")
       
        var projectDetails=this.state.donationPurpose.find(element => element.id==values[0])
        
        if(projectDetails.issadqa==1)
        {
            this.state.donationTypes.push({
                id:"87",
                type:"General or sadqa"
            })
        }
        if(projectDetails.iszakat==1)
        {
            this.state.donationTypes.push({
                id:"89",
                type:"Zakat"
            })
        }
        if(projectDetails.isqurbani==1)
        {
            this.state.donationTypes.push({
                id:"673",
                type:"Qurbani"
            })
        }
        if(projectDetails.isfitra==1)
        {
            this.state.donationTypes.push({
                id:"1237",
                type:"Fitra"
            })
        }
        if(projectDetails.isfiddiya==1)
        {
            this.state.donationTypes.push({
                id:"1339",
                type:"Fiddiya"
            })
        }
        if(projectDetails.iskaffara==1)
        {
            this.state.donationTypes.push({
                id:"1253",
                type:"Kaffara"
            })
        }
        if(projectDetails.isdonation==1)
        {
            this.state.donationTypes.push({
                id:"1425",
                type:"Donation"
            })
        }
        
        var projectPackages=[];
    
  
        this.state.donationPackages.forEach(val=>{
            
            if(val.purposeId==projectDetails.id)
            {
                projectPackages.push(val);
            }
        })
        this.setState({ purposeId: values[0], purposeName: values[1],donationType: this.state.donationType ,donationPackagesList:projectPackages})
        
        this.handleAmount(values[2], values[3] == "1")
       
    }
    handleChangeArea = (event) => {
        var val = event.target.value.split("-");
        DPAction.fetchPurposes(val[0]);
    }
    handleAmount = (amount, modify) => {

        this.setState({ subAmount: amount, subCAmount: amount, modifyAmount: modify })
    }
    handlePackgeChange=(event)=>
    {
        var values=event.target.value.split("-")
        this.setState({ subAmount: values[1],packageId:values[0],subCAmount:values[1],packageName:values[2] })
    }
    handleFormAmount = (event) => {

        this.setState({ subCAmount: event.target.value })
    }

    handleQuantityChange = (event) => {
        this.setState({ tempQty: event.target.value })
    }
    setWhatsappAsPhone = (e) => {
        if (e.target.checked) {
            this.state.detailsTemplate["whatsapp"]=this.state.detailsTemplate["phone"]
            this.setState({
                detailsTemplate: this.state.detailsTemplate,
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
        if (!this.state.detailsTemplate.name) {
            allow = false;
            toast.error("Error ! Name not provided")
        }
        /*  if (!this.state.lastName) {
              allow = false;
              toast.error("Error ! Last Name not provided")
          }*/
        if (!this.state.detailsTemplate.phone) {
            allow = false;
            toast.error("Error ! Phone not provided.")
        }
        if (!this.state.detailsTemplate.whatsapp) {
            allow = false;
            toast.error("Error ! Whatsapp not provided.")
        }
        if (this.state.detailsTemplate.phone && (this.state.detailsTemplate.phone.length < 11 && this.state.detailsTemplate.phone.length > 13)) {
            allow = false;
            toast.error("Error ! Invalid phone number provied.")
        }
        if (this.state.detailsTemplate.whatsapp && (this.state.detailsTemplate.whatsapp.length < 11 && this.state.detailsTemplate.whatsapp.length > 13)) {
            allow = false;
            toast.error("Error ! Invalid whatsapp number provied.")
        }
        if (this.state.subDonations.length == 0) {
            allow = false;
            toast.error("Error ! No donations added.")
        }
        if (this.state.detailsTemplate.email && ! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
            allow = false;
            toast.error("Error ! Invalid email provided.")
        }
        if (allow) {

            this.toggleVerifyReciptModal()
        }
    }

    printRecipt = () => {
       // this.switchAgentCopy()
        const iframe = document.getElementById("receipt1");
       // iframe.style.display="block";
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
        this.state.paymentMethods.forEach((val) => {
            DMlist.push(<option value={val["id"] + "-" + val["method"]}>{val["method"]}</option>)
        });
        var DPlist = [];
        this.state.donationPurpose.forEach((val) => {
            DPlist.push(<div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" value={val["id"] + "-" + val["purpose"] + "-" + val["defaultamount"] + "-" + val["customallowed"]} id={"DP-" + val["id"]} onClick={this.handleChange} checked={this.state.purposeId == val["id"]} />
                <label class="custom-control-label" htmlFor={"DP-" + val["id"]} >{val["purpose"]}</label>
            </div>)
        });
        var DPPlist =this.state.donationPackagesList.length>0? [<option value={"-1" + "-" + "0"+'-'+"-1"}>--Select--</option>]:[];
        
        this.state.donationPackagesList.forEach((val) => {
            DPPlist.push(<option value={val["id"] + "-" + val["amount"]+"-"+val["name"]}>{val["name"]}</option>)
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
                                    Add Donation
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
                                                value={this.state.detailsTemplate.phone}
                                                className="form-control"
                                                name="phone"
                                                onChange={this.changeDontarTemplateHandler}
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
                                                value={this.state.detailsTemplate.name}
                                                className="form-control"
                                                name="name"
                                                onChange={this.changeDontarTemplateHandler}
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
                                                value={this.state.detailsTemplate.whatsapp}
                                                className="form-control"
                                                name="whatsapp"
                                                onChange={this.changeDontarTemplateHandler}
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
                                                value={this.state.detailsTemplate.email}
                                                className="form-control"
                                                name="email"
                                                onChange={this.changeDontarTemplateHandler}
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
                                               Cheque No.
                                            </label>
                                            <input
                                                type="text"
                                                value={this.state.chequeNo}
                                                className="form-control"
                                                name="chequeNo"
                                                onChange={this.changeHandler}
                                                placeholder={"Cheque No"}
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
                                                value={this.state.detailsTemplate.address}
                                                className="form-control"
                                                name="address"
                                                onChange={this.changeDontarTemplateHandler}
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
                                {DPPlist.length > 0 ? <div className="col-lg-6">
                                    <label className="grey-text">
                                        Package
        </label>
                                    <select className="browser-default custom-select" name="donationPackageId" required onChange={this.handlePackgeChange}>
                                        {DPPlist}
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
                <iframe style={{ height: "400px", width: "100%",display:'none' }} srcdoc={this.state.reciptDataPrint} id="receipt1" />
            </React.Fragment>
        )
    }
}


export default EntryForm
