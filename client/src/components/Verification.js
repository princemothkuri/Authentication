import React, { useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import OTPImage from "../images/VerifyIMG2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {
  const navigate = useNavigate();
  const [uotp, setUotp] = useState({
    otp: "",
  });
  const [loadingModal, setLoadingMoadal] = useState(false);

  const otpHandler = (e) => {
    setUotp({ ...uotp, [e.target.name]: e.target.value });
  };

  const postOtp = async (e) => {
    e.preventDefault();
    const { otp } = uotp;

    if (!otp) {
      toast.warning("Enter OTP!");
    } else if (!(otp.length === 4)) {
      toast.warning("Enter 4 digit OTP!");
    } else {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/verify", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
          }),
        });

        const data = await res.json();
        console.log(data.error);
        console.log(data.message);
        if (data.error === "Incorrect OTP!") {
          // alert("Incorrect otp");
          toast.warning("Incorrect otp!");
          console.log("Incorrect otp!");
          setLoadingMoadal(false);
        } else {
          // alert("Successful!");
          toast.success("OTP Verified!");
          console.log("OTP Verified!");

          setTimeout(() => {
            toast.success("Successfully Registered!");
            setTimeout(() => {
              setLoadingMoadal(false);
              navigate("/login");
            }, 2000);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      id="verify"
      className="d-flex align-items-center justify-content-center text-center"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={OTPImage} alt="image" width="500px" />
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <form className="otp">
              <h2>Email Verification</h2>
              <h4 className=" text-center" style={{ color: "gray" }}>
                Enter the code we just send on your email
              </h4>

              <input
                className="otp-In form-control"
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={otpHandler}
              />
              <input
                className="btn"
                type="button"
                onClick={postOtp}
                value="verify"
              />
              {/* --------------modal-Loading--------------- */}
              {loadingModal ? (
                <>
                  <div className="modal-wrapper "></div>
                  <div className="modal-container-loading">
                    <div className="circleDots">
                      <ReactLoading
                        type="spinningBubbles"
                        color="#0000FF"
                        height={80}
                        width={80}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* --------------modal-Loading END--------------- */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Verification;
