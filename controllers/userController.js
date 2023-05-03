const getAllUsers = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  };
  
  const getUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  };
  
  const createUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  };
  
  const updateUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  };
  
  const deleteUser = (req, res) => {
    try{

      res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
      });
    }
    catch(error){
      res.status(404).json({
        status: "fail",
        message: "Invalid data sent!",
      });
    }
  };

  module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    };