import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNotes } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar"

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active:note} = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note);
  
  const activeId = useRef();

  useEffect(() => {
    if ( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id;
    }
  }, [ note, reset ]);

  useEffect(() => {
    dispatch( activeNotes( formValues.id, { ...formValues })) 
  
    
  }, [ formValues, dispatch ])
  

  const { title, body } = formValues;

  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content">

        <input 
          type="text"
          className="notes__title-input"
          placeholder="Some awesome title"
          autoComplete="off"
          name="title"
          value={ title }
          onChange={ handleInputChange }
        />

        <textarea
          className="notes__textarea"
          placeholder="What happened today"
          name="body"
          value={ body }
          onChange={ handleInputChange }
        ></textarea>

        {
          note.url 
          &&
          (<div className="notes_image">
            <img
              src={ note.url }
              alt={ note.title }
            />
          </div>)
        }

      </div>
    </div>
  )
}
