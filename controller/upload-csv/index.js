import fs from "fs";
import csvParser from "csv-parser";
import Student from "../../models/student.js";

const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a CSV file!" });
    }
    console.log(req.file, "req.file");
    let students = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (row) => {
        students.push({
          name: row.name,
          email: row.email,
          phone: row.phone,
          address: row.address,
          city: row.city,
          state: row.state,
          country: row.country,
          zip: row.zip,
          gender: row.gender.toLowerCase(),
          age: parseInt(row.age),
        });
      })
      .on("end", async () => {
        await Student.insertMany(students);
        res
          .status(200)
          .json({ message: "CSV file imported successfully", data: students });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing CSV file", error: error.message });
  }
};

export { importCSV };
