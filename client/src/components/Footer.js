import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <img
          href="https://lambdaschool.com/"
          src="images/lambda_logo.png"
          alt="Lambda logo"
        />
        <span>●</span>
        <Link
            to='/devs2'
            className='add-contact'
          >Contact us</Link>
      </div>
    </div>
  );
};

export default Footer;
