import React from 'react';
import './contact-page.styles.scss';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact">
        <Link
          className="link"
          to={{
            pathname: 'https://www.facebook.com/khanh.lee.3958/',
          }}
          target="_blank"
        >
          Facebook: LD Khánh
        </Link>
        <Link
          className="link"
          to={{
            pathname: 'https://github.com/khanhleemtp',
          }}
          target="_blank"
        >
          Github: khanhleemtp
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
