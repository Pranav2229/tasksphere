import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
// reactstrap   ,
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
} from "reactstrap";

const Register = () => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const [Email, setUseremail] = useState('')
    const [Password, setUserpassword] = useState('')
    const [privacypolicy, setprivacypolicy] = useState(false)

    const CreateAccount = async () => {
        try {
            if (Username && Email && Password && privacypolicy == true) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/registeruser`, {
                        "username": Username,
                        "email": Email,
                        "password": Password
                    })
                    setUsername('')
                    setUseremail('')
                    setUserpassword('')
                    alert('Succesfully register, Please login with Your credential')
                    navigate('/login')
                } catch (error) {
                    if (error.response && error.response.status === 409) {
                        alert("User already exists. Please log in or use a different email.");
                    } else {
                        console.error("Error during registration:", error);
                    }
                }
            } else {
                if (!Username) {
                    alert('Please Enetr UserName')
                }
                if (!Email) {
                    alert('Please Enetr Email')
                }
                if (!Password) {
                    alert('Please Enetr Password')
                }
                if (privacypolicy == false) {
                    alert('Please varify policy')
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);
    return (
        <>
            <div className="main-content bgcolor" ref={mainContent}>
                {/* <AuthNavbar /> */}
                <Header />
                {/* Page content */}
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">

                        <Col lg="6" md="8">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-3">
                                    <div className="text-muted text-center mt-2 mb-3">
                                        <small>Sign up with</small>
                                    </div>
                                    <div className="btn-wrapper text-center login-with">
                                        <Button
                                            className="btn-neutral btn-icon"
                                            color="default"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span className="btn-inner--icon">
                                                <img
                                                    alt="..."
                                                    src={
                                                        require("../../../assets/img/icons/common/github.svg")
                                                            .default
                                                    }
                                                />
                                            </span>
                                            <span className="btn-inner--text">Github</span>
                                        </Button>
                                        <Button
                                            className="btn-neutral btn-icon"
                                            color="default"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span className="btn-inner--icon">
                                                <img
                                                    alt="..."
                                                    src={
                                                        require("../../../assets/img/icons/common/google.svg")
                                                            .default
                                                    }
                                                />
                                            </span>
                                            <span className="btn-inner--text">Google</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-1">
                                    <div className="text-center text-muted mb-4">
                                        <small>Or sign up with credentials</small>
                                    </div>
                                    <Form role="form" className="svgsetup">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupText>
                                                    <span className="btn-inner--icon">
                                                        <img
                                                            alt="..."
                                                            src={
                                                                require("../../../assets/img/icons/common/User.svg")
                                                                    .default
                                                            }
                                                        />
                                                    </span>
                                                </InputGroupText>
                                                <Input placeholder="Name" type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupText>
                                                    <span className="btn-inner--icon">
                                                        <img
                                                            alt="..."
                                                            src={
                                                                require("../../../assets/img/icons/common/mail.svg")
                                                                    .default
                                                            }
                                                        />
                                                    </span>
                                                </InputGroupText>
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    autoComplete="new-email"
                                                    value={Email}
                                                    onChange={(e) => setUseremail(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupText>
                                                    <span className="btn-inner--icon">
                                                        <img
                                                            alt="..."
                                                            src={
                                                                require("../../../assets/img/icons/common/lock.svg")
                                                                    .default
                                                            }
                                                        />
                                                    </span>
                                                </InputGroupText>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    value={Password}
                                                    onChange={(e) => setUserpassword(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-muted font-italic">
                                            <small>
                                                password strength:{" "}
                                                <span className="text-success font-weight-700">strong</span>
                                            </small>
                                        </div>
                                        <Row className="my-4">
                                            <Col xs="12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        id="customCheckRegister"
                                                        type="checkbox"
                                                        onClick={() => setprivacypolicy(!privacypolicy)}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheckRegister"
                                                    >
                                                        <span className="text-muted">
                                                            I agree with the{" "}
                                                            <a href="#pablo" >
                                                                Privacy Policy
                                                            </a>
                                                        </span>
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-center padbtn">
                                            <Button className="mt-4" color="primary" type="button" onClick={CreateAccount}>
                                                Create account
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Row className="mt-3 login-mini-footer">
                                <Col className="text-right">
                                    <a
                                        className="text-light"
                                        // href="/register"
                                        onClick={() => navigate('/login')}
                                    >
                                        <small>Bank to Login</small>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />

        </>
    )
}

export default Register