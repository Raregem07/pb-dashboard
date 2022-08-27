/* eslint-disable no-unused-vars */
import React from 'react';
import getMainUser from "../common/chrome/GetMainUser";
import Typewriter from 'typewriter-effect';

class WelcomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
  }

  render() {
    return <React.Fragment>
      <div style={{
        width: "66%",
        backgroundColor: "white",
        margin: "20px auto 0",
        fontSize: "145%",
        padding: "1% 1% 1% 2%",
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: 11,
        font: "Medium 27px/33px Roboto",
        color: "black"
      }}>
        <div>
          <Typewriter
            options={{
              delay: 50,
              loop: true
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('Get <strong>Email, location, contact</strong>, etc for <strong>Followers</strong> of your @competitor')
                .pauseFor(2500)
                .deleteChars(10)
                .typeString('own_account')
                .pauseFor(1500)
                .deleteAll(0.9)
                .typeString('Get details of Users who posted with <strong>specific hashtag</strong>')
                .pauseFor(1500)
                .deleteAll(0.9)
                .typeString('Get all <strong>followers</strong> of <strong>@nike</strong>')
                .pauseFor(1500)
                .deleteAll(0.9)
                .typeString('Get top <strong>likers and commenters</strong> of <strong>@garyvee</strong>')
                .pauseFor(1500)
                .deleteAll(0.9)
                .typeString('Users who posted at specific <strong>Location</strong>')
                .pauseFor(1500)
                .deleteAll(0.9)
                .start();
            }}
          />
        </div>
      </div>
    </React.Fragment>
  }
}


export default WelcomeContent;
