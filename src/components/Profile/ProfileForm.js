import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // Add Validation
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCM6g16Qv7IXnELyRQ7cS54ndvlSMyo8Y0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      // assumption: Always Succeeds
      history.replace('/');
     console.log('successful')

    }).catch((err) => {
      console.error(err);
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
