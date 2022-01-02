import React from 'react';

const useHandleCredentialsInput = () => {

  const [credentials, setCredentials] = React.useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    if (input === 'email')
      setCredentials((state) => {
        return {
          ...state,
          email: value
        }
      })

    if (input === 'password')
      setCredentials((state) => {
        return {
          ...state,
          password: value
        }
      })
  }

  return {
    credentials,
    setCredentials,
    handleOnChange
  }
}

export default useHandleCredentialsInput
