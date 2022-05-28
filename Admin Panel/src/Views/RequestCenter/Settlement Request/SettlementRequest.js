import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import * as Store from '../../../Stores/Request-store';
import * as Action from '../../../Actions/Request-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const reqcolumns = [
    {
        label: 'User',
        field: 'userName',
        sort: 'asc'

    },
    {
        label: 'Amount',
        field: 'amount',
        sort: 'asc'
    },
    {
        label: 'date',
        field: 'generatedon'

    },
    {
        label: 'Action',
        field: 'action'

    },
    {
        label: 'Center',
        field: 'centername'
    }

];

class SettlementRequests extends Component {
    constructor(props) {
        super(props)
        Action.fetchSettlementRequest()

        this.state = {
            requests: Store.getSettlementRequests(),
            actionModal: false
        }

    }
   
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {

        var reqs = Store.getSettlementRequests()
        reqs.forEach((val) => {
            val.action = <div><Link className="px-2" style={{ color: "green" }} onClick={this.approveAction.bind(this,val.id)}><MDBIcon icon="check" /></Link><Link className="px-2" style={{ color: "red" }} onClick={this.rejectAction.bind(this,val.id)}><MDBIcon icon="times" /></Link><Link className="px-2" style={{ color: "blue" }} onClick={this.viewAction.bind(this, val)}><MDBIcon icon="eye" /></Link></div>
        })
        this.setState({
            requests: reqs
        })

    }
    toggleActionModel = () => {
        if (!this.state.actionModal) {
            this.setState({
                actionModal: !this.state.actionModal
            })
        }
        else {
            this.setState({
                actionModal: !this.state.actionModal,
                actionremarks: ''
            })
        }
    }
    toggleActionViewModel = () => {
        if (!this.state.actionViewModal) {
            this.setState({
                actionViewModal: !this.state.actionViewModal
            })
        }
        else {
            this.setState({
                actionViewModal: !this.state.actionViewModal,
                user: '',
                name: '',
                phone: '',
                makerremarks: '',
                chequeno: '',
                amount: '',
                img: '',
            })
        }
    }
    approveAction = (id) => {
        this.setState({
            actionMethod: "approve",
            actionId: id,
            actionModal: true
        })
    }
    viewAction = (data) => {
        console.log(data)
        this.setState({
            user: data.userName,
            name: data.name,
            phone: data.Phone,
            makerremarks: data.remarks,
            chequeno: data.chequeno,
            amount: data.amount,
            img: data.img,
            actionViewModal: true
        })
    }
    rejectAction = (id) => {
        this.setState({
            actionMethod: "reject",
            actionId: id,
            actionModal: true
        })
    }
    submitAction = () => {
        var  actionMap = {
            "approve": "2",
            "reject": "3"
        }
 
        if (this.state.actionMethod) {
            Action.updateSettlementRequest({
                reqId: this.state.actionId,
                reqStatus: actionMap[this.state.actionMethod],
                remarks:this.state.actionremarks
            }, this.toggleActionModel)
        }
    }
    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
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
                                    Settlement Requests
                            </MDBCardHeader>
                                <MDBCardBody>

                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: reqcolumns, rows: this.state.requests }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal isOpen={this.state.actionModal} toggle={this.toggleActionModel}>
                        <MDBModalHeader toggle={this.toggleActionModel}>Are you sure you want to {this.state.actionMethod} ?</MDBModalHeader>
                        <MDBModalBody>
                            <form className="text-left">
                                <label className="grey-text">
                                    Remarks
        </label>
                                <textarea rows={4} id="formremarks" name="actionremarks" className="form-control" value={this.state.actionremarks} onChange={this.changeHandler} />


                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleActionModel}>No</MDBBtn>
                            <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.submitAction}>Yes </MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <MDBModal isOpen={this.state.actionViewModal} toggle={this.toggleActionViewModel}>
                        <MDBModalHeader toggle={this.toggleActionViewModel}>Details</MDBModalHeader>
                        <MDBModalBody>
                            <form className="text-left">
                                <label className="grey-text">
                                    User
                            </label>
                                <input type="text" className="form-control" required value={this.state.user} disabled />
                                <br />
                                <label className="grey-text">
                                    Name
                            </label>
                                <input type="text" className="form-control" required value={this.state.name} disabled />
                                <br />
                                <label className="grey-text">
                                    Phone
                            </label>
                                <input type="text" className="form-control" required value={this.state.phone} disabled />
                                <br />
                                <label className="grey-text">
                                    Cheque No
                            </label>
                                <input type="text" className="form-control" required value={this.state.chequeno} disabled />
                                <br />
                                <label className="grey-text">
                                    Amount
                            </label>
                                <input type="text" className="form-control" required value={this.state.amount} disabled />
                                <br />
                                <label className="grey-text">
                                    Remarks
                            </label>
                                <textarea rows={4} className="form-control" value={this.state.makerremarks} disabled />
                                <br />
                                <img src={this.state.img} width={"100%"} />
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleActionViewModel}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

            </React.Fragment>
        );
    }

}
export default SettlementRequests;