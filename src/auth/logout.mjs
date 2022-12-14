const logout = (request, response) => {
    return response
      .clearCookie("access_token")
      .status(200)
      .redirect('/');
  };
  
  export default logout