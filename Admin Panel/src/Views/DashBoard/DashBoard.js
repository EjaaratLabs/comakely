import React, { Component } from 'react';
import { MDBBtn,MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer } from 'mdbreact';
import { Bar,Pie,Line,Doughnut } from 'react-chartjs-2';
import * as Store from '../../Stores/Dashboard-store';
import * as Action from '../../Actions/Dashboard-action';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        Action.fetch();
        this.state = {
            domainCollectionGraphData: {
                labels: [],
                datasets: [
                    {
                        label: "Amount ",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95ad","#3e951d","#3a95cd"],
                        data: []
                    }
                ]
            },
            methodCollectionGraphData: {
                labels: [],
                datasets: [
                    {
                        label: "Amount ",
                        backgroundColor: ["#F3050F","#4DC274","#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95ad","#3e951d","#3a95cd"],
                        data: []
                    }
                ]
            }
            ,
            centerCollectionGraphData: {
                labels: [],
                datasets: [
                    {
                        label: "Amount",
                        backgroundColor: [ "#3aba9f","#c45850","#F3050F","#4DC274","#3e95cd", "#3cba2f", "#e8c3b9","#3e95ad","#3e951d","#3a95cd"],
                        data: []
                    }
                ]
            }
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    onChange = () => {
      //alert("change")
        var domainCollectionData=Store.getDomainTotalCollection()
        var methodCollectionData=Store.getMethosTotalCollection();
        var centerCollectionData=Store.getCentersTotalCollection()
        this.state.domainCollectionGraphData.labels=domainCollectionData.labels;
        this.state.domainCollectionGraphData.datasets[0].data=domainCollectionData.data;
        this.state.methodCollectionGraphData.labels=methodCollectionData.labels;
        this.state.methodCollectionGraphData.datasets[0].data=methodCollectionData.data;
        this.state.centerCollectionGraphData.labels=centerCollectionData.labels;
        this.state.centerCollectionGraphData.datasets[0].data=centerCollectionData.data;
        this.setState({
            domainCollectionGraphData:this.state.domainCollectionGraphData,
            methodCollectionGraphData:this.state.methodCollectionGraphData,
            centerCollectionGraphData:this.state.centerCollectionGraphData
        })
       
    }
    
    render() {
        return (
            <div className="w-100 text-left py-5 px-2">
                <MDBContainer>

                    <h2>Dashboard</h2>
                    <MDBRow>
                    <MDBCol size={"12"}>
                        <MDBCard className="shadow-sm">

                            <MDBCardBody>
                                <Bar
                                    
                                    type="horizontalBar"
                                    data={this.state.domainCollectionGraphData}
                                    width={100}
                                    height={400}
                                    options={{
                                        maintainAspectRatio: false,
                                        legend: { display: false },
                                        title: {
                                            display: true,
                                            text: 'Total Collection'
                                        }


                                    }}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className="my-4 col-12 col-lg-6">
                        <MDBCard className="shadow-sm">

                            <MDBCardBody>
                                <Pie

                                    data={this.state.centerCollectionGraphData}
                                    width={100}
                                    height={400}

                                    options={{
                                        maintainAspectRatio: false,
                                        legend: { display: true },
                                        title: {
                                            display: true,
                                            text: 'Collection By Centers'
                                        }


                                    }}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className="my-4 col-12 col-lg-6">
                        <MDBCard className="shadow-sm">

                            <MDBCardBody>
                                <Doughnut
                                    
                                   
                                    data={this.state.methodCollectionGraphData}
                                    width={100}
                                    height={400}

                                    options={{
                                        maintainAspectRatio: false,
                                        legend: { display: true },
                                        title: {
                                            display: true,
                                            text: 'Collection Methods'
                                        }


                                    }}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                   {/*<MDBCol className="my-4 col-12 col-lg-6">
                        <MDBCard className="shadow-sm">

                            <MDBCardBody>
                                <Line
                                    
                                    
                                    data={this.state.domainCollectionGraphData}
                                    width={100}
                                    height={400}

                                    options={{
                                        maintainAspectRatio: false,
                                        legend: { display: true },
                                        title: {
                                            display: true,
                                            text: 'Collection By Months'
                                        }


                                    }}
                                />
                            </MDBCardBody>
                        </MDBCard>
                                </MDBCol>*/}
                    
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }

}
export default Dashboard;