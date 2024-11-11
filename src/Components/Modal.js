import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ closeModal, addGroup }) => {
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (color) => {
    setFormData({ ...formData, color });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.grpName || !formData.color) {
      alert("Please provide a group name and select a color.");
      return;
    }

    // Add the new group
    addGroup({
      groupName: formData.grpName,
      color: formData.color,
      notes: [],
    });

    // Close the modal
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>

        <h2 className={styles.modalHeading}>Create New Group</h2>
        <div className={styles.group111}>
          <label className={styles.modalLabel}>
            <b>Group Name :</b>
          </label>
          <input
            type="text"
            name="grpName"
            value={formData.grpName}
            onChange={handleInputChange}
            className={styles.modalInput}
            placeholder="Enter group name"
          />
        </div>
        <div className={styles.groupcreate}>
          <label className={styles.modalLabel}>
            <b>Choose Colour</b>
          </label>
          <div className={styles.colorOptions}>
            {colors.map((color, index) => (
              <button
                key={index}
                className={`${styles.colorButton} ${
                  formData.color === color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>

        <button className={styles.createButton} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Modal;
