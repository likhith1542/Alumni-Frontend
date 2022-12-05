import React from "react";
import MainCarousel from "../Carousel/MainCarousel";
import Events from "../Events/Events";
import "./Landing.css";
import Jobs from "./../Jobs/Jobs";
import NewsRoom from "./../News/NewsRoom";
import Gallery from "./../Gallery/Gallery";

function Landing() {
  return (
    <div
      className="Landing"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "90px",
      }}
    >
      <MainCarousel />
      <div className="container">
        <p className="divheading">Chancellors Message</p>
        <div className="cmsgcontainer">
          <div className="Chancellor-Message">
            <p>
              The VIT Alumni Association has been envisaged to foster a closely
              knit network bridging the gap between young budding VITians and
              the accomplished Alumni. Our Alumni have made us proud time and
              again by achieving laurels round the globe and we wish to showcase
              the same to our entire VIT family.
            </p>
            <video src="" />

            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5W7qdSss7Gk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          
        </div>
        <div className="spacer"></div>
        <div className="divheading">Events</div>

        <div className="Events">
          <img
            className="lpageimg"
            src="https://vitapalumni.s3.ap-south-1.amazonaws.com/event.png"
            alt="1"
          />
          <Events />
        </div>
        <div className="spacer"></div>

        <div className="divheading">News</div>

        <div className="News-Room">
          <NewsRoom />
          <img
            className="lpageimg"
            src="https://vitapalumni.s3.ap-south-1.amazonaws.com/news.png"
            alt="2"
          />
        </div>
        <div className="spacer"></div>

        <div className="divheading">Jobs</div>

        <div className="Jobs">
          <img
            className="lpageimg"
            src="https://vitapalumni.s3.ap-south-1.amazonaws.com/job.png"
            alt="3"
          />
          <Jobs />
        </div>
      </div>
      <div className="divheading">Gallery</div>

      <div className="galleyContainer">
        <Gallery />
      </div>

      {/* <div className="divheading">Latest Members</div>

      <div className="galleyContainer">
        <Gallery />
      </div> */}
    </div>
  );
}

export default Landing;
