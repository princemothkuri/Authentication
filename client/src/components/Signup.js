import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useSelector } from "react-redux";
// import "bootstrap/dist/css/bootstrap.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    cpassword: "",
    imageFile: "",
  });
  const [loadingModal, setLoadingMoadal] = useState(false);
  const [check, setCheck] = useState(false);

  const InputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const imageInputHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({ ...user, imageFile: base64 });
  };

  const checkHandler = () => {
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  // ------------user Verification---------------------
  const count = useSelector((state) => state.counter.value);
  const userVerification = () => {
    if (count) {
      navigate("/");
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, tel, email, password, cpassword, imageFile } = user;

    if (!name || !tel || !email || !password || !cpassword || !imageFile) {
      // alert("please fill the details!");
      toast.warning("Plz fill all the details!");
    } else if (password !== cpassword) {
      // alert("Both passwords are not same!");
      toast.warning("Both passwords are not same!");
    } else if (!check) {
      // alert("please agree the terms and conditions to register!");
      toast.warning("please agree the terms and conditions to register!");
    } else {
      setLoadingMoadal(true);
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          tel,
          email,
          password,
          cpassword,
          imageFile,
        }),
      });

      const data = await res.json();
      // console.log(data);
      // console.log(data.status);
      if (data.error === "Email already exists!") {
        toast.success(`${name} you already registered!`);
        console.log("Email already exists!");
        setTimeout(() => {
          setLoadingMoadal(false);
          navigate("/login");
        }, 3000);
      } else if (data.message === "OTP sent!") {
        toast.success("Successfully OTP sent to your Email!");
        // window.alert("Registration successful!");
        console.log("Successfully OTP sent to your Email!");
        setTimeout(() => {
          setLoadingMoadal(false);
          navigate("/verification");
        }, 2000);
      } else {
        toast.warning("Invalid Registration!");
        // window.alert("Invalid Registration");
        console.log("Invalid Registration");
        setLoadingMoadal(false);
      }
    }
  };

  useEffect(() => {
    userVerification();
    document.title = "SignUp";
  }, []);

  return (
    <>
      <section
        className="h-auto pt-3 pb-3"
        style={{ backgroundColor: "#eee", minHeight: "90.4vh" }}
      >
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11 mt-3 mb-0">
              <div
                className="card text-black"
                style={{ borderRadius: 25 + "px" }}
              >
                <div
                  className="card-body"
                  style={{ paddingLeft: "40px", paddingRight: "40px" }}
                >
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={PostData}>
                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <PersonIcon />
                          <div className="form-outline flex-fill flex-row mb-0">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Your Name"
                              onChange={InputHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <PhoneIcon />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              className="form-control"
                              name="tel"
                              placeholder="Your Number"
                              onChange={InputHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <MailIcon />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Your Email"
                              onChange={InputHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <LockIcon />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              onChange={InputHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <VpnKeyIcon />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              className="form-control"
                              name="cpassword"
                              placeholder="Repeat your password"
                              onChange={InputHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-2 align-items-center mb-4">
                          <PermMediaIcon />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              id="imageFile"
                              className="form-control"
                              name="imageFile"
                              accept=".jpg, .png, .jpeg"
                              onChange={imageInputHandler}
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            checked={check}
                            onClick={checkHandler}
                            id="form2Example3c"
                          />
                          <label
                            htmlFor="form2Example3c"
                            className="form-check-label"
                          >
                            I agree all statements in{" "}
                            <a href="/terms">Terms and Conditions</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-4 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
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
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex flex-column align-items-center justify-content-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                      <p className="text-center text-muted mt-2 mb-0">
                        Have already an account?{" "}
                        <a href="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default Signup;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}
