import { useEffect, useState } from "react"
import { Sidebar } from "../Sidebar/Sidebar"
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
import settingicon from '../../assets/img/icons/common/setting_icon.svg'
import supporticon from '../../assets/img/icons/common/support_icon.svg'
import usericon from '../../assets/img/icons/common/user_icon.svg'
import activityicon from '../../assets/img/icons/common/activity_icon.svg'
import logouticon from '../../assets/img/icons/common/logout_icon.svg'
import emailjs from 'emailjs-com';


import {
    Button,
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
    Navbar,
    Nav,
    Container,
} from "reactstrap";

export function Header() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [Image, setImage] = useState(null)
    const [demovalues, setdemovalues] = useState('')
    const [pagessupport, setpagessupport] = useState('')
    const [errorsupport, seterrorsupport] = useState('')
    const [noneofthem, setnoneofthem] = useState('')
    const [othersupport, setothersupport] = useState('')
    const [pagesdeatils, setpagesdeatils] = useState('')
    const Logout = () => {
        try {
            sessionStorage.removeItem('IsUserLogedIn')
            sessionStorage.removeItem('Token')
            sessionStorage.removeItem('userid')
            window.location.reload('/login')
        } catch (error) {
            alert('error while logout')
        }
    }

    const SupportMail = async () => {
        try {
            if (Image || demovalues || othersupport || pagesdeatils) {
                const formData = {
                    name: sessionStorage.getItem('username'),
                    email: sessionStorage.getItem('email'),
                    Image: Image || null,
                    demovalues: demovalues || null,
                    pagesdeatils: pagesdeatils || null,
                    subject: 'Support for tasksphere'
                }
                try {
                    emailjs
                        .send(
                            'service_tkvg3cd', // Replace with your service ID
                            'template_15firnv', // Replace with your template ID
                            formData, // Email content (from form data)
                            'OM11hkQPPZjsJC1MY' // Replace with your user ID from EmailJS
                        )
                        .then(
                            (result) => {
                                console.log('Email successfully sent!', result.text);
                                window.location.href = '#'
                                alert('Message sent!');

                            },
                            (error) => {
                                console.log('Failed to send the email.', error.text);
                                alert('Failed to send message.');
                            }
                        );
                } catch (error) {
                    console.log("error", error);
                }
            } else {
                alert('Please select one option')
            }
        } catch (error) {
            console.log("error", error);

        }

    }

    const handlefileupload = (event) => {
        let MAX_SIZE = 2 * 1024 * 1024
        let file = event.target.files[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file.');
                return;
            }

            if (file.size > MAX_SIZE) {
                alert(`File size exceeds the 2MB limit.`);
                return;
            }
            setImage(URL.createObjectURL(file));
        }
    }
    return (
        <>

            <Navbar className="navbar-top navbar-dark bg-gradient-info" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        Dashbord
                    </Link>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupText>
                                    <i className="fas fa-search" />
                                </InputGroupText>
                                <Input placeholder="Search" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Nav className="align-items-center d-none d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img
                                            alt="..."
                                            src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                        />
                                    </span>
                                    <Media className="ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm font-weight-bold">
                                            Jessica Jones
                                        </span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow userdrp" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </DropdownItem>
                                <DropdownItem onClick={() => { navigate('/userprofile'); localStorage.setItem('selectedtab', 'User Profile') }}>
                                    <img src={usericon} />
                                    <span>My profile</span>
                                </DropdownItem>
                                <DropdownItem href="#popup2">
                                    <img src={supporticon} />
                                    <span>Support</span>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={Logout}>
                                    <img src={logouticon} />
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div id="popup2" class="popup-container popup-style-2">
                <div class="popup-content">
                    <a href="#" class="close">&times;</a>
                    <h3>If you want support from our team please fill the below details..</h3>
                    <div>
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setdemovalues('alldemo'); setpagessupport(''); seterrorsupport(''); setnoneofthem('') }} />
                            <span>Do you want demo of all tasksphere ?</span>
                        </div>
                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setpagessupport('pagessupport'); seterrorsupport(''); setnoneofthem('') }} />
                            <span>Do you want support for other pages ?</span>
                        </div>
                        {pagessupport == 'pagessupport' && (
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Enter pages names
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="pages names"
                                    type="text"
                                    value={pagesdeatils}
                                    onChange={(e) => setpagesdeatils(e.target.value)}
                                />
                            </FormGroup>
                        )}

                        <div className="flex">
                            <input type="radio" name='support' onChange={() => { setnoneofthem('noneofthem'); seterrorsupport(''); setpagessupport('') }} />
                            <span>none of them</span>
                        </div>
                        {noneofthem == 'noneofthem' && (
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Enter other support rather then above ones..
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="pages names"
                                    type="text"
                                    value={othersupport}
                                    onChange={(e) => setothersupport(e.target.value)}
                                />
                            </FormGroup>
                        )}
                        <div className="col" style={{ textAlign: 'center' }}>
                            <Button
                                color="primary"
                                onClick={SupportMail}
                                size="sm"
                            >
                                Submit support
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
