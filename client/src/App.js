import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./components/Providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
      </UserProfileProvider>
    </Router>
  );
}

export default App;

