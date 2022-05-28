import React, { Component } from 'react'
import { MDBContainer, MDBModalFooter, MDBModal, MDBModalHeader, MDBModalBody, MDBDataTable, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import './style.css';
import { jsPDF } from "jspdf";
import { toast, ToastContainer } from 'react-toastify';
import * as AStore from '../../../Stores/Area-store';
import * as AAction from '../../../Actions/Areas-action';
import * as DTStore from '../../../Stores/DonationType-store';
import * as DTAction from '../../../Actions/DonationTypes-action';
import * as DMStore from '../../../Stores/DonationMethod-store';
import * as DMAction from '../../../Actions/DonationMethods-action';
import * as DPStore from '../../../Stores/DonationPurpose-store';
import * as DPAction from '../../../Actions/DonationPurposes-action';
import * as Store from '../../../Stores/Donations-store';
import * as Action from '../../../Actions/Donations-action';
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
        label: 'Method',
        field: 'method',
        sort: 'asc'
    }
    ,
    {
        label: 'Amount',
        field: 'amount',
        sort: 'asc'
    }
];
class TestPdf extends Component {
    constructor(props) {
        super(props);
        AAction.fetchAreas();
        DTAction.fetchTypes();
        DMAction.fetchMethods();
        DPAction.fetchPurposes();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            title: '',
            amount: '',
            cnic:'',
            address:'',
            modalAddDonation: false,
            areas: AStore.getAreas(),
            donationTypes: DTStore.getTypes(),
            donationMethods: DMStore.getMethods(),
            donationPurpose: DPStore.getList(),
            purposeId:'',
            purposeName:'',
            subDonations: []
        }

    }
    componentDidMount() {
        AStore.addChangeListener(this.onChange);
        DTStore.addChangeListener(this.onChange);
        DMStore.addChangeListener(this.onChange);
        DPStore.addChangeListener(this.onChange);
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        AStore.removeChangeListener(this.onChange);
        DTStore.removeChangeListener(this.onChange);
        DMStore.removeChangeListener(this.onChange);
        DPStore.removeChangeListener(this.onChange);
        Store.removeChangeListener(this.onChange);
    }
    onChange = () => {

        this.setState({
            areas: AStore.getAreas(),
            donationTypes: DTStore.getTypes(),
            donationMethods: DMStore.getMethods(),
            donationPurpose: DPStore.getList(),
        })
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
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
    }
    toggleAddDonationModal = () => {
        this.setState({
            modalAddDonation: !this.state.modalAddDonation
        })
    }
    addSubDonation = () => {
        var data = document.getElementById("createDonationSubForm");

        if (data) {

            this.state.subDonations.push({
                "amount": data.elements["amount"].value,
                "areaId": data.elements["areaId"].value,
                "areaName": data.elements["areaId"].textContent,
                "donationTypeId": data.elements["donationTypeId"].value,
                "donationType": data.elements["donationTypeId"].textContent,
                "methodId": data.elements["methodId"].value,
                "method": data.elements["methodId"].textContent,
                "purposeId":this.state.purposeId,
                "purposeName":this.state.purposeName
            })
            this.setState(
                {
                    subDonations: this.state.subDonations,
                    modalAddDonation: false
                }
            )

        }
    }
   /* submitForm = async () => {

        const config = require('../../helpers/config.json');
        const doc = new jsPDF();
        doc.text("Title :" + this.state.title + "\n" + "Name: " + this.state.firstName + " " + this.state.lastName + "\n" + "Amount:" + this.state.amount, 10, 10);
        doc.save("Recipt.pdf");
        var req = this.state;
        await Axios.post(config["baseUrl"] + "/transaction/newdonation", req,
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token-ak')
                    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGllbnQiLCJpYXQiOjE2MDg1ODY4NDd9.tiFltu5Zl-fTTq98KkiUGLWt6E7eSLiw7QvH5GFuJE0"
                },
            }
        ).then((response) => {

            //toast.error(JSON.stringify(error))
            localStorage.setItem('token-ak', response.data["token"])
            console.log(response.data["token"]);
            console.log("data login");
            this.setState({
                authToken: response.data["token"]
            }) // force the re-render
        })
            .catch((error) => {
                toast.error(error.response.data.errorMessage)

            })
        /* doc.html(<div>
             Title : {this.state.title}
             <br/>
             First Name: {this.state.firstName}
             <br/>
             Last Name: {this.state.lastName}
             <br/>
             Email: {this.state.email}
             <br/>
             Phone: {this.state.phone}
             <br/>
             Amount: {this.state.amount}
         </div>);*/

      /*  this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            title: '',
            amount: '',
        });
    }*/
    submitDonation=()=>{
    
        Action.createNewDonation({
            "firstName":this.state.firstName,
            "lastName":this.state.lastName,
            "email":this.state.email,
            "phone":this.state.phone,
            "cnic":this.state.cnic,
            "address":this.state.address,
            "donationList":this.state.subDonations
        });

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            title: '',
            amount: '',
            address:'',
            subDonations:[]
        }); 
    }
    handleChange=(event) => {
      var val=event.target.value;
        var values=val.split("-")
        this.setState({ purposeId: values[0],purposeName:values[1] })
    }
    render() {
      
        return (
            <React.Fragment>
               

            </React.Fragment>
        )
    }
}


export default TestPdf 
