import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn,MDBLink,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter,MDBDataTable, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer,MDBIcon } from 'mdbreact';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import * as Store from '../../Stores/Home-store';
import * as Action from '../../Actions/Home-action';
import { toast } from 'react-toastify';
const columns = [
    {
        label: 'Reference Number',
        field: 'donationrefnum',
 

    },
    {
        label: 'Amount',
        field: 'amount'
       
    },
    {
        label: 'date',
        field: 'time'
      
    } ,

];

const reqcolumns = [
    {
        label: 'Subject',
        field: 'title',
 

    },
    {
        label: 'Message',
        field: 'msgdata'
       
    },
    {
        label: 'date',
        field: 'time'
      
    } 

];

class Profile extends Component {
    constructor(props) {
        super(props)
        Action.myProfile();
        Action.fetchMyRequests()
        Action.fetchMyCollections(this.toggleReciptModal);
        this.state = {
            profile: Store.getProfile(),
            collections:Store.getMyCollections(),
            requests:Store.getMyRequests(),
            modalRecipt:false,
            modalPass:false,
            userReNewPass:'',
            userNewPass:'',
            userOldPass:''
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    onChange = () => {
        var col=Store.getMyCollections()
        col.forEach((val)=>{
            val.donationrefnum=<Link onClick={Action.fetchDonationDetailsByrefNum.bind(this,val.donationrefnum,this.processRecipt)} style={{color:"green"}}>{val.donationrefnum}</Link>
        })
        this.setState({
            profile: Store.getProfile(),
            collections:col,
            requests:Store.getMyRequests()
        })

    }
    changeFileHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    processRecipt = (details) => {


        var detailTable = "";

        details.donationDetails.forEach((element) => {
            detailTable += `<tr style="padding:5px">
            <td style='font-size:10px'>`
                + element.purpose +
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
            <h5>`+ details.donation.centername + ", " + details.donation.city +
            `</h5>
            <hr>Donation Receipt(Duplicate)<hr>
        </div>                           
        <div style='text-align:left;width:100%'>
        <table  style='font-size:10px;width:100%'>
        <tr >
        <td >
        Reference#:
        </td>
        <td>`
            +
            details.donation.donationrefnum
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
            details.donation.issuer
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
            details.donation.donor
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
            details.donation.time
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
            details.donation.amount
            +
            `</b>
        </td>
        </tr>
        </table>
        </div>`+
            (details.donation.comment ?
                (`<hr>
        <span style="font-size:15px"><b>Comments</b></span>
        <br/>
        `
                    +
                    details.donation.comment) : "")
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
    printRecipt = () => {
        const iframe = document.getElementById("receipt");
        const iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        iframeWindow.print();
    }
    toggleReciptModal = () => {
        // this._updateIframe();

        this.setState({
            modalRecipt: !this.state.modalRecipt
        })
    }
    togglePassModal = () => {
        // this._updateIframe();

        this.setState({
            modalPass: !this.state.modalPass
        })
    }
    changePassword=()=>{
        if(!this.state.userOldPass)
        {
            toast.error("Password not provided.")
        }else  if(!this.state.userNewPass)
        {
            toast.error("New password not provided.")
        }
        else  if(!this.state.userReNewPass)
        {
            toast.error("Re enter new password not provided.")
        }
        else  if(this.state.userReNewPass!=this.state.userNewPass)
        {
            alert()
            toast.error("New password and re-entered password are different.")
        }
        else{
            Action.changePassword({
                oldPassword:this.state.userOldPass,
                password:this.state.userNewPass
            },this.togglePassModal)
        }
    }
    render() {
        return (
            <div className="w-100 text-left py-5 px-2">
                <MDBContainer>

                    <h2>Home</h2>
                    <MDBRow>
                        <MDBCol className="my-4 col-12 col-lg-6">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                  My Profile
                            </MDBCardHeader>
                                <MDBCardBody className="home-card">
                                    <form>
                                        <label htmlFor="nameProfile" className="grey-text" >
                                            Name
        </label>
                                        <input type="text" id="nameProfile" className="form-control" disabled value={this.state.profile.name} />
                                        <br />
                                        <label htmlFor="namePhone" className="grey-text">
                                            Phone
        </label>
                                        <input type="text" id="namePhone" className="form-control" disabled value={this.state.profile.phone} />
                                        <br />
                                        <label htmlFor="namCenter" className="grey-text">
                                            Center
        </label>
                                        <input type="text" id="nameCenter" className="form-control" disabled value={this.state.profile.center} />
                                        <br />
                                        <MDBBtn color="primary" className="float-left shadow-none mb-0 mt-2 px-4 py-2" onClick={this.togglePassModal}><MDBIcon icon="lock" /> Change password</MDBBtn>
                                    </form>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol className="my-4 col-12 col-lg-6">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                   My todays Collection
                            </MDBCardHeader>
                                <MDBCardBody className="home-card">
                                <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        paging={false}
                                        searching={false}
                                        entries={false}
                                        
                                        data={{ columns: columns, rows: this.state.collections }}
                                    />

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol className="my-4 col-12 ">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    My Requests
                            </MDBCardHeader>
                                <MDBCardBody className="home-card">
                                <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        paging={false}
                                        searching={false}
                                        entries={false}
                                        
                                        data={{ columns: reqcolumns, rows: this.state.requests}}
                                    />

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>


                    </MDBRow>
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
                    <MDBModal isOpen={this.state.modalPass} toggle={this.togglePassModal} >
                        <MDBModalHeader toggle={this.togglePassModal}>Change password</MDBModalHeader>
                        <MDBModalBody className="text-left">
                        <form>
                                        <label htmlFor="userOldPass" className="grey-text" >
                                            Old Password
        </label>
                                        <input type="password" id="userOldPass" name="userOldPass" className="form-control"  value={this.state.userOldPass} onChange={this.changeFileHandler}  />
                                        <br />
                                        <label htmlFor="userNewPass" className="grey-text">
                                            New Password
        </label>
                                        <input type="password" id="userNewPass" name="userNewPass" className="form-control"  value={this.state.userNewPass} onChange={this.changeFileHandler} />
                                        <br />
                                        <label htmlFor="userReNewPass" className="grey-text">
                                           Re-enter new Password
        </label>
                                        <input type="password" id="userReNewPass" name="userReNewPass" className="form-control"  value={this.state.userReNewPass} onChange={this.changeFileHandler} />
                                        <br />
  
                                    </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.togglePassModal}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.changePassword}>Change</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }

}
export default Profile;