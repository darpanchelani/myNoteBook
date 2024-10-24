const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// ROUTE-1: Get All Notes for a User Using: GET "api/notes/fetchallnotes". Login required
// This route fetches all the notes belonging to the logged-in user.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Fetch all notes where 'user' matches the logged-in user's ID.
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); // Send the notes as a JSON response.
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error'); // Handle server errors.
  }
});

// ROUTE-2: Add a New Note Using: POST "api/notes/addnote". Login required
// This route adds a new note for the logged-in user.
router.post(
  '/addnote',
  fetchuser,
  [
    // Validate the input fields (title and description).
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If validation errors exist, return a 400 status with the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note object with the provided data and the logged-in user's ID.
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save the note to the database.
      const savedNote = await note.save();

      // Respond with the saved note as JSON.
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error'); // Handle server errors.
    }
  }
);

// ROUTE-3: Update an Existing Note Using: PUT "api/notes/updatenote/:id". Login required
// This route updates a specific note belonging to the logged-in user.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a new note object with the updated fields.
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // Find the note to be updated by its ID.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Note not found'); // If the note doesn't exist, return 404.
    }

    // Ensure that the logged-in user owns the note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed'); // If not, return 401 Unauthorized.
    }

    // Update the note and return the updated version.
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    // Send the updated note as the response.
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error'); // Handle server errors.
  }
});

// ROUTE-4: Delete an Existing Note Using: DELETE "api/notes/deletenote/:id". Login required
// This route deletes a specific note belonging to the logged-in user.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted by its ID.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Note not found'); // If the note doesn't exist, return 404.
    }

    // Ensure that the logged-in user owns the note.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed'); // If not, return 401 Unauthorized.
    }

    // Delete the note from the database.
    await Note.findByIdAndDelete(req.params.id);

    // Respond with a success message and the deleted note.
    res.json({ Success: 'Note has been deleted', note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error'); // Handle server errors.
  }
});

module.exports = router;
