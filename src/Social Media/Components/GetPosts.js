import React, { useCallback, useEffect, useRef } from "react";
import "./GetPosts.css";
import axios from "axios";
import { useState } from "react";
import Post from "./Post";
import FetchHook from "./../../hooks/fetchHook";

function GetPosts({ postChanged, setPostChanged }) {
  const [names, setNames] = useState([]);
  const [ppics, setPpics] = useState([]);
  const [page, setPage] = useState(1);
  const { loading, error, list } = FetchHook(page, postChanged);

  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const getNames = () => {
    const promises = [];
    list.forEach((post) => {
      promises.push(
        axios.get(
          `https://backend-yws9.onrender.com/api/users/getUser/${post.id}`
        )
      );
    });

    Promise.all(promises).then((responses) => {
      const namesfromapi = responses.map((response) => response.data.name);
      const picsfromapi = responses.map((response) => response.data.avatar);
      setNames(namesfromapi);
      setPpics(picsfromapi);
    });
  };

  useEffect(() => {
    getNames();
    // eslint-disable-next-line
  }, [list]);

  return (
    <div>
      <div className="getposts">
        {list.map((post, i) => {
          return names[i] !== undefined ? (
            <Post key={post._id} postt={post} name={names[i]} pic={ppics[i]} />
          ) : (
            ""
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && <p className="username usernamespan">Loading...</p>}
        {error && (
          <p className="username usernamespan">Error Fetching the Posts</p>
        )}
      </div>
      <div ref={loader} />
    </div>
  );
}

export default GetPosts;
