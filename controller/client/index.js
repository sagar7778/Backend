import cliendata from "../../models/client.js";

const createClient = async (req, res) => {
  try {
    let client = new cliendata(req.body);
    const newClient = new cliendata(client);
    newClient.save();
    res.status(200).json({
      message: "Client created successfully",
      data: newClient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not created",
      error: error,
    });
  }
};
const getClient = async (req, res) => {
  try {
    const client = await cliendata.find();
    res.status(200).json({
      message: "Client fetched successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not fetched",
      error: error,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await cliendata.findById(req.params.id);
    res.status(200).json({
      message: "Client fetched successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not fetched",
      error: error,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await cliendata.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not updated",
      error: error,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await cliendata.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Client deleted successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not deleted",
      error: error,
    });
  }
};

export { createClient, getClient, getClientById, updateClient, deleteClient };
