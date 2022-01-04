import React from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(url, { cancelToken: source.token })
      .then(response => {
        //checking for multiple responses for more flexibility 
        //with the url we send in.
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message);
          return
        }
        setError(error);
        setLoading(false);
      })
    return () => {
      source.cancel();
    }
  }, [url])

  return { data, loading, error }

}

export default useFetch
