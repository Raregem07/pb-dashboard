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
        width: "93%",
        backgroundColor: "white",
        marginTop: "1%",
        marginLeft: "4%",
        fontSize: "165%",
        paddingTop: "1.2%",
        paddingLeft: "2%",
        paddingBottom: "2%",
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: 11,
        font: "Medium 32px/38px Roboto",
        color: "#707070"
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
