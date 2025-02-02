import React, { useState } from 'react'
import { data, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
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
export function Forgotpassword() {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const navigate = useNavigate()
    const [EmailValue, setEmailValue] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const UpdatePassword = async () => {
        if (EmailValue && Password && ConfirmPassword) {
            if (Password === ConfirmPassword) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/forgotpassword`, {
                        "email": EmailValue,
                        "password": Password
                    })
                    if (response.data == 'Password updated successfully' && response.status == 200) {
                        alert(response.data)
                        setEmailValue('')
                        setPassword('')
                        setConfirmPassword('')
                        navigate('/login')
                    }
                } catch (error) {
                    alert(error.response.data.message)
                    console.log("Error in update password", error)
                }

            } else {
                alert('New password and Confirm password are not same')
            }
        } else {
            if (!EmailValue) {
                alert('Please provide email for varify user details')
            }
            if (!Password) {
                alert('Please provide password')
            }
            if (!ConfirmPassword) {
                alert('Please provide Confirm password')
            }
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
                                <CardBody className="px-lg-5 py-lg-5">
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
                                                    placeholder="New Password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    value={Password}
                                                    onChange={(e) => setPassword(e.target.value)}
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
                                                    value={ConfirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="button" onClick={UpdatePassword}>
                                                Update Password
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />

        </>
    )
}
