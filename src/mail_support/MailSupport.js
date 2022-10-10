import React, { useState } from 'react';

const sendMessage = () => {
    alert('MESSAGE SENT');
}

function MailSupport() {
  return (
    <>
        <div style={{margin:"10% auto",padding:"20px"}}>
            <h2>Submit Ticket</h2>
            <div>
                 <div>
                    <label htmlFor='subject'>Subject</label>
                    <input type="text" name='subject' id='subject' />
                 </div>
                 <div>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name='email' className='' />
                 </div>
                 <div>
                    <label htmlFor='message'>Message</label>
                    <input type="text" name='message' id='message' />
                 </div>
            </div>
            <button type="submit" onClick={sendMessage}></button>
        </div>
    </>
  )
}

export default MailSupport