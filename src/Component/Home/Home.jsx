import { useEffect, useState } from "react"
import { Sidebar } from "../Sidebar/Sidebar"
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
import { Header } from "../HeaderCommon/Header";
import totaltask from '../../assets/img/icons/common/totaltask.gif'
// import { Line, Bar } from "react-chartjs-2";
// import classnames from "classnames";
// import Chart from "chart.js";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
import Footer from "../LoginPages/Footer/Footer";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate()
    const [paragrafh] = useState('The project is a feature-rich and responsive task management application designed to enhance productivity and organization. It begins with a secure user authentication system featuring a login and registration page, safeguarded by JWT token-based authentication. Upon logging in, users are welcomed to a dynamic dashboard where they can seamlessly add, categorize, and manage tasks. Tasks are organized into categories such as Work, Office, and Personal, with clear status indicators for Pending and Completed tasks. A dedicated sidebar ensures intuitive navigation across various sections, including a user profile page.The application leverages modern technologies, with a React.js frontend offering a sleek and responsive design, while the backend, powered by Node.js, ensures robust API functionality. Data is securely managed in a MySQL database, providing scalability and reliability. This application not only streamlines task management but also showcases a cohesive integration of cutting-edge technologies, ensuring an optimal user experience.')
    const [token] = useState(sessionStorage.getItem('Token'))
    const [taskcount, settaskcount] = useState('')
    const [todaystaskcount, settodaystaskcount] = useState('')
    const [pendingtaskcount, setpendingtaskcount] = useState('')
    const [compltedtaskcount, setcompltedtaskcount] = useState('')

    useEffect(() => {
        const GetWorkData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/taskcount`, {
                    'userid': sessionStorage.getItem('userid'),
                },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                        },
                    })
                settaskcount(response.data[0])
            } catch (error) {
                console.error("Error during upcoming task:", error);
                if (error.response.data.message == 'Invalid or expired token.' && error.status == 403) {
                    sessionStorage.removeItem('IsUserLogedIn')
                    sessionStorage.removeItem('Token')
                    sessionStorage.removeItem('userid')
                    window.location.reload('/login')
                }
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/pendingtaskcount`, {
                    'userid': sessionStorage.getItem('userid'),
                },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                        },
                    })
                setpendingtaskcount(response.data[0])
            } catch (error) {
                console.error("Error during upcoming task:", error);
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/compltedtaskcount`, {
                    'userid': sessionStorage.getItem('userid'),
                },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                        },
                    })
                setcompltedtaskcount(response.data[0])
            } catch (error) {
                console.error("Error during upcoming task:", error);
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}task/todaystaskcount`, {
                    'userid': sessionStorage.getItem('userid'),
                },
                    {
                        headers: {
                            'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                        },
                    })
                settodaystaskcount(response.data[0])
            } catch (error) {
                console.error("Error during upcoming task:", error);
            }
        }
        GetWorkData()
    }, [token])
    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                    <Container fluid>
                        <div className="header-body">
                            {/* Card stats */}
                            <Row>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Total tasks
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {taskcount == '' ? '' : taskcount.task_count}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i src={totaltask} />

                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-success mr-2">
                                                    <i className="fa fa-arrow-up" /> 0.00%
                                                </span>{" "}
                                                <span className="text-nowrap">Since last one year</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Pending
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {pendingtaskcount == '' ? '0' : pendingtaskcount.pending_task_count}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                        <i className="fas fa-chart-pie" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-danger mr-2">
                                                    <i className="fas fa-arrow-down" /> 0.00%
                                                </span>{" "}
                                                <span className="text-nowrap">Since last 3 month</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Completed
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0"> {compltedtaskcount == '' ? '0' : compltedtaskcount.Completed_task_count}</span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                        <i className="fas fa-users" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-warning mr-2">
                                                    <i className="fas fa-arrow-down" /> 0.00%
                                                </span>{" "}
                                                <span className="text-nowrap">Since last 3 month</span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Todays task
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">{todaystaskcount == '' ? '0' : todaystaskcount.Todays_task_count}</span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                        <i className="fas fa-percent" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-success mr-2">
                                                    <i className="fas fa-arrow-up" /> 0.00%
                                                </span>{" "}
                                                <span className="text-nowrap">Todays </span>
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow dashboardcss">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Seamlessly Managing Tasks: A Full-Stack Solution</h3>
                                        </Col>
                                        {/* <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Settings
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        {/* Description */}
                                        <div className="pl-lg-2 about-project">
                                            <FormGroup>
                                                <Input
                                                    className="form-control-alternative"
                                                    // placeholder={paragrafh}
                                                    rows="4"
                                                    type="textarea"
                                                    value={paragrafh}
                                                />
                                            </FormGroup>
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

export default Home