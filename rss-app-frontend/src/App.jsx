import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RSSFetcher from './components/RSSFetcher';
import ScrollToTop from './components/ScrollToTop';




function App() {
  return (
    <Router>
      <div className="font-sans">
        <ScrollToTop />    
        <Routes>
          <Route path="/" element={<RSSFetcher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;