import React, { useEffect, useState } from 'react'
import { Header } from '../HeaderCommon/Header'
import { Sidebar } from '../Sidebar/Sidebar'
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
    Table
} from "reactstrap";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Footer from '../LoginPages/Footer/Footer';
export function Todaystask(props) {
    const [todaystaskdata, settodaystaskdat] = useState([])
    const navigate = useNavigate()
    const [token] = useState(sessionStorage.getItem('Token'))
    const [taskidvalue, settaskid] = useState('')
    const [taskdescription, settaskdescription] = useState('')
    const [taskduedate, settaskduedate] = useState('')
    const [taskstatus, settaskstatus] = useState('')
    const [taskpriority, settaskpriority] = useState('')
    const [taskcategory, settaskcategory] = useState('')


    const formatDate = (date) => {
        try {
            const formattedDate = format(date, "yyyy-MM-dd");
            return formattedDate
        } catch (error) {
            console.log("error", error);

        }
    }
    const Updatetask = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/updatetask`, {
                "task_id": taskidvalue,
                "taskdescription": taskdescription,
                "duedate": taskduedate,
                "status": taskstatus,
                "priority": taskpriority,
                "Category": taskcategory
            },
                {
                    headers: {
                        'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                    },
                }
            )
            if (response.data == 'Task updated successfully' && response.status == 200) {
                alert('Task updated Succesfully')
            }
            window.location.reload()
        } catch (error) {
            alert(error.response.data)
            console.error("Error during Deleting task:", error);
        }
    }
    const DeleteParticularTask = async (taskid) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/deletetask`, {
                'task_id': taskid,
            },
                {
                    headers: {
                        'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                    },
                }
            )
            if (response.data == 'Task deleted successfully' && response.status == 200) {
                alert('Task Deleted Succesfully')
            }
            window.location.reload()

        } catch (error) {
            alert(error.response.data)
            console.error("Error during Deleting task:", error);
        }
    }


    useEffect(() => {
        const GetTodaysTask = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/todayslist`, {
                    'userid': sessionStorage.getItem('userid'),
                    'status': 'Pending'
                },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                        },
                    })
                settodaystaskdat(response.data)
            } catch (error) {
                console.error("Error during upcoming task:", error);
            }
        }
        GetTodaysTask()
    }, [token])

    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <Container fluid className='pb-5 pt-5 pt-lg-6 align-items-center '>
                    <Row className="mt-5">
                        <Col>
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Todays Task</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Button
                                                color="primary"
                                                onClick={(e) => navigate('/tasklist')}
                                                size="sm"
                                            >
                                                See all
                                            </Button>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">SR NO.</th>
                                            <th scope="col">Task Description</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Priorty</th>
                                            <th scope="col">category</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todaystaskdata && todaystaskdata.map((prop, index) => (
                                            <tr>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {prop.task_description}
                                                </td>
                                                <td>
                                                    {formatDate(prop.due_date)}
                                                </td>
                                                <td>
                                                    {prop.status}
                                                </td>
                                                <td>
                                                    {prop.priority}
                                                </td>
                                                <td>
                                                    {prop.category}
                                                </td>
                                                <td style={{ display: 'flex' }}>
                                                    <div className="col text-right">
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            href="#edit"
                                                            onClick={() => { settaskdescription(prop.task_description); settaskduedate(formatDate(prop.due_date)); settaskstatus(prop.status); settaskpriority(prop.priority); settaskcategory(prop.category, prop.task_id); settaskid(prop.task_id) }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <div className="col text-right">
                                                        <Button
                                                            color="primary"
                                                            size="sm"
                                                            onClick={() => DeleteParticularTask(prop.task_id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>

                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
            <div id="edit" class="popup-container popup-style-2">
                <div class="popup-content">
                    <a href="#" class="close">&times;</a>
                    <h3>Edit task</h3>
                    <Container className='pb-5 pt-5 pt-lg-4 align-items-center ' fluid>
                        <Row>
                            <Col className="order-xl-1" xl="12">
                                <Card className="bg-secondary shadow">
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted">
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
                                                                value={taskdescription}
                                                                onChange={(e) => settaskdescription(e.target.value)}
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
                                                                value={taskduedate}
                                                                onChange={(e) => settaskduedate(formatDate(e.target.value))}
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
                                                                <select class="form-select" value={taskstatus} onChange={(e) => settaskstatus(e.target.value)}>
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
                                                                <select class="form-select" value={taskpriority == null ? '' : taskpriority} onChange={(e) => settaskpriority(e.target.value)}>
                                                                    <option disabled value=''>Choose Status</option>
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
                                                                <select class="form-select" value={taskcategory == null ? '' : taskcategory} onChange={(e) => settaskcategory(e.target.value)}>
                                                                    <option disabled value=''>Choose Status</option>
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
                    <div className="col text-right">
                        <Button
                            color="primary"
                            size="sm"
                            onClick={Updatetask}
                        >
                            Update task
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
