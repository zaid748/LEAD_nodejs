const notesCtrl = {};

const Note = require('../models/Note');
const app = require('../server');

notesCtrl.renderNoteForm = (req, res) =>{
    const user = req.token;
    res.render('notes/new-note', {user});
};

notesCtrl.createNewNote = async (req, res) =>{
    const { title, description} = req.body;
    const newNote = new Note({title, description});
    newNote.user = req.user;
    await newNote.save();
    req.flash('success_msg', 'Note Added Succssfully');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async(req, res)=>{
    const user = req.token;
    const notes = await Note.find({user: req.user}).sort({createAt: 'desc'});
    const description = [];
    notes.forEach(notas => {
        description.push(notas.description);
    });
    console.log(description);
    console.log( 'hola animo');
    res.render('notes/all-notes', {notes, user, description});
};

notesCtrl.renderEditForm = async(req, res) =>{
    const user = req.token;
    const note = await Note.findById(req.params.id);
    if(note.user != req.user){
        req.flash('error', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note, user });
};
notesCtrl.updateNote = async(req, res) =>{
    const { title, description } = req.body;
    const note = await Note.findById(req.params.id);
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    if(note.user != req.user){
        req.flash('error', 'Not Authorized');
        return res.redirect('/notes');
    }
    req.flash('success_msg', 'Note Updated Succssfully');
    res.redirect('/notes');
};
notesCtrl.deleteNotes = async(req, res) =>{
    const note = await Note.findById(req.params.id);
    if(note.user != req.user){
        req.flash('error', 'Not Authorized');
        return res.redirect('/notes');
    }else{
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Note Deleted Succssfully');
        res.redirect('/notes');
    }
}
module.exports = notesCtrl;