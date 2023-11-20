import React from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Helmet } from 'react-helmet';
const Contact = () => {
  const pageTitle = 'Contact Us - Get in Touch with Our Team';
  const pageDescription = 'Contact our team for inquiries, support, or any questions you may have.';
  return (
    <div className="contact mt-3">
        <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="container">
        <MDBValidation noValidate id='form' className='text-center mx-auto' style={{ width: '100%', maxWidth: '300px' }}>
          <h2>Contact us</h2>

          <MDBValidationItem invalid feedback='Please provide your name.'>
            <MDBInput v-model='name' wrapperClass='mb-4' placeholder="Name" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback='Please provide your email.'>
            <MDBInput type='email' v-model='email' wrapperClass='mb-4' placeholder="Email address" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback='Please provide mail subject.'>
            <MDBInput v-model='subject' wrapperClass='mb-4' placeholder="Subject" required />
          </MDBValidationItem>

          <MDBValidationItem invalid feedback='Please provide a message text.'>
            <MDBTextArea wrapperClass='mb-4' placeholder="Message" required />
          </MDBValidationItem>

          <button type='submit' className='btn btn-danger'>
            Send
          </button>
        </MDBValidation>
      </div>
    </div>
  );
};

export default Contact;
