import React from "react";
import banner from "../assets/wallpp.png";
import lock from "../assets/lock.png";
import styles from "../Components/MainContent.module.css";
import NotesPanel from "../Components/NotesPanel";

const MainContent = ({ selectedGroup }) => {
  return (
    <div className={styles.MainContent}>
      {!selectedGroup && (
        // Only display this section when no group is selected
        <>
          <img src={banner} alt="My Image" className={styles.imageStyle} />
          <h1 className={styles.title}>Pocket Notes</h1>
          <div className={styles.data}>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
          </div>
          <div className={styles.FooterMssg}>
            <img src={lock} alt="lock" className={styles.bottomimg} />
            end-to-end encrypted
          </div>
        </>
      )}
      {/* Render NotesPanel if a group is selected
      {selectedGroup ? (
        <NotesPanel group={selectedGroup} />
      ) : (
        <p>Select a group from the sidebar to view notes.</p>
      )} */}
      {selectedGroup && (
        <div style={{ flex: 1, width: "100%" }}>
          {" "}
          {/* Wrapper for full height/width */}
          <NotesPanel group={selectedGroup} />
        </div>
      )}
    </div>
  );
};

export default MainContent;
