import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Collection-store';
import * as Action from '../../../Actions/Collection-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Name',
        field: 'Name'

    },
    {
        label: 'Phone',
        field: 'Phone'

    },
    {
        label: 'Amount in hand',
        field: 'AMOUNTINHAND'

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


class Collections extends Component {
    constructor(props) {
        super(props)
        Action.fetchCollection("0")
        this.wrapper = React.createRef();
        this.state = {
            collections: Store.getCollection(),
            amtColModal: false,
            paymentType: '0',
            settlementModal: false,
            modalRecipt:false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    openCollectAmount = (userId, amount, name) => {

        this.setState({
            amountForCollection: amount,
            amountForCollectionValue: amount,
            collectFromUser: userId,
            collectFromUserName: name
        })
        this.toggleCollectionModel()
    }
    openCollectChequeAmount = (userId, amount, name) => {

        this.setState({
            amountForCollection: amount,
            amountForCollectionValue: amount,
            collectFromUser: userId,
            collectFromUserName: name
        })
        this.toggleSettlementModal()
    }
    paymentTypeChangeHandler = (e) => {
        this.setState({
            paymentType: e.target.value
        })
        Action.fetchCollection(e.target.value)
    }
    submitAmount = () => {
        Action.collectAmount({ amount: this.state.amountForCollection, userId: this.state.collectFromUser, mode: "1" }, this.toggleCollectionModel,this.processRecipt)
    }
    printRecipt = () => {
        // this.switchAgentCopy()
         const iframe = document.getElementById("receipt");
        // iframe.style.display="block";
         const iframeWindow = iframe.contentWindow || iframe;
         iframe.focus();
         iframeWindow.print();
     }
     submitChequeAmount = () => {
        if (this.state.amountForCollection && this.state.chequeno) {

            var files = document.getElementById("formsettleimg").files;

            let img = "";
            if (files && files.length > 0) {
                var imgFile = files[0]
                // Make new FileReader
                let reader = new FileReader();

                // Convert the file to base64 text
                reader.readAsDataURL(imgFile);

                // on reader load somthing...
                reader.onload = () => {
                    img = reader.result;
                    // resolve(img);
                    Action.collectAmount({
                        amount: this.state.amountForCollection,
                        chequeNo: this.state.chequeno,
                        userId: this.state.collectFromUser,
                        mode: "2",
                        img: img,
                        imgName: imgFile.name
                    }, this.toggleSettlementModal)
                };
            }
            else{
                Action.collectAmount({
                    amount: this.state.amountForCollection,
                    chequeNo: this.state.chequeno,
                    userId: this.state.collectFromUser,
                    mode: "2",
                    img: "",
                    imgName: ""
                }, this.toggleSettlementModal,this.processRecipt)
            }

        }
    }
    processRecipt = (details) => {


        var reciptData = `
        <html>
        <body >
        <div style='text-align:center;width:100%'>
            <img src='https://www.alkhidmat.com/wp-content/uploads/2020/04/Logo.jpg' style="width:50px; height:60px"/>
            <h5>`+ details.centerName + ", " + details.city +
            `</h5>
            <hr>Collection Receipt
            <hr>
        </div>                           
        <div style='text-align:left;width:100%'>
        <table  style='font-size:10px;width:100%'>
    
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
        Reciever Name:
        </td>
        <td>
        `
            +
            details.recieverName
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
        </tr>
        <tr>
        <td>
        Amount Submitted:
        </td>
        <td>
        `
            +
            details.submitAmount
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Amount Remaining:
        </td>
        <td>
        `
            +
            details.remainingAmount
            +
            `
        </td>
        </tr>
        <tr>
        <td>
        Payment mode:
        </td>
        <td>
        `
            +
            ((details.mode=='1')?"Cash":"Cheque")
            +
            `
        </td>
        </tr>
        </table>
        
        </div>
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
    toggleReciptModal = () => {
        // this._updateIframe();

        this.setState({
            modalRecipt: !this.state.modalRecipt
        })
    }

    onChange = () => {
        var col = Store.getCollection();

        if (this.state.paymentType == "1") {
            col.forEach((val) => {
                val.action = <Link onClick={this.openCollectAmount.bind(this, val.userid, val.AMOUNTINHAND, val.Name)} style={{ color: "green" }}>Collect</Link>
            });
        }
        else if (this.state.paymentType == "2") {
            col.forEach((val) => {
                val.action = <Link onClick={this.openCollectChequeAmount.bind(this, val.userid, val.AMOUNTINHAND, val.Name)} style={{ color: "green" }}>Collect</Link>
            });
        }
        this.setState({
            collections: col
        })
    }
    toggleCollectionModel = () => {
        this.setState({
            amtColModal: !this.state.amtColModal
        })
    }
    toggleSettlementModal = () => {
        if (!this.state.settlementModal) {
            this.setState({
                settlementModal: !this.state.settlementModal
            })
        }
        else {
            this.setState({
                settlementModal: !this.state.settlementModal,
                amount: '',
                chequeno: '',
                remarks: ''
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {

        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Collections
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <div className="ml-auto col-12 col-lg-4 pr-0">
                                        <label className="grey-text">
                                            Payment Method <span className="required-ast"></span>
                                        </label>
                                        <select className="browser-default custom-select" name="method" id="filterPaymentMethod" required onChange={this.paymentTypeChangeHandler} value={this.state.paymentType}>
                                            <option value="0">All</option>
                                            <option value="1">Cash</option>
                                            <option value="2">Cheque</option>
                                        </select>
                                    </div>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.collections }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal isOpen={this.state.amtColModal} toggle={this.toggleCollectionModel}>
                        <MDBModalHeader toggle={this.toggleCollectionModel}>Settle amount</MDBModalHeader>
                        <MDBModalBody>
                            <form ref={this.wrapper} className="text-left">
                                <label htmlFor="amountCollectionName" className="grey-text">
                                    Name
        </label>
                                <input type="text" id="amountCollectionName" className="form-control" value={this.state.collectFromUserName} required disabled />
                                <br />
                                <label htmlFor="amountCollectionValue" className="grey-text">
                                    Amount in hand
        </label>
                                <input type="text" id="amountCollectionValue" className="form-control" value={this.state.amountForCollectionValue} required disabled />
                                <br />
                                <label htmlFor="amountForCollection" className="grey-text">
                                    Amount collected
        </label>
                                <input type="text" name="amountForCollection" id="amountForCollection" className="form-control" value={this.state.amountForCollection} onChange={this.handleChange} required />
                                <br />

                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleCollectionModel}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.submitAmount}>Collect</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.settlementModal} toggle={this.toggleSettlementModal}>
                        <MDBModalHeader toggle={this.toggleSettlementModal}>Settlement amount</MDBModalHeader>
                        <form className="text-left" id="createSettlementForm" onSubmit={(e) => {
                            e.preventDefault()
                        }}>
                            <MDBModalBody>

                                <label className="grey-text">
                                    Cheque No
        </label>
                                <input type="text" id="formchequeno" name="chequeno" className="form-control" required value={this.state.chequeno} onChange={this.handleChange} />
                                <br />
                                <label className="grey-text">
                                    Amount
        </label>
                                <input type="text" id="formamount" name="amountForCollection" className="form-control" required value={this.state.amountForCollection} onChange={this.handleChange} />
                                <br />
                               <label className="grey-text">
                                    Image
        </label>
                                <br />
                                <input type="file" id="formsettleimg" name="file" className="" />
                    <br />


                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleSettlementModal}>Close</MDBBtn>
                                <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.submitChequeAmount} type="submit">Send</MDBBtn>
                            </MDBModalFooter>
                        </form>
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
                </MDBContainer>

            </React.Fragment>
        );
    }

}
export default Collections;