import { MDBContainer, MDBNavbarNav, MDBNavItem, MDBLink, MDBRow, MDBNavbar, MDBNavbarBrand, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import * as Action from '../Actions/Authentication-action.js';
import * as CAction from '../Actions/Common-action.js';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import logo from '../assets/logo.png';
import * as ROUTES from '../Constants/routes.js';
import Axios from 'axios';
import { toast } from 'react-toastify';
import * as Store from '../Stores/Authentication-store.js';
import * as CStore from '../Stores/Common-store.js';
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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            authToken: null,
            loginState: Store.getLoginState(),
            loader: Store.getLoaderState()
        };
    }
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    componentDidMount() {
        Store.addChangeListener(this.onChange);
        CStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
        CStore.removeChangeListener(this.onChange);
    }
    onChange = () => {
        this.setState({
            loginState: Store.getLoginState(),
            landingPage: Store.getLandingPage(),
            loader: Store.getLoaderState()
        })
    }
    loginUsers = () => {
        CAction.toggleLoader();
        Action.signIn(this.state.userName, this.state.password);
      
        //CAction.toggleLoader();
       
    }

    render() {
       // alert(this.state.loader)
       //alert(this.state.landingPage)
        if (this.state.loginState) {
            return <Redirect to={this.state.landingPage?this.state.landingPage:ROUTES.HOME_LANDING} />
        }
        return (<div style={{ height: "100%" }} className="w-100">
            <MDBNavbar dark expand={false} style={{ backgroundColor: "#0067B1" }}>
                <MDBNavbarBrand>
                    <img src={logo} height="30px"/>
                Admin Panel
                </MDBNavbarBrand>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBLink to="#">Contact Support</MDBLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBNavbar>
            <MDBContainer>
                <MDBRow className="d-flex">


                    <MDBCol xs="12" md="8" lg="5" className="mx-auto text-left my-5" >
                        <MDBCard className="shadow">
                            <MDBCardHeader>
                                Sign In
                                </MDBCardHeader>
                            <MDBCardBody>
                                <form>

                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Username
        </label>
                                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" onChange={e => {
                                        console.log(e.target.value);
                                        this.setState({
                                            userName: e.target.value
                                        })
                                    }} />
                                    <br />
                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                        Password
        </label>
                                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control" onChange={e => {

                                        this.setState({
                                            password: e.target.value
                                        })
                                    }} />
                                    <div className="text-center mt-4">
                                        <MDBBtn color="success" className="py-2 my-0" onClick={this.loginUsers}>Login</MDBBtn>
                                    </div>
                                </form>

                            </MDBCardBody>
                        </MDBCard>
                        <div style={{ textAlign: 'center' }} className="my-2">
                        Comakely ©2022 Powered by
            <a href="http://ejaarat.com/"> Ejaarat</a>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <DarkBackground disappear={this.state.loader}>
                <LoadingOverlay
                    active={this.state.loader}
                    spinner={<Loader color={"#0F61AA"}/>}
                  
                >

                </LoadingOverlay>
            </DarkBackground>
        </div>
        );
    }

}
export default Login;