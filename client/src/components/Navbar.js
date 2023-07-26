import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const count = useSelector((state) => state.counter.value);
  const RenderMenu = () => {
    if (count) {
      return (
        <>
          {/* <li>
            <a href="/gallery">Gallery</a>
          </li> */}
          <li>
            <a href="/logout">Logout</a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Registration</a>
          </li>
        </>
      );
    }
  };

  useEffect(() => {
    RenderMenu();
  }, []);

  return (
    <>
      <nav className="navbar navbar-light bg-light sticky-top">
        <div className="container text-info">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontSize: "2rem", fontWeight: "bolder" }}
          >
            Prince
          </a>
          <div className="d-flex input-group w-auto">
            <ul className="menu float-md-end">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">Profile</a>
              </li>
              <li>
                <a href="contact">Contact us</a>
              </li>
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>

      {/* <div id="header" className="sticky-top">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1 className="title">
                <a href="/">Prince</a>
              </h1>
            </div>
            <div className="col-md-8">
              <ul className="menu float-md-end">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="contact">Contact us</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Registration</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      {/* <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
              Prince
            </a>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="contact">Contact us</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Registration</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
