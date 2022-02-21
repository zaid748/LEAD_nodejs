const express = require('express');
const router = express.Router();

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNotes } =  require('../controllers/notes.controller');
const {isAuthenticated} = require('../helpers/auth');
//new note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);
//get all note
router.get('/notes', isAuthenticated, renderNotes);
//update note
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);

router.put('/notes/edit/:id', isAuthenticated, updateNote);

//delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNotes);
module.exports = router;