/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import logoIcon from '../common/images/pb-logo.png';
import accountIcon from '../common/images/account_icon.jpg';

function Navbar() {

  const [isDropdown, setIsDropdown] = useState(false);

  const conditionsArray = [
    "#/", 
    "#/level_2",
    "#/level_2/follower_following",
    "#/analytics/other/likers_commenters_post",
    "#/analytics/other/hashtag",
    "#/analytics/similar_account",
    "#/analytics/other/location",
    "#/analytics/other/detailed_analysis"
]
  
  return (
    <nav>
      <div className="navWrapper">
        <div className="logoWrapper" style={{display:"flex",gap:"5px"}}>
          <img src={logoIcon} width={30} />
          <Link className="logo" to="/">
            <div style={{ color: "white", fontSize: "22px" }}>ProfileBuddy</div>
          </Link>
        </div>

        <div style={{ flex: 1 }}></div>
        <div>
          <a className="navlink" href="https://localhost:3000/">
            HOME
          </a>
        </div>
        <div>
          <Link className="navlink" to="/" id={ conditionsArray.includes(window.location.hash) ? "focus" : "" }>
            DASHBOARD
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/faq" id={ window.location.hash === "#/faq" ? "focus" : "" }>
            FAQ
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/tutorial" id={ window.location.hash === "#/tutorial" ? "focus" : "" }>
            TRAINING
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/tools" id={ window.location.hash === "#/tools" ? "focus" : "" }>
            VIP BONUS
          </Link>
        </div>
        <div
          className="toggleDropdown"
          onClick={(e) => setIsDropdown(!isDropdown)}
        >
          <img
            src={accountIcon}
            className="accountIcon"
            alt="profile-buddy"
          />
        </div>
        {isDropdown && (
          <div className="dropdown">
            <div>
              <Link className="sublink" to="/account">
                My Account
              </Link>
            </div>
            <div>
              <Link className="sublink" to="/support">
                Support
              </Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        nav {
          background: linear-gradient(
            to right,
            rgba(0, 31, 31),
            rgba(0, 29, 29)
          );
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 9999;
        }

        .logo {
          color: #ffff;
        }

        .navWrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
        }

        .navlink {
          font-size: 16px;
          font-weight: 400;
          color: #ffff;
          padding: 11px 18px;
        }


        .navlink:hover:not(:focus) {
          color: yellow;
        }

        .toggleDropdown {
          position: relative;
        }

        .accountIcon {
          width: 40px;
          border-radius: 50%;
        }

        .toggleDropdown {
          padding-left: 15px;
        }

        .accountIcon:hover {
          cursor: pointer;
        }

        .dropdown {
          position: absolute;
          right: 0;
          top: 62px;
          z-index: 99;
          background: rgb(0, 31, 31);
          cursor: pointer;
        }

        .dropdown div {
          padding: 10px 20px;
          text-align: center;
          cursor: pointer;
        }

        .dropdown div .sublink:hover {
          color: green !important;
        }

        .dropdown div .sublink:active {
          color: yellow !important;
        }

        .dropdown div .sublink {
          text-decoration: none;
          color: #6e8182 !important;
          font-size: 19px;
        }

        #focus {
          background: yellow;
          border-radius: 8px;
          pointer-events: none;
          color: black;
        }
      `}</style>
    </nav>
  );
}

export default Navbar