import BaseLayout from "../components/BaseLayout";
import styles from "./profile.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://159.89.203.190:8001/user/1");
        console.log("zzzz");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <BaseLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile Page</h1>
        <div className={styles.profile}>
          {user && (
            <>
              <div className={styles.profileItem}>
                <span className={styles.label}>UserID:</span> {user.userid}
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Contact:</span> {user.contact}
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Address:</span> {user.address}
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Username:</span> {user.username}
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Email:</span> {user.email}
              </div>
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProfilePage;
