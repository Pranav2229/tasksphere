import React, { useState } from 'react'
import { Header } from '../HeaderCommon/Header'
import { Sidebar } from '../Sidebar/Sidebar'
import axios from "axios";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import Footer from '../LoginPages/Footer/Footer';

export function Createtask(props) {
    const [token] = useState(sessionStorage.getItem('Token'))
    const [description, setdescription] = useState('')
    const [Duedate, setDuedate] = useState('')
    const [status, setstatus] = useState('Pending')
    const [priority, setpriority] = useState('')
    const [Category, setCategory] = useState('')

    const InsertTask = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/createtask`, {
                "userid": sessionStorage.getItem('userid'),
                "taskdescription": description,
                "duedate": Duedate,
                "status": status,
                "priority": priority,
                "Category": Category
            },
                {
                    headers: {
                        'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                    },
                })
            if (response.data == 'Task Created successfully' && response.status == 200) {
                alert("Succesfully created task")
                setdescription('')
                setDuedate('')
                setstatus('')
                setpriority('')
                setCategory('')
            } else {
                alert("Not created")
            }

        } catch (error) {
            console.log("error", error);

        }
    }

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <Container className='pb-5 pt-5 pt-lg-8 align-items-center ' fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Create task</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                onClick={InsertTask}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Task information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>

                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Task description
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-username"
                                                            placeholder="Description"
                                                            type="text"
                                                            value={description}
                                                            onChange={(e) => setdescription(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-date"
                                                        >
                                                            Due date
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-date"
                                                            type="date"
                                                            value={Duedate}
                                                            onChange={(e) => setDuedate(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            Status
                                                        </label>

                                                        <div class="input-group">
                                                            {/* <label class="input-group-text" for="inputGroupSelect01">Options</label> */}
                                                            <select class="form-select" onChange={(e) => setstatus(e.target.value)}>
                                                                <option value="Pending" selecteds>Pending</option>
                                                                <option value="Completed">Completed</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Priority Level
                                                        </label>
                                                        <div class="input-group">
                                                            <select class="form-select" value={priority} onChange={(e) => setpriority(e.target.value)}>
                                                                <option disabled  value="">Choose Status</option>
                                                                <option value="High">High</option>
                                                                <option value="medium">medium</option>
                                                                <option value="Low">Low</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Category
                                                        </label>
                                                        <div class="input-group">
                                                            {/* <label class="input-group-text" for="inputGroupSelect01">Options</label> */}
                                                            <select class="form-select"  value={Category}  onChange={(e) => setCategory(e.target.value)}>
                                                                <option disabled value="">Choose Status</option>
                                                                <option value="Officework">Office Work</option>
                                                                <option value="Personalwork">Personal Work</option>
                                                                <option value="Studywork">Study Work</option>
                                                            </select>
                                                        </div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </>
    )
}
