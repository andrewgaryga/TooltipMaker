import React from 'react';
import 'normalize.css';
import './App.scss';
import PhotoSubmit from "./components/PhotoSubmit";
import PhotoDetails from "./components/PhotoDetails";
import PhotosList from "./components/PhotosList";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandPointUp, faCamera, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
library.add(faHandPointUp, faCamera, faPaintBrush);

const AppRouter = () => (
  <Router>    
    <React.Fragment>
      <Route path="/" exact component={PhotosList} />
      <Route path="/new" component={PhotoSubmit} />
      <Route path="/photo/:id" component={PhotoDetails} />
    </React.Fragment>
  </Router>
);

export default AppRouter;