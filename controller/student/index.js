import student from "../../models/student.js";
import Demo from "../../models/user.js";
import { sendMail } from "../../utils/mailer.js";

const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      zip,
      gender,
      age,
    } = req.body;
    const userId = req.user.id;
    console.log(userId, "userId");

    // Create new student with full details
    const Student = new student({
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      zip,
      gender,
      age,
    });
    await Student.save();

    // Fetch User who created the student
    const user = await Demo.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user, "user");
    // Send confirmation email
    const emailSent = await sendMail(
      user.email,
      "Student Created Successfully",
      `Hello ${user.name},\n\nA new student named ${name} has been created successfully.\n\nBest Regards,\nYour Team`
    );
    console.log(emailSent, "emailSent");

    res.status(201).json({
      message: "Student created successfully",
      data: Student,
      emailSent: emailSent ? "Success" : "Failed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};

const getStudent = async (req, res) => {
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
    const students = await student
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);
    const totalStudents = await student.countDocuments(query);
    res.status(200).json({
      message: "Students fetched successfully",
      data: students,
      totalStudents: totalStudents,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "Students not fetched",
      error: error.message,
    });
  }
};
const getStudentById = async (req, res) => {
  try {
    const Student = await student.findById(req.params.id);
    res.status(200).json({
      message: "Student fetched successfully",
      data: Student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student not fetched",
      error: error.message,
    });
  }
};
const updateStudent = async (req, res) => {
  try {
    const Student = await student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Student updated successfully",
      data: Student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student not updated",
      error: error.message,
    });
  }
};
const deleteStudent = async (req, res) => {
  try {
    await student.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Student not deleted",
      error: error.message,
    });
  }
};
export {
  createStudent,
  getStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
