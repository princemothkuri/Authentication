import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Home = () => {
  // const myState = useSelector((state) => state.navbarHide);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const userVerification = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setLoading(false);
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      setShow(true);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = "Home";
    // if (myState) {
    //   dispatch(unHide());
    // } else {
    //   dispatch(hide());
    // }
    userVerification();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="home-page" style={{ minHeight: "90.4vh" }}>
        <div className="blur text-center">
          <h1>
            Welcome!
            {show ? (
              " " + userData.name
            ) : (
              <p>
                To use this Application, pls <a href="/login">login</a>
              </p>
            )}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
