import { useState } from "react";
import styles from "../styles/SignUp.module.css";

const SignUp = ({ signup, wallet }) => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");

  const signUpClicked = () => {
    if (!username || !profile) return;

    signup(username, profile);
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Sign up to use TikTok</h1>

      <div className={styles.signupForm}>
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Username</div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        </div>

        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Profile Image: </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setProfile(e.target.value)}
              value={profile}
            />
          </div>
        </div>
      </div>

      <div onClick={signUpClicked} className={styles.loginButton}>
        Sign Up
      </div>
    </div>
  );
};

export default SignUp;
