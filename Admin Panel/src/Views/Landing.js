import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../Constants/routes.js';
import sidebarBg from '../assets/bg1.jpg';
import {
    MDBBtn, MDBModalFooter, MDBModalBody, MDBModalHeader, MDBModal, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBLink, MDBContainer
} from "mdbreact";
import Users from './Configurations/Users/Users.js';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/App.scss';
import Donation from './Add Donation/Donation.js';
import DonationUcaaz from './Add Donation Ukaz/Donation.js';
import './Landing.css'
import { toast } from 'react-toastify';
import * as LoaderStore from '../Stores/Loader-store.js';

import * as Store from '../Stores/Authentication-store.js';
import * as Action from '../Actions/Authentication-action.js';
import * as RStore from '../Stores/Request-store.js';
import * as RAction from '../Actions/Request-action.js';
import Channels from './Configurations/Channels/Channels.js';
import Areas from './Configurations/Areas/Areas';
import Centers from './Configurations/Centers/Centers.js';
import Roles from './Configurations/Roles/Roles.js';
import DonationTypes from './Configurations/DonationTypes/DonationTypes.js';
import DonationMethods from './Configurations/DonationMethods/DonationMethods.js';
import DonationPurpose from './Configurations/DonationPurpose/DonationPurpose.js';
import Dashboard from './DashBoard/DashBoard.js';
//import Donations from './DonationManagement/All Donations/Donations.js';
import Requests from './RequestCenter/Requests/Requests.js';
import UserRequests from './RequestCenter/User Request/index.js'
import Reports from './Reportings/Reports/Reports.js';
import CustomReports from './Reportings/CustomReports/CustomReports.js';
import Profile from './Profile/Profile.js';
import Collections from './Funds Management/Collection/Collection.js';
import logo from '../assets/logo.png';
import SettlementRequests from './RequestCenter/Settlement Request/SettlementRequest.js';
import DonationsReport from './Reportings/DonationsReports/Donations.js';
import HomeCollections from './Funds Management/Home Collection/HomeCollection.js';

import DonationsAll from './DonationManagement/All Donations/Donations.js';
import DonationsNew from './DonationManagement/New Donations/Donations.js';
import DonationsBT from './DonationManagement/Bank Transfer Donations/Donations.js';
import DonationsCC from './DonationManagement/Credit Card Donations/Donations.js';
import DonationsHP from './DonationManagement/Home Pick Up Donations/Donations.js';
import DonationsReciept from './DonationManagement/Receipt Donations/Donations.js';
import DonationsVerifyReciept from './DonationManagement/Verify Donations/Donations.js';
import DonationsComplete from './DonationManagement/Complete Donations/Donations.js';
import DonationsRecieved from './DonationManagement/Recieved Donations/Donations.js';
import DonationsAKFP from './DonationManagement/AKFP Donations/Donations.js';
import DonationsAKFPUS from './DonationManagement/AKFPUS Donations/Donations.js';
import DonationsAKFPUK from './DonationManagement/AKFPUK Donations/Donations.js';
import DonationsMistake from './DonationManagement/Mistake Donations/Donations.js';
import DonationsLost from './DonationManagement/Lost Donations/Donations.js';
import DonationsOld from './DonationManagement/Old Data/Donations.js';

import ExportDonationDetails from './Export Donations (Detailed)/Donations.js';

import styled, { css } from "styled-components";
import LoadingOverlay from 'react-loading-overlay';
import Loader from "react-spinners/HashLoader";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
        props.disappear &&
        css`
      display: block; /* show */
    `}
`;

class Landing extends Component {
    state = {
        isOpen: false,
        toggle: false,
        requestModal: false,
        settlementModal: false,
        subject: '',
        message: '',
        remarks: '',
        amount: '',
        chequeno: '',
        img: '',
        loader: LoaderStore.getLoaderState()

    };
    constructor(props) {
        super(props);
        Action.fetchUserPermissions()
        this.state = {
            loginState: Store.getLoginState(),
            permissions: Store.getUserPermissions(),
            loader: LoaderStore.getLoaderState()
        };
    }
    changeHandler = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }
    toggleRequestModal = () => {
        if (!this.state.requestModal) {
            this.setState({
                requestModal: !this.state.requestModal
            })
        }
        else {
            this.setState({
                requestModal: !this.state.requestModal,
                message: '',
                subject: ''
            })
        }
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
    toggleCollapse = () => {

        this.setState({ isOpen: !this.state.isOpen });
    }
    removeToken = () => {
        Action.signOut()
        localStorage.removeItem('token-ak');

    }
    componentDidMount() {
        LoaderStore.addChangeListener(this.onChange);
        Store.addChangeListener(this.onChange);

        RStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        LoaderStore.removeChangeListener(this.onChange);
        Store.removeChangeListener(this.onChange);
        RStore.removeChangeListener(this.onChange);
    }
    handleToggleSidebar = () => {
        this.setState({ toggle: !this.state.toggle });
    }
    onChange = () => {

        this.setState({
            loginState: Store.getLoginState(),
            permissions: Store.getUserPermissions(),
            loader: LoaderStore.getLoaderState()
        })
    }
    sendMsg = () => {
        var data = {
            subject: this.state.subject,
            message: this.state.message
        }
        RAction.createNewRequest(data, this.toggleRequestModal)


    }
    sendSettlementRequest = () => {
        if (this.state.amount && this.state.chequeno) {

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
                    RAction.createNewSettlementRequest({
                        amount: this.state.amount,
                        chequeNo: this.state.chequeno,
                        remarks: this.state.remarks,
                        img: img,
                        imgName: imgFile.name
                    }, this.toggleSettlementModal)
                };
            }

        }
    }
    render() {


        if (!this.state.loginState) {
            return <Redirect to={ROUTES.LOGIN} />
        }
        else {
            // return <Redirect to={ROUTES.NEWDONATION} />
        }
        return (
            <div className="d-flex" style={{ height: "100%" }}>
                <Router>
                    <ProSidebar
                        //     image={sidebarBg }
                        //   rtl={rtl}
                        collapsed={this.state.isOpen}
                        toggled={this.state.toggle}
                        breakPoint="md"
                        onToggle={this.handleToggleSidebar}
                    >
                        <SidebarHeader>
                            <div
                                className={!this.state.isOpen ? "text-left pl-3" : "text-center"}
                                style={{

                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    letterSpacing: '1px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                 <img src={logo} height="50px"/> 
                               
                            </div>
                        </SidebarHeader>

                        <SidebarContent>
                            <Menu >
                                <MenuItem
                                    icon={<MDBIcon icon="home" />}
                                >
                                    <Link to={ROUTES.PROFILE}> Home</Link>
                                </MenuItem>
                            </Menu>
                     
                            {this.state.permissions.includes("adddonation") ? <Menu >
                                <MenuItem
                                    icon={<MDBIcon icon="plus-circle" />}
                                >
                                    <Link to={ROUTES.NEWDONATION}> Add Donation</Link>
                                </MenuItem>
                            </Menu> : ""}
                            {this.state.permissions.includes("adddonationucaaz") ? <Menu >
                                <MenuItem
                                    icon={<MDBIcon icon="plus-circle" />}
                                >
                                    <Link to={ROUTES.NEWDONATIONUKAAZ}> Add Donation(UCAAZ)</Link>
                                </MenuItem>
                            </Menu> : ""}
                            {this.state.permissions.includes("pipeline") ? <Menu >
                                <SubMenu
                                    icon={<MDBIcon fab icon="buffer" />}
                                    title="Donation Pipelines"
                                >
                                    {this.state.permissions.includes("pipeline.alldonations") ? <MenuItem><Link to={ROUTES.DONATION_LINE_ALL}> All Donation</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.newdonations") ? <MenuItem><Link to={ROUTES.DONATION_LINE_NEW}> New Donation</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.creditcard") ? <MenuItem><Link to={ROUTES.DONATION_LINE_CREDIT_CARD}>Credit Card</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.banktransfer") ? <MenuItem><Link to={ROUTES.DONATION_LINE_BANK_TRANSFER}>Bank Transfer</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.homepick") ? <MenuItem><Link to={ROUTES.DONATION_LINE_HOME_PICK_UP}>Home Pick Up</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.reciept") ? <MenuItem><Link to={ROUTES.DONATION_LINE_RECIEPT}>Collected (Send Receipt)</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.verify") ? <MenuItem><Link to={ROUTES.DONATION_LINE_VERIFY}> Processed (To verify)</Link></MenuItem> : ""}

                                    {this.state.permissions.includes("pipeline.completetransaction") ? <MenuItem><Link to={ROUTES.DONATION_LINE_COMP_TRAN}>Complete(Verified)</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.done") ? <MenuItem><Link to={ROUTES.DONATION_LINE_DONE}>Done/Recieved</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.akfp") ? <MenuItem><Link to={ROUTES.DONATION_LINE_AKFP}>AKFP</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.akfpus") ? <MenuItem><Link to={ROUTES.DONATION_LINE_AKFPUS}>AKF-US</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.akfpuk") ? <MenuItem><Link to={ROUTES.DONATION_LINE_AKFPUK}>AKF-UK</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.duplicate") ? <MenuItem><Link to={ROUTES.DONATION_LINE_DUPLICATE}>Duplicate/Mistake</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.lost") ? <MenuItem><Link to={ROUTES.DONATION_LINE_LOST}>Lost</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("pipeline.olddata") ? <MenuItem><Link to={ROUTES.DONATION_LINE_OLD_DATA}>Old Data</Link></MenuItem> : ""}

                                </SubMenu>
                            </Menu> : ""}
                            {this.state.permissions.includes("reports") ? <Menu >
                                <SubMenu
                                    icon={<MDBIcon icon="chart-pie" />}
                                    title="Reporting"
                                >
                                    <MenuItem><Link to={ROUTES.REPORTS_FIXED}> Reports</Link></MenuItem>
                                    <MenuItem><Link to={ROUTES.REPORTS_DONATION}> Donation Reports</Link></MenuItem>
                                </SubMenu>
                            </Menu> : ""}
                            {this.state.permissions.includes("requestcenter") ? <Menu >
                                <SubMenu
                                    icon={<MDBIcon icon="envelope-square" />}
                                    title="Request Center"
                                >
                                    {this.state.permissions.includes("requestcenter.requests") ? <MenuItem

                                    >
                                        <Link to={ROUTES.REQUESTS}>Message Requests</Link>
                                    </MenuItem> : ""}
                                    {this.state.permissions.includes("requestcenter.settlementrequests") ? <MenuItem

                                    >
                                        <Link to={ROUTES.SETTLEMENT_REQUESTS}>Settlement Requests</Link>
                                    </MenuItem> : ""}

                                    <MenuItem

                                    >
                                        <Link to={ROUTES.USER_REQUEST}>User Requests</Link>
                                    </MenuItem>
                                </SubMenu>
                            </Menu> : ""}
                            {this.state.permissions.includes("conf") ? <Menu >
                                <SubMenu
                                    icon={<MDBIcon icon="cogs" />}
                                    title="Configuration"

                                >
                                    {this.state.permissions.includes("conf.Users") ? <MenuItem> <Link to={ROUTES.USER}> Users</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.Roles") ? <MenuItem> <Link to={ROUTES.ROLES}> Roles</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.Centers") ? <MenuItem> <Link to={ROUTES.CENTERS}> Centers</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.Channels") ? <MenuItem> <Link to={ROUTES.CHANNELS}> Channels</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.Areas") ? <MenuItem> <Link to={ROUTES.AREAS}> Domain</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.DonationType") ? <MenuItem> <Link to={ROUTES.DONATION_TYPES}> Donation Type</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.DonationMethods") ? <MenuItem> <Link to={ROUTES.DONATION_METHODS}> Donation Methods</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.DonationPurpose") ? <MenuItem> <Link to={ROUTES.DONATION_PURPOSE}> Projects</Link></MenuItem> : ""}
                                    {this.state.permissions.includes("conf.SysParams") ? <MenuItem> <Link to={ROUTES.USER}> System Parameters</Link></MenuItem> : ""}

                                </SubMenu>
                            </Menu> : ""}
                            {this.state.permissions.includes("exportdonationdetails") ? <Menu >
                                <MenuItem
                                    icon={<MDBIcon icon="file-export" />}
                                >
                                    <Link to={ROUTES.EXPORT_DONATION_DETAILS}> Export Donations(Detailed)</Link>
                                </MenuItem>
                            </Menu> : ""}

                        </SidebarContent>

                        <SidebarFooter style={{ textAlign: 'center' }}>
                            <div
                                className="sidebar-btn-wrapper"
                                style={{
                                    padding: '20px 24px',
                                }}
                            >
                                {!this.state.isOpen ? "Powered by  " : ""}
                                <a
                                    href="https://ejaarat.com"
                                    target="_blank"
                                    className="sidebar-btn px-0 mx-0"
                                    rel="noopener noreferrer"
                                    style={{ color: "white" }}
                                >

                                    <span> Ejaarat</span>
                                </a>
                            </div>
                        </SidebarFooter>
                    </ProSidebar>

                    <div className="flex-grow-1">
                        <MDBNavbar className="p-3 w-100" dark expand={true} style={{ backgroundColor: "#FFFFFF" }} >

                            <MDBNavbarToggler />
                            <MDBCollapse id="navbarCollapse3" navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem>
                                        <MDBLink onClick={this.toggleCollapse} to="#" className="d-none d-lg-block"><MDBIcon icon="align-left" className="icon-black " /></MDBLink>
                                        <MDBLink onClick={this.handleToggleSidebar} to="#" className="d-block d-lg-none"><MDBIcon icon="align-left" className="icon-black" /></MDBLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    <MDBNavItem className="py-2 mx-2">
                                        <Link className="text-black " to="#" onClick={this.toggleSettlementModal}> <MDBIcon icon="book" />  New Settlement Request</Link>
                                    </MDBNavItem>
                                    <MDBNavItem className="py-2 mx-2">
                                        <Link className="text-black " to="#" onClick={this.toggleRequestModal}> <MDBIcon far icon="envelope-open" />  New Message Request</Link>
                                    </MDBNavItem>
                                    <MDBNavItem className="py-2 mx-2">

                                        <Link className="text-black " to="#" onClick={this.removeToken}>
                                            <MDBIcon icon="power-off" />
                                            Logout
                                        </Link>

                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                        <MDBContainer fluid className="main-container">
                            <Route exact strict path={ROUTES.PROFILE}>
                                <Profile />
                            </Route>
                      
                            <Route path={ROUTES.USER}>
                                <Users />
                            </Route>
                            <Route path={ROUTES.CHANNELS}>
                                <Channels />
                            </Route>
                            <Route path={ROUTES.NEWDONATION}>
                                <Donation />
                            </Route>

                            <Route path={ROUTES.DONATION_LINE_ALL}>
                                <DonationsAll />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_NEW}>
                                <DonationsNew />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_CREDIT_CARD}>
                                <DonationsCC />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_BANK_TRANSFER}>
                                <DonationsBT />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_HOME_PICK_UP}>
                                <DonationsHP />
                            </Route>

                            <Route path={ROUTES.DONATION_LINE_VERIFY}>
                                <DonationsVerifyReciept />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_RECIEPT}>
                                <DonationsReciept />
                            </Route>
                            <Route path={ROUTES.USER_REQUEST}>
                                <UserRequests />
                            </Route>


                            <Route path={ROUTES.DONATION_LINE_COMP_TRAN}>
                                <DonationsComplete />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_DONE}>
                                <DonationsRecieved />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_DUPLICATE}>
                                <DonationsMistake />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_AKFP}>
                                <DonationsAKFP />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_AKFPUS}>
                                <DonationsAKFPUS />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_AKFPUK}>
                                <DonationsAKFPUK />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_LOST}>
                                <DonationsLost />
                            </Route>
                            <Route path={ROUTES.DONATION_LINE_OLD_DATA}>
                                <DonationsOld />
                            </Route>

                            <Route path={ROUTES.EXPORT_DONATION_DETAILS}>
                                <ExportDonationDetails />
                            </Route>
                            <Route path={ROUTES.NEWDONATIONUKAAZ}>
                                <DonationUcaaz />
                            </Route>

                            <Route path={ROUTES.CENTERS}>
                                <Centers />
                            </Route>
                            {this.state.permissions.includes("conf.Roles") ? <Route path={ROUTES.ROLES}>
                                <Roles />
                            </Route> : ""}
                            {this.state.permissions.includes("conf.DonationType") ? <Route path={ROUTES.DONATION_TYPES}>
                                <DonationTypes />
                            </Route> : ""}
                            {this.state.permissions.includes("conf.DonationMethods") ? <Route path={ROUTES.DONATION_METHODS}>
                                <DonationMethods />
                            </Route> : ""}
                            {this.state.permissions.includes("conf.DonationPurpose") ? <Route path={ROUTES.DONATION_PURPOSE}>
                                <DonationPurpose />
                            </Route> : ""}

                            {this.state.permissions.includes("requestcenter") ? <Route path={ROUTES.REQUESTS}>
                                <Requests />
                            </Route> : ""}

                            <Route path={ROUTES.REPORTS_CUSTOM}>
                                <CustomReports />
                            </Route>
                            <Route path={ROUTES.REPORTS_DONATION}>
                                <DonationsReport />
                            </Route>
                            <Route path={ROUTES.REPORTS_FIXED}>
                                <Reports />
                            </Route>
                            <Route path={ROUTES.SETTLEMENT_REQUESTS}>
                                <SettlementRequests />
                            </Route>
                            <Route path={ROUTES.USER_LEGER}>
                                <Collections />
                            </Route>
                            <Route path={ROUTES.DONATION_HOME_COLLECTION}>
                                <HomeCollections />
                            </Route>

                        </MDBContainer>
                    </div>
                </Router>
                <MDBModal isOpen={this.state.requestModal} toggle={this.toggleRequestModal}>
                    <MDBModalHeader toggle={this.toggleRequestModal}>New Request</MDBModalHeader>
                    <form className="text-left" id="createCenterForm" onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <MDBModalBody>

                            <label className="grey-text">
                                Subject
                            </label>
                            <input type="text" id="formsubject" name="subject" className="form-control" required value={this.state.subject} onChange={this.changeHandler} />
                            <br />
                            <label className="grey-text">
                                Message
                            </label>
                            <textarea rows={4} id="formmessage" name="message" className="form-control" required value={this.state.message} onChange={this.changeHandler} />


                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleRequestModal}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.sendMsg} type="submit">Send</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBModal isOpen={this.state.settlementModal} toggle={this.toggleSettlementModal}>
                    <MDBModalHeader toggle={this.toggleSettlementModal}>New Settlement Request</MDBModalHeader>
                    <form className="text-left" id="createSettlementForm" onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <MDBModalBody>

                            <label className="grey-text">
                                Cheque No
                            </label>
                            <input type="text" id="formchequeno" name="chequeno" className="form-control" required value={this.state.chequeno} onChange={this.changeHandler} />
                            <br />
                            <label className="grey-text">
                                Amount
                            </label>
                            <input type="text" id="formamount" name="amount" className="form-control" required value={this.state.amount} onChange={this.changeHandler} />
                            <br />
                            <label className="grey-text">
                                Image
                            </label>
                            <br />
                            <input type="file" id="formsettleimg" name="file" className="" />
                            <br />
                            <br />
                            <label className="grey-text">
                                Remarks
                            </label>
                            <textarea rows={4} id="formremarks" name="remarks" className="form-control" value={this.state.remarks} onChange={this.changeHandler} />


                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleRequestModal}>Close</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.sendSettlementRequest} type="submit">Send</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
                <DarkBackground disappear={this.state.loader}>
                    <LoadingOverlay
                        active={this.state.loader}
                        spinner={<Loader color={"#0F61AA"} />}

                    >

                    </LoadingOverlay>
                </DarkBackground>
            </div>
        );
    }

}
export default Landing;