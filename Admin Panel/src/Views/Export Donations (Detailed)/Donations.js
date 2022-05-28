import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../Stores/Donations-store';
import * as Action from '../../Actions/Donations-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
import DonationsList from './DonationsList';
import DonationsForm from './DonationsForm';

class Donations extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            showList: true,
            refNum: null,
        }
    }

    isShowList = (showList) => {
        this.setState({
            showList,
            refNum: null,
        })
    }

    openDetail = (refNum) => {
        Action.fetchDonationByRefNum(refNum);
        this.setState({
            showList: false,
            refNum
        })
    }
    
    render() {
        const {showList, refNum} = this.state;
        const showRelevantComponent = showList ? <DonationsList isShowList={this.isShowList} openDetail={this.openDetail}/> : <DonationsForm isShowList={this.isShowList} refNum={refNum}/>;

        return (
            <React.Fragment>
                <div className="w-100">
                    {showRelevantComponent}
                </div>

            </React.Fragment>
        );
    }

}
export default Donations;