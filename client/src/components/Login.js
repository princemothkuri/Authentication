import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../reducer/useReducer";

const Login = () => {
  const dispatch = useDispatch();
  const BackgroundImage =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp";

  const navigate = useNavigate();

  const [loadingModal, setLoadingMoadal] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
    const { email, password } = user;

    if (!email && !password) {
      toast.warning("Plz enter your email-id and password!");
    } else if (!email) {
      toast.warning("Enter your email!");
    } else if (!password) {
      toast.warning("Enter your password!");
    } else {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.error === "Invalid email or password") {
          setLoadingMoadal(false);
          toast.warning("Invalid email or password!");
          // window.alert("Invalid email or password");
          console.log("Invalid email or password");
        } else {
          dispatch(increment());
          setLoadingMoadal(false);
          toast.success("Login Successful!");
          // window.alert("Login Successful!");
          console.log("Login Successful!");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    userVerification();
    document.title = "Login";
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#f4f5f7",
          minHeight: "90vh",
        }}
      >
        <div className="d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 mt-5 p-5">
            <div className="card" style={{ borderRadius: 15 + "px" }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Login</h2>

                <form method="POST">
                  <div className="d-flex flex-row gap-2 align-items-center mb-4">
                    <PersonIcon />
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        name="email"
                        onChange={inputHandler}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row gap-2 align-items-center mb-4">
                    <LockIcon />
                    <div className="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        placeholder="Enter Password"
                        name="password"
                        onChange={inputHandler}
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      onClick={PostData}
                    >
                      Login
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

                  <p className="text-center text-muted mt-5 mb-0">
                    Don't have an account?{" "}
                    <a href="/signup" className="fw-bold text-body">
                      <u>SignUp</u>
                    </a>
                  </p>
                </form>
              </div>
            </div>
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
    </>
  );
};

export default Login;
