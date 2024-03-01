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
  const liStyle = {
    textAlign: "left",
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
    <div style={{}}>
      <div
        style={{
          border: "solid",
          fontFamily: "Trebuchet MS",
          width: "500px",
          height: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#D0B49F",
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
          <div>
            {view === "active" && (
              <div>
                <h1>Active:</h1>
                <ul>
                  {activeNotes.map((note, id) => (
                    <div
                      key={id}
                      style={{ display: "flex", listStyleType: "none" }}
                    >
                      <input
                        type="checkbox"
                        onClick={(e) => handleCheckBox(e, note)}
                        checked={completedNotes.includes(note)} // Check if the note is in the completedNotes array
                      />
                      <li style={liStyle}>{note}</li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            {view === "completed" && (
              <div>
                <h1>Completed:</h1>
                <ul>
                  {completedNotes.map((note, id) => (
                    <div key={id}>
                      <li
                        style={{
                          textDecoration: "line-through",
                          textAlign: "left",
                        }}
                      >
                        {note}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
            {view === "all" && (
              <div>
                <h1>All:</h1>
                <ul>
                  {[...completedNotes, ...activeNotes].map((note, id) => (
                    <div key={id}>
                      <li style={liStyle}>{note}</li>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer
        style={{
          border: "solid",
          width: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#BE9685",
        }}
      >
        <div>
          <button
            onClick={() => setView("all")}
            style={{
              backgroundColor: "transparent",
              border: view === "all" ? "solid" : "none",
            }}
          >
            All
          </button>
          <button
            onClick={() => setView("active")}
            style={{
              backgroundColor: "transparent",
              border: view === "active" ? "solid" : "none",
            }}
          >
            Active Notes
          </button>
          <button
            onClick={() => setView("completed")}
            style={{
              backgroundColor: "transparent",
              border: view === "completed" ? "solid" : "none",
            }}
          >
            Completed Notes
          </button>

          <div>Active to-do: {activeNotes.length}</div>
        </div>
      </footer>
    </div>
  );
};

export default Notes;
