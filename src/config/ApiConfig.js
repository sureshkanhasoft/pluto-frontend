const ApiConfig = {
    // API_URL: process.env.REACT_APP_PLUTO_FRONT_API_URL,
    API_URL: (window.location.hostname === "localhost")? process.env.REACT_APP_PLUTO_FRONT_API_LOCAL_URL : process.env.REACT_APP_PLUTO_FRONT_API_URL,
};
  
export default ApiConfig;