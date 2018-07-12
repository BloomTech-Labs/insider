import React from 'react';
import { Link } from 'react-router-dom';

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
        <a href="/contact" className="add-contact">
          Contact the Team
        </a>
      </div>
    </div>
  );
};

export default Footer;
