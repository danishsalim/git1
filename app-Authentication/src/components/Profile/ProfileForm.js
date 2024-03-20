import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';
import { useRef, useContext} from 'react';


const ProfileForm = () => {
  const newEnteredPassword=useRef()
  const authctx = useContext(AuthContext)
  const handleSubmit=(e)=>{
      e.preventDefault()
      const newPassword=newEnteredPassword.current.value
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBNrpI1KIiXoB9wO_RqsMDXrnJt5qbK78o',{
        method:'POST',
        body:JSON.stringify({
          idToken:authctx.token,
          password:newPassword,
          returnSecureToken:false,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=>{
        if(res.ok)
        console.log(res.json())
      }).catch(error=>console.log(error))
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newEnteredPassword} minLength='7'/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
