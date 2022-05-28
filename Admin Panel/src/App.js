import './App.css';
import Landing from './Views/Landing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Login from './Views/login';
import * as ROUTES from './Constants/routes.js';


function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Router >
          <Route path={ROUTES.HOME_LANDING} component={Landing} />
          <Route exact path={ ROUTES.LOGIN} component={Login} />
      </Router>
      <ToastContainer />
      
    </div>
  );
}

export default App;
