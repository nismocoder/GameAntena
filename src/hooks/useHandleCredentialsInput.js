import * as React from "react";

const useHandleCredentialsInput = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: ""
  });

  const handleOnChange = (event) => {
    const input = event.target.name;
    const { value } = event.target;

    setCredentials((state) => {
      return {
        ...state,
        [input]: value
      };
    });
  };

  return {
    credentials,
    setCredentials,
    handleOnChange
  };
};

export default useHandleCredentialsInput;
