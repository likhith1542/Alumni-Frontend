import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function FetchHook(page, postChanged) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(
        `https://backend-yws9.onrender.com/api/posts/getsomePosts/${page}`
      );
      await setList((prev) => [...new Set([...prev, ...res.data])]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { loading, error, list };
}

export default FetchHook;
