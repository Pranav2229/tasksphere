import React, { useEffect, useState } from 'react'
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
import logo from '../../assets/img/brand/tasksphere.jpg'
import dashbaord from '../../assets/img/icons/common/dashboard.png'
import personal from '../../assets/img/icons/common/personal.png'
import study from '../../assets/img/icons/common/study.png'
import today from '../../assets/img/icons/common/today.png'
import upcoming from '../../assets/img/icons/common/upcoming.png'
import work from '../../assets/img/icons/common/work.png'
import createtask from '../../assets/img/icons/common/createtask.png'
import tasklist from '../../assets/img/icons/common/tasklist.png'
import photo from '../../assets/img/theme/team-4-800x800.jpg'
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
export function Sidebar() {
    const navigate = useNavigate()
    const [collapseOpen, setCollapseOpen] = useState();
    let routes = ['Dashboard', 'icons', 'maps', 'userprofile']
    const leftmenu = ['Dashboard', 'icons', 'maps', 'userprofile']
    const [toggleCollapse, settoggleCollapse] = useState(false)
    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            return (
                <NavItem key={key}>
                    <NavLink
                        to={prop.layout + prop.path}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                    >
                        <i className={prop.icon} />
                        {prop.name}
                    </NavLink>
                </NavItem>
            );
        });
    };
    // const toggleCollapse = () => {
    // document.getElementsByClassName('mobileview').style.display = 'block'
    // const collection = document.getElementsByClassName("mobileview");        
    // collection[0].style.display = "block";


    //         var btn = document.querySelector('.toggle');
    // var btnst = true;
    // btn.onclick = function() {
    //   if(btnst == true) {
    // document.querySelector('.toggle span').classList.add('toggle');
    // document.getElementById('sidebar').classList.add('sidebarshow');
    //   }else if(btnst == false) {
    //     document.querySelector('.toggle span').classList.remove('toggle');
    //     document.getElementById('sidebar').classList.remove('sidebarshow');
    //     btnst = true;
    //   }
    // }
    const closeCollapse = () => {

    }
    useEffect(() => {
        if (toggleCollapse) {
            document.getElementById('sidebar').classList.add('sidebarshow');
            document.getElementsByClassName('navbar-toggler')
            const collection = document.getElementsByClassName("navbar-toggler");
            collection[0].style.MarginLeft = "200px";
        } else {
            document.getElementById('sidebar').classList.remove('sidebarshow');
        }
    }, [toggleCollapse])

    return (
        <>
            <Navbar
                className="navbar-vertical fixed-left navbar-light bg-white"
                expand="md"
                id="sidenav-main"
            >
                <Container fluid>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => settoggleCollapse(!toggleCollapse)}
                    >

                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Brand */}
                    <NavbarBrand className="pt-0">
                        <img
                            alt='brand-img'
                            className="navbar-brand-img"
                            src={logo}
                            onClick={() => navigate('/landing')}
                        />
                    </NavbarBrand>

                    <ul className='navbar-nav desktopview'>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Dashboard' ? 'itemactive' : ''}`} onClick={() => { navigate('/landing'); localStorage.setItem('selectedtab', 'Dashboard') }}>
                            <a className='nav-link'></a>
                            <img src={dashbaord} className='adjustimg' />
                            Dashboard
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Crate Task' ? 'itemactive' : ''}`} onClick={() => { navigate('/createtask'); localStorage.setItem('selectedtab', 'Crate Task') }}>
                            <a className='nav-link'></a>
                            <img src={createtask} className='adjustimg' />
                            Crate Task
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Task list' ? 'itemactive' : ''}`} onClick={() => { navigate('/tasklist'); localStorage.setItem('selectedtab', 'Task list') }}>
                            <a className='nav-link'></a>
                            <img src={tasklist} className='adjustimg' />
                            Task list
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Up comeing' ? 'itemactive' : ''}`} onClick={() => { navigate('/upcomingtask'); localStorage.setItem('selectedtab', 'Up comeing') }}>
                            <a className='nav-link'></a>
                            <img src={upcoming} className='adjustimg' />
                            Up comeing
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Today' ? 'itemactive' : ''}`} onClick={() => { navigate('/todaystask'); localStorage.setItem('selectedtab', 'Today') }}>
                            <a className='nav-link'></a>
                            <img src={today} className='adjustimg' />
                            Today
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Office Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/workreporttask'); localStorage.setItem('selectedtab', 'Office Work') }}>
                            <a className='nav-link'></a>
                            <img src={work} className='adjustimg' />
                            Office Work
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Personal Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/personalreporttask'); localStorage.setItem('selectedtab', 'Personal Work') }}>
                            <a className='nav-link'></a>
                            <img src={personal} className='adjustimg' />
                            Personal Work
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Study Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/studyreporttask'); localStorage.setItem('selectedtab', 'Study Work') }}>
                            <a className='nav-link'></a>
                            <img src={study} className='adjustimg' />
                            Study Work
                        </li>
                        <li className={`nav-item ${localStorage.getItem('selectedtab') == 'User Profile' ? 'itemactive' : ''}`} onClick={() => { navigate('/userprofile'); localStorage.setItem('selectedtab', 'User Profile') }}>
                            <a className='nav-link'></a>
                            <img src={photo} className='adjustimg' />
                            User Profile
                        </li>
                    </ul>
                    {/* Mobile View  */}
                    <div class="sidebar" id='sidebar'>
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => settoggleCollapse(!toggleCollapse)}
                        >

                            <span className="navbar-toggler-icon" />
                        </button>
                        <ul>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Dashboard' ? 'itemactive' : ''}`} onClick={() => { navigate('/landing'); localStorage.setItem('selectedtab', 'Dashboard') }}>
                                <a className='nav-link'></a>
                                <img src={dashbaord} className='adjustimg' />
                                Dashboard
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Crate Task' ? 'itemactive' : ''}`} onClick={() => { navigate('/createtask'); localStorage.setItem('selectedtab', 'Crate Task') }}>
                                <a className='nav-link'></a>
                                <img src={createtask} className='adjustimg' />
                                Crate Task
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Task list' ? 'itemactive' : ''}`} onClick={() => { navigate('/tasklist'); localStorage.setItem('selectedtab', 'Task list') }}>
                                <a className='nav-link'></a>
                                <img src={tasklist} className='adjustimg' />
                                Task list
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Up comeing' ? 'itemactive' : ''}`} onClick={() => { navigate('/upcomingtask'); localStorage.setItem('selectedtab', 'Up comeing') }}>
                                <a className='nav-link'></a>
                                <img src={upcoming} className='adjustimg' />
                                Up comeing
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Today' ? 'itemactive' : ''}`} onClick={() => { navigate('/todaystask'); localStorage.setItem('selectedtab', 'Today') }}>
                                <a className='nav-link'></a>
                                <img src={today} className='adjustimg' />
                                Today
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Office Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/workreporttask'); localStorage.setItem('selectedtab', 'Office Work') }}>
                                <a className='nav-link'></a>
                                <img src={work} className='adjustimg' />
                                Office Work
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Personal Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/personalreporttask'); localStorage.setItem('selectedtab', 'Personal Work') }}>
                                <a className='nav-link'></a>
                                <img src={personal} className='adjustimg' />
                                Personal Work
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'Study Work' ? 'itemactive' : ''}`} onClick={() => { navigate('/studyreporttask'); localStorage.setItem('selectedtab', 'Study Work') }}>
                                <a className='nav-link'></a>
                                <img src={study} className='adjustimg' />
                                Study Work
                            </li>
                            <li className={`nav-item ${localStorage.getItem('selectedtab') == 'User Profile' ? 'itemactive' : ''}`} onClick={() => { navigate('/userprofile'); localStorage.setItem('selectedtab', 'User Profile') }}>
                                <a className='nav-link'></a>
                                <img src={photo} className='adjustimg' />
                                User Profile
                            </li>
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}
