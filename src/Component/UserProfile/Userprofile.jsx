import React, { useState, useEffect } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Header } from '../HeaderCommon/Header'
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
import axios from "axios";
import { format } from "date-fns";

export function Userprofile() {
    const [token] = useState(sessionStorage.getItem('Token'))
    const [Userdetails, setUserdetails] = useState([])
    const [updatedusername, setupdatedusername] = useState('')
    const [updatedemail, setupdatedemail] = useState('')
    const [updatedfirstname, setupdatedfirstname] = useState('')
    const [updatedlastname, setupdatedlastname] = useState('')
    const [updatedaddress, setupdatedaddress] = useState('')
    const [updatedaboutme, setupdatedaboutme] = useState('')


    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }); // "Feb"
        const year = date.getFullYear();

        // Determine the ordinal suffix
        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        return `${day}${suffix} ${month} ${year}`;
    }

    const UpdateProfile = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/updateuserdetails`, {
                'userid': sessionStorage.getItem('userid'),
                'firstname': updatedfirstname,
                'lastname': updatedlastname,
                'username': updatedusername,
                'email': updatedemail,
                'Address': updatedaddress,
                'aboutme': updatedaboutme
            },
                {
                    headers: {
                        'authorization': `Bearer ${token}`, // Add the token as a Bearer token
                    },
                }
            )
            if (response.data == 'User details updated successfully' && response.status == 200) {
                alert(response.data)
                window.location.reload()
            }
            else {
                alert('Not Updated')
            }

        } catch (error) {
            console.log("error", error);

        }
    }

    useEffect(() => {
        const GetWorkData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/getuser`, {
                    'userid': sessionStorage.getItem('userid'),
                })
                setUserdetails(response.data[0])
            } catch (error) {
                console.error("Error during upcoming task:", error);
            }
        }
        GetWorkData()
    }, [])
    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <div
                    className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "600px",
                        backgroundImage:
                            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                >
                    {/* Mask */}
                    <span className="mask bg-gradient-default opacity-8" />
                    {/* Header container */}
                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="7" md="10">
                                <h1 className="display-2 text-white">Hello {Userdetails.username}</h1>
                                <p className="text-white mt-0 mb-5">
                                    This is your profile page. You can see the progress you've made
                                    with your work and manage your projects or assigned tasks
                                </p>
                                <Button
                                    color="info"
                                    href="#edit"
                                    onClick={() => { setupdatedusername(Userdetails.username); setupdatedemail(Userdetails.email); setupdatedfirstname(Userdetails.first_name); setupdatedlastname(Userdetails.last_name); setupdatedaddress(Userdetails.Address); setupdatedaboutme(Userdetails.about_me) }}
                                >
                                    Update Profile
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 >Account Created at</h3>
                                            <a>{formatDate(Userdetails.created_at)}</a>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">22</span>
                                                    <span className="description">Total task</span>
                                                </div>
                                                <div>
                                                    <span className="heading">10</span>
                                                    <span className="description">Completed Task</span>
                                                </div>
                                                <div>
                                                    <span className="heading">89</span>
                                                    <span className="description">Active Status</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="text-center">
                                        <h3>
                                            {Userdetails.username}
                                        </h3>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {Userdetails.Address}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-1" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My account</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Settings
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Username
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Username"
                                                            type="text"
                                                            value={Userdetails.username}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="email"
                                                            value={Userdetails.email}
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
                                                            First name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            placeholder="Please update yours detail"
                                                            type="text"
                                                            value={Userdetails.first_name}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-last-name"
                                                            placeholder="Please update yours detail"
                                                            type="text"
                                                            value={Userdetails.last_name}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Contact information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-address"
                                                            placeholder="Please update yours detail"
                                                            type="text"
                                                            value={Userdetails.Address}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />
                                        {/* Description */}
                                        <h6 className="heading-small text-muted mb-4">About me</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    className="form-control-alternative"
                                                    placeholder="Please update yours detail"
                                                    rows="4"
                                                    type="textarea"
                                                    value={Userdetails.about_me}
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
            <div id="edit" class="popup-container popup-style-2">
                <div class="popup-content">
                    <a href="#" class="close">&times;</a>
                    <h3>Update Profile</h3>
                    <Container className='pb-5 pt-5 pt-lg-4 align-items-center ' fluid>
                        <Row>
                            <Col className="order-xl-1" xl="12">
                                <Card className="bg-secondary shadow" style={{ overflow: 'scroll', height: '426px' }}>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted">
                                                Your information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Username
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Username"
                                                                type="text"
                                                                value={updatedusername}
                                                                onChange={(e) => setupdatedusername(e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-email"
                                                            >
                                                                Email address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                type="email"
                                                                value={updatedemail}
                                                                onChange={(e) => setupdatedemail(e.target.value)}

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
                                                                First name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                placeholder="Please update yours detail"
                                                                type="text"
                                                                value={updatedfirstname}
                                                                onChange={(e) => setupdatedfirstname(e.target.value)}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-last-name"
                                                            >
                                                                Last name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-last-name"
                                                                placeholder="Please update yours detail"
                                                                type="text"
                                                                value={updatedlastname}
                                                                onChange={(e) => setupdatedlastname(e.target.value)}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4" />
                                            {/* Address */}
                                            <h6 className="heading-small text-muted mb-4">
                                                Contact information
                                            </h6>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-address"
                                                            >
                                                                Address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-address"
                                                                placeholder="Please update yours detail"
                                                                type="text"
                                                                value={updatedaddress}
                                                                onChange={(e) => setupdatedaddress(e.target.value)}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr className="my-4" />
                                            {/* Description */}
                                            <h6 className="heading-small text-muted mb-4">About me</h6>
                                            <div className="pl-lg-4">
                                                <FormGroup>
                                                    <label>About Me</label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        placeholder="Please update yours detail"
                                                        rows="4"
                                                        type="textarea"
                                                        value={updatedaboutme}
                                                        onChange={(e) => setupdatedaboutme(e.target.value)}

                                                    />
                                                </FormGroup>
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
                            onClick={UpdateProfile}
                        >
                            Update task
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
