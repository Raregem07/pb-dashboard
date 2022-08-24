/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import logoIcon from '../common/images/pb-logo.png';

function Navbar() {

  const [isDropdown, setIsDropdown] = useState(false);
  
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
          <Link className="navlink" to="/">
            DASHBOARD
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/faq">
            FAQ
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/tutorial">
            TRAINING
          </Link>
        </div>
        <div>
          <Link className="navlink" to="/tools">
            VIP BONUS
          </Link>
        </div>
        <div
          className="toggleDropdown"
          onClick={(e) => setIsDropdown(!isDropdown)}
        >
          <img
            src="/account_icon.jpg"
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
          font-weight: 500;
          color: #6e8182;
          padding: 11px;
        }

        .navlink:focus {
          color: black;
          background: yellow;
          border-radius: 8px;
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
      `}</style>
    </nav>
  );
}

export default Navbar