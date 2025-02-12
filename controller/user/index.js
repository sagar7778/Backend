import Demo from "../../models/user.js";

export const createUSer = async (req, res) => {
  try {
    let user = new Demo(req.body);
    const newUser = new Demo(user);
    newUser.save();
    res.status(200).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not created",
      error: error,
    });
  }
};

export const getUSer = async (req, res) => {
  try {
    const user = await Demo.find();
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not fetched",
      error: error,
    });
  }
};

export const getUSerById = async (req, res) => {
  try {
    const user = await Demo.findById(req.params.id);
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not fetched",
      error: error,
    });
  }
};

export const updateUSer = async (req, res) => {
  try {
    const user = await Demo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not updated",
      error: error,
    });
  }
};
export const deleteUSer = async (req, res) => {
  try {
    const user = await Demo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not deleted",
      error: error,
    });
  }
};
