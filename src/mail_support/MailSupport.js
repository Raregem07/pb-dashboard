/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';


function MailSupport() {

  const form = useRef();

  const sendEmail = (e) => {
    emailjs.sendForm("service_ulxh8eo","template_r3jg6hk", form.current, "Frcd-ORyHogfFP7Lk")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
        <div style={{margin:"10% auto", width:"50%"}}>
            <h2 style={{textAlign:"center"}}>Submit Ticket</h2>
            <form ref={form} onSubmit={sendEmail} style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                 <div>
                    <div>Name</div>
                    <input type="text" name='from_name' id='name' required />
                 </div>
                 <div>
                    <div>Email</div>
                    <input type="email" name='user_email' id='email' required />
                 </div>
                 <div>
                    <div>Subject</div>
                    <input type="text" name='subject' id='subject' required />
                 </div>
                 <div>
                    <div>Message</div>
                    <textarea name='message' id="message" cols="30" rows="5" required></textarea>
                 </div>
                 <button type="submit">Submit</button>
            </form>
        </div>
        <style jsx>{`
          form div div {
            padding: 10px 0;
            font-size: 16px;
            font-weight: 600;
          }
          label {
            margin-top: 15px;
          }

          input, textarea {
            width: 100%;
            outline: none;
            border: none;
          }

          input, button {
            height: 30px;
          }

          input {
            padding: 5px;
          }

          button {
            margin-top: 15px;
            width: 100%;
            cursor: pointer;
            font-size: 16px;
          }
          `}</style>
    </>
  )
}

export default MailSupport