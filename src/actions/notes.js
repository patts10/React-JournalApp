import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNeNote = () => {

  return async(dispatch, getState) => {

    const { uid } = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    };

    const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

    dispatch( activeNotes( doc.id, newNote ))
  }
}

  export const activeNotes = ( id, note ) => ({

    type: types.notesActive,
    payload: {
      id,
      ...note
    }
  });

  export const startLoadingNotes = ( uid ) => {
    return async(dispatch) => {
      const notes = await loadNotes( uid );
      dispatch( setNotes(notes) );
    }
  }

  export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
  });

  export const startSaveNote = ( note ) => {
    
    return async(dispatch, getState) => {

      const { uid } = getState().auth;

      if ( !note.url ) {
        delete note.url;
      }

      const noteToFirestore = { ...note };
      delete noteToFirestore.id;

      await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

      dispatch( refreshNotes( note.id, note ));
      Swal.fire('Saved', 'Your note has been saved', 'success');
    }
    
  }

  export const refreshNotes = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
      id,
      note
    }
  });

  export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
      const { active:activeNote } = getState().notes;

      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
      });

      const fileUrl = await fileUpload( file );
      activeNote.url = fileUrl;

      dispatch( startSaveNote( activeNote ) );

      Swal.close();
    }
  }