import cliendata from "../../models/client.js";

const createClient = async (req, res) => {
  try {
    let client = new cliendata(req.body);
    await client.save();
    res.status(200).json({
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not created",
      error: error.message,
    });
  }
};

const getClient = async (req, res) => {
  try {
    let { page, limit, search, gender, sortBy, sortOrder } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      if (/^\d+$/.test(search)) {
        // If search is a number, match phone exactly
        query = { phone: search };
      } else {
        query = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        };
      }
    }

    if (gender && ["male", "female"].includes(gender.toLowerCase())) {
      query.gender = gender.toLowerCase();
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const clients = await cliendata
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const totalClients = await cliendata.countDocuments(query);
    res.status(200).json({
      message: "Clients fetched successfully",
      data: clients,
      totalClients: totalClients,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "Clients not fetched",
      error: error.message,
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
      error: error.message,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await cliendata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      message: "Client not updated",
      error: error.message,
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
      error: error.message,
    });
  }
};

export { createClient, getClient, getClientById, updateClient, deleteClient };
