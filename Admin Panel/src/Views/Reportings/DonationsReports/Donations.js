import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';

import * as ChannelStore from '../../../Stores/Channels-store.js';
import * as ChannelAction from '../../../Actions/Channels-action.js';

import * as DonationMethodStore from '../../../Stores/DonationMethod-store';
import * as DonationMethodAction from '../../../Actions/DonationMethods-action';

import * as RStore from '../../../Stores/Reports-store';
import * as RAction from '../../../Actions/Reports-action';



import Select from 'react-dropdown-select';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Reference Number',
        field: 'donationrefnum',
        sort: 'asc'

    },
    {
        label: 'Donor',
        field: 'name'

    },
    {
        label: 'Amount',
        field: 'amount'

    },
    {
        label: 'date',
        field: 'time'

    },
    {
        label: 'Enter by',
        field: 'user'

    },
    {
        label: 'Center',
        field: 'centername'
    }
];

class DonationsReport extends Component {
    constructor(props) {
        super(props)
        ChannelAction.fetchChannels();
        DonationMethodAction.fetchMethods();
        Action.fetchDonations()
        this.wrapper = React.createRef();
        this.state = {
            donations: Store.getDonationList(),
            channels: ChannelStore.getChannels(),
            donationMethods: DonationMethodStore.getMethods(),
            methodId:'-1',
            channelId:'-1'
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
        ChannelStore.addChangeListener(this.onChange);
        DonationMethodStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
        ChannelStore.removeChangeListener(this.onChange);
        DonationMethodStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        var channels = ChannelStore.getChannels();
        channels.push({channelId:"-1",channelname:"All"})
        var donationMethods = DonationMethodStore.getMethods();
        donationMethods.push({id:"-1",method:"All"})
        this.setState({
            donations: Store.getDonationList(),
            channels,
            donationMethods
        })
    }
    onSelectorChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    generateReport=()=>{
       // alert(this.state.channelId)
        RAction.generateCustomReport();
    }

    render() {
        var tchannels=this.state.channels;
      
        var tdonationMethods=this.state.donationMethods;
    
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm mb-5">
                                <MDBCardHeader>
                                    Custom Report
                            </MDBCardHeader>
                                <MDBCardBody className="w-100">
                                    <MDBRow className="w-100 d-flex">
                                        <div className="col-lg-4">
                                            <label className="grey-text">
                                                From Date
        </label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="grey-text">
                                                To Date
        </label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="grey-text">
                                                Users
        </label>
                                            <Select options={[
  { value: "neurosciences", label: "Neurosciences - ABS 1109" },
  { value: "oncologyCarcinogenesis", label: "Oncology and Carcinogenesis  - ABS 1112" },
  { value: "opticalPhysics", label: "Optical Physics  - ABS 0205" },
  { value: "fisheriesSciences", label: "Fisheries Sciences - ABS 0704" },
  { value: "genetics", label: "Genetics - ABS 0604" },
  { value: "urbanRegionalPlanning", label: "Urban and Regional Planning - ABS 1205" }
]}  />
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="grey-text">
                                                Channel
        </label>
                                            <select className="browser-default custom-select" name="channelId" required onChange={this.onSelectorChange}>
                                            {tchannels ? [...tchannels].map((eachChannel) => {
                                                        return <option value={eachChannel.channelId} >{eachChannel.channelname}</option>
                                                    }) : <React.Fragment />}
                                            </select>
                                        </div>
                                        <div className="col-lg-4">
                                            <label className="grey-text">
                                                Method
        </label>
                                            <select className="browser-default custom-select" name="methodId" required onChange={this.onSelectorChange}>
                                            {tdonationMethods ? [...tdonationMethods].map((eachMethod) => {
                                                        return <option value={eachMethod.id} >{eachMethod.method}</option>
                                                    }) : <React.Fragment />}
                                            </select>
                                        </div>

                                      
                                        <div className="col-lg-4 pt-4">
                                        <MDBBtn color="primary" className="shadow-none mb-0 px-4 py-2 "  onClick={this.generateReport} > Generate</MDBBtn>
                                        </div>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                          
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>

            </React.Fragment>
        );
    }

}
export default DonationsReport;