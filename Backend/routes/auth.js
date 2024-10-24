const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Leoisagoodb$oy'; // Secret key for signing JWTs

/**
 * ROUTE-1: Create a new User
 * METHOD: POST "api/auth/createuser"
 * Access: Public (No login required)
 * Description: This route creates a new user account after validating the input data.
 */
router.post(
  '/createuser',
  [
    // Input validation rules using express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    // Validate input data and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: 'User with this email already exists' });
      }

      // Generate a salt and hash the password for security
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user with the provided details
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Prepare the payload for the JWT token
      const data = {
        user: {
          id: user.id, // Store the user ID in the token
        },
      };

      // Generate a JWT token
      const authToken = jwt.sign(data, JWT_SECRET);

      // Send the generated token as a response
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error'); // Handle server errors gracefully
    }
  }
);

/**
 * ROUTE-2: Authenticate a User (Login)
 * METHOD: POST "api/auth/login"
 * Access: Public (No login required)
 * Description: This route logs in an existing user by validating credentials and returns a JWT.
 */
router.post(
  '/login',
  [
    // Input validation for email and password
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    // Validate input data and handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if a user with the provided email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success, error: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ success, error: 'Invalid credentials' });
      }

      // Prepare the payload for the JWT token
      const data = {
        user: {
          id: user.id, // Store the user ID in the token
        },
      };

      // Generate a JWT token
      const authToken = jwt.sign(data, JWT_SECRET);

      // Send the token as a response
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error'); // Handle server errors gracefully
    }
  }
);

/**
 * ROUTE-3: Get Logged-in User's Details
 * METHOD: POST "api/auth/getuser"
 * Access: Private (Login required)
 * Description: This route returns the details of the logged-in user by verifying the JWT token.
 */
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    // Extract user ID from the JWT token
    const userId = req.user.id;

    // Fetch the user details from the database excluding the password field
    const user = await User.findById(userId).select('-password');

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send the user details as a response
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error'); // Handle server errors gracefully
  }
});

// Export the router to be used in other files
module.exports = router;
