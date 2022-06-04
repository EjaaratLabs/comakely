import React, { Component } from 'react';

import { MDBDataTable } from 'mdbreact';
import * as Store from '../../Stores/Blog-store';
import * as Action from '../../Actions/Blog-action';

import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBCardHeader } from 'mdbreact';
import { toast, ToastContainer } from 'react-toastify';
const columns = [
    {
        label: 'Id',
        field: 'id',
        sort: 'asc'

    },
    {
        label: 'Title',
        field: 'title',
        sort: 'asc'
    },
    {
        label: 'Brief',
        field: 'brief',
        sort: 'asc'
    },
    {
        label: 'Created on',
        field: 'createdon',
        sort: 'asc'
    },
    {
        label: 'Created by',
        field: 'createdby',
        sort: 'asc'
    }
];

class Centers extends Component {
    constructor(props) {
        super(props)
        Action.fetchBlogs()
        
        this.state = {
            blogs: Store.getBlogs(),
            blogModal: false
        }

    }
    componentDidMount() {
        Store.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }
    toggleBlogModal = () => {
        this.setState({
            blogModal: !this.state.blogModal
        })
    }
    onChange = () => {

        this.setState({
            blogs: Store.getBlogs()
        })
    }
    createNewBlog = () => {
        var data = document.getElementById("createBlogForm");
   
        if (data) {
            Action.createNewBlogs({
                "title": data.elements["title"].value,
                "description":data.elements["description"].value,
                "brief":data.elements["brief"].value
            }, this.toggleBlogModal)
        }
    }
    render() {
        return (
            <React.Fragment>
                <MDBContainer className="py-2 mt-4">
                    <MDBRow>

                        <MDBCol size="12" className="mx-auto text-left">
                            <MDBCard className="shadow-sm">
                                <MDBCardHeader>
                                    Blogs
                            </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBBtn color="primary" className="float-right shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleBlogModal}><MDBIcon icon="plus" /> Add</MDBBtn>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={{ columns: columns, rows: this.state.blogs }}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
                <MDBModal isOpen={this.state.blogModal} toggle={this.toggleBlogModal} size="lg">
                    <MDBModalHeader toggle={this.toggleBlogModal}>New Blog</MDBModalHeader>
                    <MDBModalBody>
                        <form  className="text-left" id="createBlogForm">
                            <label  className="grey-text">
                                Title
        </label>
                            <input type="text" id="formAreaName" name="title" className="form-control" required />
                            <br/>
                            <label  className="grey-text">
                                Brief
        </label>
                            <textarea type="text" id="formCenterAddress" name="brief" className="form-control" required />
                            <br/>
                            <label   className="grey-text">
                                Post
        </label>
                            <textarea type="text" id="formCenterPhone" name="description" className="form-control" required />
                            <br/>
                           
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" className="shadow-none mb-0 mt-2 px-4 py-2" onClick={this.toggleBlogModal}>Close</MDBBtn>
                        <MDBBtn color="primary" className=" shadow-none mb-0 mt-2 px-4 py-2" onClick={this.createNewBlog}>Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </React.Fragment>
        );
    }

}
export default Centers;