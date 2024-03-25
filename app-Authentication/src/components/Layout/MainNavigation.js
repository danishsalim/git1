import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import {useHistory} from 'react-router-dom'

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const ctx = useContext(AuthContext)
  const {isLoggedIn,logout}=ctx
  const history= useHistory()
  const logoutHandler=()=>{
    logout()
    history.push('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
           {!isLoggedIn && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {isLoggedIn && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
