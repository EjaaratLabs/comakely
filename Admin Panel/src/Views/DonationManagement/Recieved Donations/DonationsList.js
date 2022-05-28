import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';
import { CSVLink } from "react-csv";
import * as CenterStore from '../../../Stores/Centers-store';
import * as CenterAction from '../../../Actions/Centers-action';

import * as ChannelStore from '../../../Stores/Channels-store.js';
import * as ChannelAction from '../../../Actions/Channels-action.js';

import * as DonationMethodStore from '../../../Stores/DonationMethod-store';
import * as DonationMethodAction from '../../../Actions/DonationMethods-action';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const { format } = require('number-currency-format');
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
        label: 'Amount',
        field: 'procamount'

    },
    {
        label: 'Date',
        field: 'dontime'

    },
    {
        label: 'Center',
        field: 'centername'
    },
    {
        label: 'Stage',
        field: 'processstatus'
    }
];

var headers = [
    {
        label: 'Donation No',
        key: 'donationrefnum',

    },
    {
        label: 'Donor',
        key: 'name'

    },
    {
        label: 'Phone',
        key: 'phone'

    },
    {
        label: 'Address',
        key: 'address'

    },
    {
        label: 'City',
        key: 'city'

    },
    {
        label: 'Country',
        key: 'country'

    },
    {
        label: 'Email',
        key: 'email'

    },
    {
        label: 'Amount',
        key: 'procamount'

    },
    {
        label: 'Date',
        key: 'donationdate'

    },
    {
        label: 'Time',
        key: 'donationtime'

    },
    {
        label: 'Stage',
        key: 'processstatus'
    },
    {
        label: 'Reciept No',
        key: 'verifyrecieptno'

    },
    {
        label: 'Channel',
        key: 'channelname'

    },
    {
        label: 'Method',
        key: 'donationmethod'

    },
    {
        label: 'Status',
        key: 'paymentstatus'

    },
    {
        label: 'Center',
        key: 'centername'

    },
];

class DonationsList extends Component {
    constructor(props) {
        super(props)
        Action.fetchDonationsFilter("2", "", "6");

        this.state = {
            donations: Store.getDonationFilteredList(),

            renderChild: true,

            centerSelected: null,
            donationMethodSelected: null,
            channelSelected: null,

            startDateSelected: null,
            endDateSelected: null,
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);

    }
    componentWillUnmount() {
        this.setState({ renderChild: false });
        Store.removeChangeListener(this.onChange);
        Store.resetDonations()

    }

    onChange = () => {
        var col = Store.getDonationFilteredList();
        if (this.state.renderChild) {
            col.forEach((val) => {
                val.donationrefnumlink = <Link key={val.donationrefnum} to="#!" onClick={this.openDetail.bind(this, val.donationrefnum)} style={{ color: "green" }}>{val.donationrefnum}</Link>
                val.procamount = format(val.amount_to_collect, { showDecimals: "IF_NEEDED" })
                val.dontime=val.donationdate+" "+val.donationtime
            });

            this.setState({
                donations: col
            })
        }
    }

    openDetail = (refNum) => {
        console.log(refNum, "DonationList.js: ref num");
        this.props.openDetail(refNum);
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
    // SELECTORS [END]

    render() {
        const { centers, channels, donationMethods, donations,
            centerSelected, donationMethodSelected, channelSelected, startDateSelected, endDateSelected,
        } = this.state;
        // console.log(channels, donationMethods);
        // console.log(new Date(startDateSelected).getTime());


        var filteredByGreaterThanEqualToStartDate = startDateSelected ? donations.filter((e) => new Date(e.zonetime).getTime() >= new Date(startDateSelected).getTime()) : donations;
        var filteredByLessThanEqualToEndDate = endDateSelected ? filteredByGreaterThanEqualToStartDate.filter((e) => (new Date(e.zonetime)).getTime() <= new Date(endDateSelected).getTime() + 86400000) : filteredByGreaterThanEqualToStartDate;
        // console.log(centerSelected, donationMethodSelected, channelSelected);
        var total = 0;
        filteredByLessThanEqualToEndDate.forEach((val) => {
            total += val.amount;
        });
        return (
            <React.Fragment >
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader className='d-flex justify-content-between'>
                                    <div>
                                        Done/Recieved Donations
                                    </div>
                                    <div className='text-right pull-right'>

                                    <Link   to={"#"}  className='mx-2' onClick={()=>{
                                                        Action.fetchDonationsFilter("2", "", "6");
                                         }}>  <span style={{ color: "red" }} >Refresh <MDBIcon icon="sync"  /></span></Link>



                                        <CSVLink data={filteredByLessThanEqualToEndDate} headers={headers} filename={"recvdonationexport.csv"}>
                                            <span style={{ color: "green" }} > Export <MDBIcon icon="file-export" /></span>
                                        </CSVLink>
                                    </div>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <div className="pb-2 text-right d-flex">
                                        <span className="">
                                            <label htmlFor="startDate">From date:</label>
                                            <input className="mx-3" type="date" id="startDate" name="startDate" onChange={(e) => { this.onDateRangeSelect(e, dateEnums.startDateSelect) }} />
                                        </span>
                                        <span className="">
                                            <label htmlFor="endDate">To Date:</label>
                                            <input className="mx-3" type="date" id="endDate" name="endDate" onChange={(e) => { this.onDateRangeSelect(e, dateEnums.endDateSelect) }} />
                                        </span>


                                    </div>
                                    <hr />
                                    <div className="pb-2 text-left d-flex">
                                        <h5 className='mx-2'>Total Transactions: {donations.length} |</h5>
                                        <h5 className='mx-2'>Filtered Transactions: {filteredByLessThanEqualToEndDate.length} |</h5>
                                        <h5 className='mx-2'>Amount: Rs {format(total, { showDecimals: "IF_NEEDED" })}</h5>
                                    </div>
                                    <hr />

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

            </React.Fragment>
        );
    }

}
export default DonationsList;