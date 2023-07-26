import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Contact = () => {
  const count = useSelector((state) => state.counter.value);
  const [loadingModal, setLoadingMoadal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    tel: "",
    message: "",
  });

  const UserContactData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        tel: data.tel,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "Contact Us";
    UserContactData();
    // if (userData) {
    //   dispatch(unHide());
    //   dispatch(hide());
    // }
  }, []);

  const InputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    const { name, email, tel, message } = userData;
    // let path = "";

    if (count) {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            tel,
            message,
          }),
        });

        const data = await res.json();
        // console.log(data.status);
        if (data.status === 422) {
          toast.warning("Message not Sent!");
          setLoadingMoadal(false);
          // window.alert("Message not Sent!");
          console.log("Message not Sent!");
        } else {
          toast.success("Message Sent!");
          setLoadingMoadal(false);
          // window.alert("Message Sent!");
          console.log("Message Sent!");
          setUserData({ ...userData, message: "" });
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        setLoadingMoadal(true);
        const res = await fetch("/nucontact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            tel,
            message,
          }),
        });

        const data = await res.json();
        // console.log(data.status);
        if (data.message === "Server error!") {
          toast.warning("Message not Sent!");
          setLoadingMoadal(false);
          // window.alert("Message not Sent!");
          console.log("Message not Sent!");
        } else {
          toast.success("Message Sent!");
          setLoadingMoadal(false);
          // window.alert("Message Sent!");
          console.log("Message Sent!");
          setUserData({ ...userData, message: "" });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#8fc4b7" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                  className="w-100"
                  style={{
                    borderTopLeftRadius: 0.3 + "rem",
                    borderTopRightRadius: 0.3 + "rem",
                  }}
                  alt="Sample photo"
                />
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Get In Touch With Us
                  </h3>

                  <form
                    method="POST"
                    className="px-md-3 row justify-content-center border border-1 rounded-3 p-3"
                  >
                    <div className="d-flex flex-row gap-2 align-items-center justify-content-center mb-4">
                      <PersonIcon />

                      <div className="form-outline w-75">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={userData.name}
                          onChange={InputHandler}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row gap-2 align-items-center justify-content-center mb-4">
                      <MailIcon />
                      <div className="form-outlineflex w-75 ">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={userData.email}
                          onChange={InputHandler}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row gap-2 align-items-center justify-content-center mb-4">
                      <PhoneIcon />
                      <div className="form-outlineflex w-75 ">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          name="tel"
                          value={userData.tel}
                          onChange={InputHandler}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row gap-2 align-items-center justify-content-center mb-4">
                      <MessageIcon />
                      <div className="form-outlineflex w-75 ">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                            name="message"
                            value={userData.message}
                            onChange={InputHandler}
                          ></textarea>
                          <label for="floatingTextarea">Message</label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1 col-5"
                      onClick={SubmitData}
                    >
                      Send
                    </button>
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
      </section>
    </>
  );
};

export default Contact;
