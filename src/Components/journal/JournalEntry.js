
export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">

      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg)'
        }}
      >
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          New day
        </p>
        <p className="journal__entry-content">
          Ad culpa cillum exercitation do cupidatat laboris nulla dolor eiusmod duis ipsum.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
      
    </div>
  )
}
