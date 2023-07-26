import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Modal from "./Modal";
import FileDownload from "js-file-download";
// import prince from "../images/prince.jpg";

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const closePicModal = () => setShowPicModal(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userVerification = async () => {
    try {
      const res = await axios.get("/getdata");
      setUserData(res.data.images);
      setLoading(false);
      console.log(userData);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userVerification();
  }, []);

  const onSubmitDownload = (e) => {
    // e.preventDefault();
    console.log(e);
    // axios
    //   .post("/download", { filename: "MyFile.pdf" })
    //   .then((res) => res.data)
    //   .then((res) =>
    //     this.setState({
    //       msg: res,
    //     })
    //   );
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
      <div className="gallery">
        <div className="container h-auto d-flex flex-column gap-4 mt-5 ">
          <div className="add row p-2 ">
            <h1 className="col-4">Photos</h1>
            <div className="col-8 d-flex justify-content-end align-items-center">
              <button className="btnInfo" onClick={() => setShowModal(true)}>
                Add photos
              </button>
              {showModal && <Modal closeModal={closeModal} />}
            </div>
          </div>
          <div
            className="row images d-flex align-items-center justify-content-start gap-3"
            // style={{ marginLeft: "10px" }}
          >
            {!show ? (
              <h1 align="center">No photos</h1>
            ) : (
              userData.map((item, index) => {
                const { _id, pic, date } = item;
                return (
                  <>
                    <div
                      class="card col-md-3"
                      style={{ height: "300px" }}
                      key={index}
                    >
                      <img
                        src={pic}
                        alt="image"
                        class="card-img-top"
                        height="258px"
                      />
                      <div className="d-flex flex-row">
                        <button className="btn-delete w-50">Delete</button>
                        <button
                          class="btnPrimary w-50"
                          onClick={onSubmitDownload()}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
