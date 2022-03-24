import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar"

export const NoteScreen = () => {

  const {active:note} = useSelector( state => state.notes );
  const [ formValues, handleInputChange, reset ] = useForm( note);
  
  const activeId = useRef();

  useEffect(() => {
    if ( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id;
    }
  }, [ note, reset ]);

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
          value={ title }
          onChange={ handleInputChange }
        />

        <textarea
          className="notes__textarea"
          placeholder="What happened today"
          value={ body }
          onChange={ handleInputChange }
        ></textarea>

        {
          note.url 
          &&
          (<div className="notes_image">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt="imagen"
            />
          </div>)
        }

      </div>
    </div>
  )
}
