import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./components/Providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import SearchProvider from './components/Providers/SearchProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <SearchProvider>
          <Header />
          <ApplicationViews />
        </SearchProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

