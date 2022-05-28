import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../Stores/Donations-store';
import * as Action from '../../Actions/Donations-action';
import { CSVLink } from "react-csv";
import * as CenterStore from '../../Stores/Centers-store';
import * as CenterAction from '../../Actions/Centers-action';

import * as ChannelStore from '../../Stores/Channels-store.js';
import * as ChannelAction from '../../Actions/Channels-action.js';

import * as DonationMethodStore from '../../Stores/DonationMethod-store';
import * as DonationMethodAction from '../../Actions/DonationMethods-action';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const { format } = require('number-currency-format');

const enums = {
    allCenters: "All centers",
    allChannels: "All sources",
    allDonationMethods: "All methods",
    allStage: "All stage"
}

const dateEnums = {
    startDateSelect: 0,
    endDateSelect: 1,
}

const columns = [
    {
        label: 'Donation No',
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
        label: 'Domain',
        key: 'areaname'

    },
    {
        label: 'Project',
        key: 'project'

    },
    {
        label: 'Package',
        key: 'package'

    },
    {
        label: 'Type',
        key: 'type'

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
        key: 'recieptno'

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
        Action.fetchDonationsDetailsFilter("", "", "");
        CenterAction.fetchCenters();
        ChannelAction.fetchChannels();
        DonationMethodAction.fetchMethods();
        // this.wrapper = React.createRef();
        this.state = {
            donations: Store.getDonationFilteredList(),
            centers: CenterStore.getCenters(),
            channels: ChannelStore.getChannels(),
            donationMethods: DonationMethodStore.getMethods(),
            renderChild: true,

            centerSelected: null,
            donationMethodSelected: null,
            channelSelected: null,
            donationStageSelected: null,
            startDateSelected: null,
            endDateSelected: null,
            donationStage: [{
                "id": "0",
                "name": "New"
            },
            {
                "id": "1",
                "name": "Sorted"
            },
            {
                "id": "4",
                "name": "Collected"
            }, {
                "id": "5",
                "name": "Processed"
            }, {
                "id": "6",
                "name": "Complete"
            },{
                "id": "7",
                "name": "Old data"
            },
            ]
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
        CenterStore.addChangeListener(this.onChange);
        ChannelStore.addChangeListener(this.onChange);
        DonationMethodStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        this.setState({ renderChild: false });
        Store.removeChangeListener(this.onChange);
        CenterStore.removeChangeListener(this.onChange);
        ChannelStore.removeChangeListener(this.onChange);
        DonationMethodStore.removeChangeListener(this.onChange);
        Store.resetDonations()
    }

    onChange = () => {
        var col = Store.getDonationFilteredList();
        if (this.state.renderChild) {
            col.forEach((val) => {
                val.donationrefnumlink = <Link key={val.donationrefnum} to="#!" onClick={this.openDetail.bind(this, val.donationrefnum)} style={{ color: "green" }}>{val.donationrefnum}</Link>
                val.procamount = format(val.amount, { showDecimals: "IF_NEEDED" })
                val.dontime=val.donationdate+" "+val.donationtime
            });

            this.setState({
                donations: col
            })
        }

        var centers = CenterStore.getCenters();
        var channels = ChannelStore.getChannels();
        var donationMethods = DonationMethodStore.getMethods();
        this.setState({
            centers,
            channels,
            donationMethods
        })
    }

    openDetail = (refNum) => {
        console.log(refNum, "DonationList.js: ref num");
        this.props.openDetail(refNum);
    }

    // SELECTORS [START]
    onCenterSelect = (e) => {
        this.setState({
            centerSelected: e === enums.allCenters ? null : e
        });
    }
    onDonationMethodSelect = (e) => {
        this.setState({
            donationMethodSelected: e === enums.allDonationMethods ? null : e
        });
    }
    onChannelSelect = (e) => {
        this.setState({
            channelSelected: e === enums.allChannels ? null : e
        });
    }
    onStageSelect = (e) => {
        this.setState({
            donationStageSelected: e === enums.allStage ? null : e
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
    // SELECTORS [END]

    render() {
        const { centers, channels, donationMethods, donations, donationStage, donationStageSelected,
            centerSelected, donationMethodSelected, channelSelected, startDateSelected, endDateSelected,
        } = this.state;
        // console.log(channels, donationMethods);
        // console.log(new Date(startDateSelected).getTime());

        // filtering data by values from spinner
        var filteredByCenter = centerSelected ? donations.filter((e) => e.centername === centerSelected) : donations;
        var filteredByChannel = channelSelected ? filteredByCenter.filter((e) => e.source === channelSelected) : filteredByCenter;
        var filteredByDonationMethod = donationMethodSelected ? filteredByChannel.filter((e) => e.methodid === donationMethodSelected) : filteredByChannel;
        var filteredByDonationStage = donationStageSelected ? filteredByDonationMethod.filter((e) => e.process_status === donationStageSelected) : filteredByDonationMethod;
        var filteredByGreaterThanEqualToStartDate = startDateSelected ? filteredByDonationStage.filter((e) => new Date(e.time).getTime() >= new Date(startDateSelected).getTime()) : filteredByDonationStage;
        var filteredByLessThanEqualToEndDate = endDateSelected ? filteredByGreaterThanEqualToStartDate.filter((e) => (new Date(e.time)).getTime() <= new Date(endDateSelected).getTime() + 86400000) : filteredByGreaterThanEqualToStartDate;
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
                                    Export Donation(Detailed)
                                    </div>
                                    <div className='text-right pull-right'>

                                    <Link   to={"#"}  className='mx-2' onClick={()=>{
                                             Action.fetchDonationsDetailsFilter("", "", "");
                                         }}>  <span style={{ color: "red" }} >Refresh <MDBIcon icon="sync"  /></span></Link>



                                            <CSVLink data={filteredByLessThanEqualToEndDate} headers={headers} filename={"alldonationexport.csv"}>
                                            <span style={{color:"green"}} > Export <MDBIcon icon="file-export" /></span>
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

                                        <MDBDropdown size="sm">
                                            <MDBDropdownToggle caret color="link">
                                                <span style={{ textTransform: "none" }}>{centerSelected ? `Center: ${centerSelected}` : enums.allCenters}</span>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu color="link" basic>
                                                <MDBDropdownItem onClick={() => { this.onCenterSelect(enums.allCenters) }}>{enums.allCenters}</MDBDropdownItem>
                                                {centers ? [...centers].map((eachCenter) => {
                                                    return <MDBDropdownItem onClick={() => { this.onCenterSelect(eachCenter.name) }}>{eachCenter.name}</MDBDropdownItem>
                                                }) : <React.Fragment />}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>

                                        <MDBDropdown size="sm">
                                            <MDBDropdownToggle caret color="link">
                                                <span style={{ textTransform: "none" }}>{donationMethodSelected ? `Method: ${Object.values(donationMethods).filter((eachMethod) => eachMethod.id === donationMethodSelected)[0].method}` : enums.allDonationMethods}</span>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu color="link" basic>
                                                <MDBDropdownItem onClick={() => { this.onDonationMethodSelect(enums.allDonationMethods) }}>{enums.allDonationMethods}</MDBDropdownItem>
                                                {donationMethods ? [...donationMethods].map((eachMethod) => {
                                                    return <MDBDropdownItem onClick={() => { this.onDonationMethodSelect(eachMethod.id) }}>{eachMethod.method}</MDBDropdownItem>
                                                }) : <React.Fragment />}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        <MDBDropdown size="sm">
                                            <MDBDropdownToggle caret color="link">
                                                <span style={{ textTransform: "none" }}>{donationStageSelected ? `Method: ${Object.values(donationStage).filter((eachMethod) => eachMethod.id === donationStageSelected)[0].name}` : enums.allStage}</span>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu color="link" basic>
                                                <MDBDropdownItem onClick={() => { this.onStageSelect(enums.allStage) }}>{enums.allStage}</MDBDropdownItem>
                                                {donationStage ? [...donationStage].map((eachMethod) => {
                                                    return <MDBDropdownItem onClick={() => { this.onStageSelect(eachMethod.id) }}>{eachMethod.name}</MDBDropdownItem>
                                                }) : <React.Fragment />}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </div>

                                    <hr />
                                    <div className='w-100 '>
                                        <div className="pb-2 text-left d-flex">
                                            <h5 className='mx-2'>Total Transactions: {donations.length} |</h5>
                                            <h5 className='mx-2'>Filtered Transactions: {filteredByLessThanEqualToEndDate.length} |</h5>
                                            <h5 className='mx-2'>Amount: Rs {format(total, { showDecimals: "IF_NEEDED" })}</h5>

                                        </div>

                                        <br />
                                       
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

            </React.Fragment >
        );
    }

}
export default DonationsList;