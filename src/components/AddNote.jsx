import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    props.showAlert(' Note Added Successfully', 'success');
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container my-3'>
        <h2>Add a Note</h2>
        <form className='container my-3'>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              aria-describedby='emailHelp'
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='tag'>Tag</label>
            <input
              type='text'
              className='form-control'
              id='tag'
              name='tag'
              onChange={onChange}
              value={note.tag}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type='submit'
            className='btn btn-primary my-2'
            onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
