import { Switch, Route,Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/AuthContext';


function App() {
  const authctx = useContext(AuthContext)

  return (
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          {!authctx.isLoggedIn && <Route path='/auth'>
            <AuthPage />
          </Route>}
          {authctx.isLoggedIn && <Route path='/profile'>
            <UserProfile />
          </Route>}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
    </Layout>
   
    
  );
}

export default App;
