import React, { useState } from "react";
import plus from "../assets/plus.png";
import styles from "../Components/Sidebar.module.css";
import Modal from "../Components/Modal";

const Sidebar = ({ onSelectGroup, selectedGroup, setSelectedGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );
  // State to track selected group

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0, 2); // Limit to 2 initials
  };

  const addGroup = (newGroup) => {
    const initials = getInitials(newGroup.groupName);
    const updatedGroups = [...groups, { ...newGroup, initials }];
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups)); // Store in local storage
  };

  const deleteGroup = (indexToDelete) => {
    const updatedGroups = groups.filter((_, index) => index !== indexToDelete);
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  const toggleGroupSelection = (group) => {
    if (selectedGroup && selectedGroup.groupName === group.groupName) {
      setSelectedGroup(null); // Deselect the group if it's already selected
    } else {
      setSelectedGroup(group); // Select the group
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.sidebartitle}>Pocket Notes</h1>
        <button className={styles.button} onClick={openModal}>
          <img src={plus} alt="plus-symbol" className={styles.plus} />
        </button>

        {isModalOpen && <Modal closeModal={closeModal} addGroup={addGroup} />}

        {/* Render the groups */}
        <div className={styles.groupsContainer}>
          {groups.map((group, index) => (
            <div
              key={index}
              className={styles.groupItem}
              onClick={() => toggleGroupSelection(group)} // Set selected group on click
            >
              <div
                className={styles.groupCircle}
                style={{ backgroundColor: group.color }}
              >
                {group.initials}
              </div>
              <span className={styles.groupName}>{group.groupName}</span>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent group selection on delete
                  deleteGroup(index);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
