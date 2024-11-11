import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import styles from "../Components/Home.module.css";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Function to handle the selected group from Sidebar
  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };
  return (
    <div className={styles.mainhome}>
      <Sidebar
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <MainContent selectedGroup={selectedGroup} />
    </div>
  );
};

export default Home;
