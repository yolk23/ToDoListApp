import React, { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState("");
  const [activeNotes, setActiveNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState([]);
  const [view, setView] = useState("all");

  const handleCheckBox = (e, note) => {
    const value = note;
    if (e.target.checked) {
      setCompletedNotes([...completedNotes, value]);
      setActiveNotes(activeNotes.filter((activeNote) => activeNote !== value));
    } else {
      setActiveNotes([...activeNotes, value]);
      setCompletedNotes(
        completedNotes.filter((completedNote) => completedNote !== value)
      );
    }
  };

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const withSlashes = [year, month, day].join("/");

  const renderNote = (e) => {
    e.preventDefault();
    if (!activeNotes.includes(notes)) setActiveNotes([...activeNotes, notes]);
    // Checks if theres already a to do value
    else {
      alert("value already added"); //
    }
    setNotes(""); // Clear the input after adding the note
  };

  useEffect(() => {}, [completedNotes, activeNotes]);

  return (
    <div
      style={{
        border: "solid",
        fontFamily: "Trebuchet MS",
        width: "500px",
        height: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <form>
        <div style={{ background: "wheat" }}>
          <h1
            style={{
              marginTop: "0px",
              fontFamily: "serif",
              fontWeight: "normal",
            }}
          >
            TO DO LIST
          </h1>
          <h4>Date:{withSlashes}</h4>
        </div>
        <input
          type="text"
          placeholder="Add New"
          onChange={handleChange}
          value={notes}
          style={{ width: "400px" }}
        />

        <button onClick={renderNote}>Add</button>
      </form>
      <div>
        <ul>
          {activeNotes.map((note, id) => (
            <div key={id}>
              <input
                type="checkbox"
                onClick={(e) => handleCheckBox(e, note)}
                checked={completedNotes.includes(note)} // Check if the note is in the completedNotes array
              />
              <li>{note}</li>
            </div>
          ))}
        </ul>
      </div>

      <div>Active to-do: {activeNotes.length}</div>
      <div>
        <button onClick={() => setView("all")}>All</button>
        <button onClick={() => setView("active")}>Active Notes</button>
        <button onClick={() => setView("completed")}>Completed Notes</button>
      </div>
      <div>
        <div>
          {view === "active" && (
            <div>
              <ul>
                {activeNotes.map((note, id) => (
                  <div key={id}>
                    <li>{note}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {view === "completed" && (
            <div>
              <ul>
                {completedNotes.map((note, id) => (
                  <div key={id}>
                    <li style={{ textDecoration: "line-through" }}>{note}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {view === "all" && (
            <div>
              <ul>
                {[...completedNotes, ...activeNotes].map((note, id) => (
                  <div key={id}>
                    <li>{note}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
