import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  age: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);
export default Student; // ✅ This is correct
