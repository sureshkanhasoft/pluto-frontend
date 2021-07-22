import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <Container maxWidth="lg">
                    <div className="footer-link">
                        <Link to="#" className="footer-nav-link">
                            <span className="circle"><LockOutlinedIcon /></span>
                            <span>Privacy Policy</span>
                        </Link>
                        <Link to="#" className="footer-nav-link">
                            <span className="circle"><DescriptionOutlinedIcon /></span>
                            <span> Terms and Conditions</span>
                        </Link>
                        <Link to="#" className="footer-nav-link">
                            <span className="circle"><DescriptionOutlinedIcon /></span>
                            <span>Modern Slavery Policy</span>
                        </Link>
                        <Link to="#" className="footer-nav-link">
                            <span className="circle"><PolicyOutlinedIcon /></span>
                            <span>Cookie Policy</span>
                        </Link>
                        <a href="tel:44203 826 6040" className="footer-nav-link">
                            <span className="circle"><PhoneIphoneOutlinedIcon /></span>
                            <span>+44 (0) 203 826 6040</span>
                        </a>
                        <a href="mailto:information@pluto.com" className="footer-nav-link">
                            <span className="circle"><MailOutlineOutlinedIcon /></span>
                            <span>information@pluto.com</span>
                        </a>
                    </div>
                </Container>
            </div>

            <div className="copyright-cont">
                <Container maxWidth="lg">
                    <span>Copyright 2021 Pluto. All rights reserved.</span>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;