import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);

  const [imageBold, setImageBold] = useState(true);
  const [videoBold, setVideoBold] = useState(false);
  const [deletedId, setDeletedId] = useState([]);
  const auth = useSelector((state) => state.auth);

  const imageSelect = () => {
    setImageBold(!imageBold);
    setVideoBold(!videoBold);
  };

  const videoSelect = () => {
    setVideoBold(!videoBold);
    setImageBold(!imageBold);
  };

  const deleteGalleryItem = (e, citem) => {
    e.preventDefault();
    setDeletedId([...deletedId, citem]);
    axios
      .delete(`http://localhost:5000/api/galleries/deletegallery/${citem}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/galleries/getgallery")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setGalleryImages(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  return (
    <div className="page_gallery">
      <p className="galleryheading">Gallery</p>
      <div className="gallerybox">
        <p
          className="haedingselector"
          style={{
            fontWeight: imageBold ? "bold" : "normal",
            fontSize: imageBold ? "large" : "normal",
          }}
          onClick={imageSelect}
        >
          Images
        </p>
        <p
          className="haedingselector"
          style={{
            fontWeight: videoBold ? "bold" : "normal",
            fontSize: videoBold ? "large" : "normal",
          }}
          onClick={videoSelect}
        >
          Videos
        </p>
      </div>
      <div className="gallerybox">
        {galleryImages.map((img) =>
          imageBold ? (
            img.type === "photo" && !deletedId.includes(img._id) ? (
              <div
                key={img._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img className="pageimage" src={img.url} alt={img.name} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginRight: "5px" }}>{img.name}</p>
                  {auth.user.isA === "Yes" ? (
                    <AiFillDelete
                      size={"20px"}
                      color="red"
                      onClick={(e) => {
                        deleteGalleryItem(e, img._id);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : null
          ) : img.type === "video" && !deletedId.includes(img._id) ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                controls
                width="250"
                height="250"
                // poster="https://vitapalumni.s3.ap-south-1.amazonaws.com/play.png"
              >
                <source src={img.url} type="video/mp4" />
              </video>
              <div>
                <p>{img.name}</p>
                {auth.user.isA === "Yes" ? (
                  <AiFillDelete
                    size={"20px"}
                    color="red"
                    onClick={(e) => {
                      deleteGalleryItem(e, img._id);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default Gallery;
