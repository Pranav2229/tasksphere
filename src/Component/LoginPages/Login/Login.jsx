import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";

// reactstrap components
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
import Header from "../Header/Header";
const Login = () => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const navigate = useNavigate()
    const [EmailValue, setEmailValue] = useState('')
    const [Password, setPassword] = useState('')
    const [checkboxvalue, setcheckboxvalue] = useState('')

    
    const LoginSubmit = async () => {
        try {
            if (EmailValue && Password) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/login`, {
                        "email": EmailValue,
                        "password": Password
                    })
                    if (response.data && response.status == 200) {

                        sessionStorage.setItem('IsUserLogedIn', true)
                        sessionStorage.setItem('Token', response.data[0])
                        sessionStorage.setItem('username', response.data[2][0]['username'])
                        sessionStorage.setItem('email', response.data[2][0]['email'])
                        sessionStorage.setItem('userid', response.data[2][0]['user_id'])

                        if (checkboxvalue == true) {
                            sessionStorage.setItem('Username', response.data[1])
                            window.location.href = "/landing";
                        }
                        window.location.href = "/landing";
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        alert("Invalid Credentail");
                    } else {
                        console.error("Error during registration:", error);
                        alert(error.response.data)
                    }
                }
            } else {
                if (!EmailValue) {
                    alert("Please enter email")
                }
                if (!Password) {
                    alert('Please enter password')
                }
            }
        } catch (error) {
            console.log('Error', error);
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
                        <Col lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-3">
                                    <div className="text-muted text-center mt-2 mb-3">
                                        <small>Sign in with</small>
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
                                        <small>Or sign in with credentials</small>
                                    </div>
                                    <Form role="form" className="svgsetup">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
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
                                                    value={EmailValue}
                                                    onChange={(e) => setEmailValue(e.target.value)}
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
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id=" customCheckLogin"
                                                type="checkbox"
                                                onClick={() => (setcheckboxvalue(!checkboxvalue))}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor=" customCheckLogin"
                                            >
                                                <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="button" onClick={LoginSubmit}>
                                                Sign in
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Row className="mt-3 login-mini-footer">
                                <Col xs="6">
                                    <a
                                        className="text-light"
                                        onClick={(e) => navigate('/forgotpassword')}
                                    >
                                        <small>Forgot password?</small>
                                    </a>
                                </Col>
                                <Col className="text-right" xs="6">
                                    <a
                                        className="text-light"
                                        // href="/register"
                                        onClick={() => navigate('/register')}
                                    >
                                        <small>Create new account</small>
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

export default Login