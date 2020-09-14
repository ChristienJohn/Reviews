import React, { Component } from 'react'; 
import{
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReviewsListPage from './pages/ReviewsListPage';
import ReviewPage from './pages/ReviewPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './NavBar';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/reviews-list" component={ReviewsListPage} />
              <Route path="/review/:name" component={ReviewPage} />
              <Route path="/about" component={AboutPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
      </div>
      </Router>
    );
  }
}


export default App;