import React, { useState, useEffect, useRef } from "react";
import styles from "../Components/NotesPanel.module.css"; // Create this CSS file
import send from "../assets/SS.png";

const NotesPanel = ({ group }) => {
  const [notes, setNotes] = useState(group.notes || []);
  const [newNote, setNewNote] = useState("");
  const notesListRef = useRef(null);

  useEffect(() => {
    // Load notes when a group is selected
    setNotes(group.notes || []);
  }, [group]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newNoteObj = {
      text: newNote,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updatedNotes = [...notes, newNoteObj];
    setNotes(updatedNotes);
    setNewNote("");

    // Update localStorage with the new notes for this group
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const updatedGroups = groups.map((g) =>
      g.groupName === group.groupName ? { ...g, notes: updatedNotes } : g
    );
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    // Scroll to the top of the notes list after adding a note
    if (notesListRef.current) {
      notesListRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.notesPanel}>
      <div className={styles.groupHeader}>
        <div
          className={styles.groupCircle}
          style={{ backgroundColor: group.color }}
        >
          {group.initials}
        </div>
        <h2 className={styles.gname}>{group.groupName}</h2>
      </div>

      <div className={styles.notesList} ref={notesListRef}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteCard}>
            <p>{note.text}</p>
            <span className={styles.noteDate}>
              {note.date} • {note.time}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.noteInputContainer}>
        <textarea
          className={styles.noteInput}
          placeholder="Here’s the sample text for sample work"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote} className={styles.addNoteButton}>
          <img src={send} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;
