import React from "react";
import "./index.css";

const ContactForm = () => {
  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src="https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Contact" />
      </div>
      <div className="contact-form">
        <h2 className="heading">Contact Us</h2>
        <form>
          <div className="form-group">
            <div className="input-container">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="input-container">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="message-container">
            <label>Message</label>
            <textarea placeholder="Enter your message"></textarea>
          </div>
          <button type="submit" className="send-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
