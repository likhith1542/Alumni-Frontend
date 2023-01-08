import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Search.css";
import Pagination from "./../components/Pagination/Pagination";

function Search() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [dept, setDept] = useState("");
  const [prgrm, setPrgrm] = useState("");
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    var fetchData = {
      name: name,
      year: year,
      dept: dept,
      prgrm: prgrm,
      page: page,
      cid: auth.user.id,
    };

    axios
      .post("https://backend-yws9.onrender.com/api/users/getUsers", fetchData)
      .then((result) => {
        setData(result.data.users);
        setTotal(result.data.total);
        setPage(result.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [name, year, dept, page, prgrm]);

  return (
    <div className="search">
      <div className="search-row">
        <div className="input-field">
          <input
            type="text"
            id="sname"
            style={{ width: "20rem" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="sname">Name</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            id="year"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          <label htmlFor="year">Year</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            id="department"
            onChange={(e) => {
              setDept(e.target.value);
            }}
          />
          <label htmlFor="department">Department</label>
        </div>

        <div className="input-field">
          <input
            type="text"
            id="program"
            onChange={(e) => {
              setPrgrm(e.target.value);
            }}
          />
          <label htmlFor="program">Program</label>
        </div>
      </div>

      <Pagination
        page={page}
        total={total ? total : 0}
        setPage={(page) => setPage(page)}
      />

      <div className="search-data">
        {data &&
          data.map((user) =>
            auth.user.id !== user.id ? (
              <a href={`profile/${user.id}`}>
                <div
                  className="memberdata"
                  style={{ display: "flex", alignItems: "center" }}
                  id={user.id}
                >
                  <img
                    src={user.avatar}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    alt=""
                  />
                  <div>
                    <p className="postid">{user.name}</p>
                    <p className="postdate">
                      {user.dept} - {user.prgrm} - {user.year}
                    </p>
                  </div>
                </div>
              </a>
            ) : (
              <></>
            )
          )}
      </div>
    </div>
  );
}

export default Search;
