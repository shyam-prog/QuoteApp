import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {

    const currYear = new Date().getFullYear();

    return <>
        <div className={classes.footer}>
            <div className={classes.copyright}>
            © { `${currYear}` } Shyam Modha.
            </div>
            <div className={classes.contactLinks}>
            <a href='https://www.linkedin.com/in/modha-shyam-3552931a1'>LinkedIn |</a> 
            <a href='https://www.instagram.com/shyam_14_10/'> Instagram</a>
            </div>
        </div>
    </>
}

export default Footer;