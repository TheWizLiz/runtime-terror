import React from "react";
import { SocialIcon } from 'react-social-icons';

function Contact() {
  return (
    <div className="contact">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Contact</h1>
            <br />
            <p>Find us at any of the social media platforms below</p>
            <p><SocialIcon url="https://www.facebook.com/GatorsHvZ" target="_blank" network="facebook"/> {""}
               <SocialIcon url="https://twitter.com/GatorsHvZ" target="_blank" network="twitter"/> {""}
               <SocialIcon url="https://www.instagram.com/gatorshvz/" target="_blank" network="instagram"/> {""}
               <SocialIcon url="https://www.reddit.com/user/gatorshvz/" target="_blank" network="reddit"/> {""}
              <SocialIcon url="mailto: ufgatorhvz@gmail.com" target="_blank" network="email"/></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;