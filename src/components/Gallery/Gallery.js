import React, { useEffect, useState } from "react";
import "./Gallery.css";
import axios from "axios";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/galleries/getgallery")
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setGalleryImages(result.data.slice(0, 10));
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
    <div className="gallery">
      {galleryImages.map((img) =>
        img.type === "photo" ? <img src={img.url} alt={img.name} /> : null
      )}
    </div>
  );
}

export default Gallery;
