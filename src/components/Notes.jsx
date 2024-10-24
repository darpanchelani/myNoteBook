import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: 'default' });
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert(' Note Updated Successfully', 'success');
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        className='btn btn-primary d-none'
        type='button'
        ref={ref}
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'>
        Launch demo modal
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Edit Note
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form className='container my-3'>
                <div className='form-group'>
                  <label htmlFor='etitle'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    aria-describedby='emailHelp'
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='edescription'>Description</label>
                  <input
                    type='text'
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='etag'>Tag</label>
                  <input
                    type='etext'
                    className='form-control'
                    id='etag'
                    name='etag'
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                ref={refClose}
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type='button'
                className='btn btn-primary'>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container mx-1'>{notes.length === 0 && 'No notes to display'}</div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
