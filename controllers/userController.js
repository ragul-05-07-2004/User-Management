import pool from "../db/db.js";
import bcrypt from "bcryptjs";

 // Register

export const register = async (req, res) => {

  try {

    const { first_name, last_name, email, phone, dob, password } = req.body;

    const imageBuffer = req.file ? req.file.buffer : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users
      (first_name,last_name,email,phone,dob,password,image)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        first_name,
        last_name,
        email,
        phone,
        dob,
        hashedPassword,
        imageBuffer
      ]
    );

    res.json({ message: "User registered successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Registration failed" });

  }

};


// Login

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!user) {
  return res.status(404).json({
    message: "User not found"
  });
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    message: "Invalid password"
  });
}

    res.json({ message: "Login successful" });

  }catch (error) {
  console.error(error);

  res.status(500).json({
    message: "Something went wrong",
    error: error.message
  });
}

};

// Profile
export const getProfile = async (req, res) => {

  try {

    const { email } = req.params;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (user.image) {
      user.image = user.image.toString("base64");
    }

    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }

};


// Update profile
export const updateProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const { first_name, last_name, phone, dob } = req.body;

    await pool.query(
      `UPDATE users
       SET first_name=$1,
           last_name=$2,
           phone=$3,
           dob=$4
       WHERE id=$5`,
      [first_name, last_name, phone, dob, id]
    );

    res.json({ message: "Profile updated successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Update failed" });

  }

};


// Update profile

export const updateImage = async (req, res) => {

  try {

    const { id } = req.params;

    const imageBuffer = req.file.buffer;

    await pool.query(
      "UPDATE users SET image=$1 WHERE id=$2",
      [imageBuffer, id]
    );

    res.json({ message: "Image updated successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Image update failed" });

  }

};