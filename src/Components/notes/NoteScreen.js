import { NotesAppBar } from "./NotesAppBar"

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content">

        <input 
          type="text"
          className="notes__title-input"
          placeholder="Some awesome title"
          autoComplete="off"
        />

        <textarea
          className="notes__textarea"
          placeholder="What happened today"
        ></textarea>

        <div className="notes_image">
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="imagen"
          />
        </div>

      </div>
    </div>
  )
}
