import React from "react";
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';

function Contact() {
  return (
    <div className="contact">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Contact</h1>
            <p>Find us at any of the social media platforms below</p>
            <p><SocialIcon url="https://www.facebook.com/GatorsHvZ" network="facebook"/> {""}
               <SocialIcon url="https://twitter.com/GatorsHvZ" network="twitter"/> {""}
               <SocialIcon url="https://www.instagram.com/gatorshvz/" network="instagram"/> {""}
               <SocialIcon url="https://www.reddit.com/user/gatorshvz/" network="reddit"/> {""}
              <SocialIcon url="ufgatorhvz@gmail.com" network="email"/></p>
            <p>Or, send us a message through the form below</p>
            <p>Name<span style={{ color: 'red' }}>*</span></p>
            <p>Email<span style={{ color: 'red' }}>*</span></p>
            <p>Message or Question<span style={{ color: 'red' }}>*</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;