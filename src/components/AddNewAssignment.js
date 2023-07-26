import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { SERVER_URL } from '../constants.js'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

class AddNewAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            courseId: 0,
            dueDate: ''
        };
    }

    assignmentChangeHandler = (event) => {
        this.setState({ assignmentName: event.target.value })
    }

    dueDateChangeHandler = (event) => {
        this.setState({ dueDate: event.target.value });
    }

    courseIdChangeHandler = (event) => {
        this.setState({ courseId: event.target.value });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        const token = Cookies.get('XSRF-TOKEN');

        let assignmentName = this.state.assignmentName;
        let dueDate = this.state.dueDate;
        let courseId = this.state.courseId
        let data = {
            name: assignmentName,
            dueDate: dueDate,
            courseId: courseId
        }

        fetch(`${SERVER_URL}/gradebook/addNewAssignment`,
            {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Assignment Successfully Added!", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                } else {
                    toast.error("Error, Something is wrong!", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error('Error Status = ' + res.status);
                }
            })
            .catch(err => {
                toast.error("Error!", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err);
            })
    }

    render() {
        return (
            <div className="App" align='left'>
                <div>
                    <TextField autoFocus fullWidth label="Assignment Name" name="assignmentName" onChange={this.assignmentChangeHandler} />
                    <TextField autoFocus fullWidth label="Due Date" name="dueDate" onChange={this.dueDateChangeHandler} />
                    <TextField autoFocus fullWidth label="Course Id" name="courseId" onChange={this.courseIdChangeHandler} />
                    <Button color="primary" onClick={this.mySubmitHandler}>Submit</Button>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        );
    };
}

    AddNewAssignment.propTypes = {
    AddNewAssignment: PropTypes.func.isRequired
}

export default AddNewAssignment;
