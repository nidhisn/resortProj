import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Components/Header/Header";
// Removed HeroSection import if not used directly in App.js routes
import ThingsToDo from "./Components/ThingsToDo/ThingsToDo";
import ExploreIsland from "./Components/ExploreIsland/ExploreIsland";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";
import Resort from "./Components/Resort/Resort";
import Home from "./Components/Home/Home";
import Book from "./Components/Book/Book";
import Faqs from "./Components/Faqs/Faqs";
import "./App.css";
import React, { useRef } from "react"; // Removed useEffect as it's not strictly needed for the App component's logic here

function App() {
  const footerRef = useRef(null);
  const location = useLocation(); // This must be called inside the functional component

  // Determine if the footer should be rendered
  const shouldShowFooter = location.pathname !== "/thingstodo";

  return (
    // The Router component is crucial and wraps everything
    <div className="app">
      <Menu />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/thingstodo" element={<ThingsToDo />} />
          <Route path="/exploretheisland" element={<ExploreIsland />} />
          <Route path="/booking" element={<Book />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
      </main>
      {/* Conditionally render the Footer */}
      {shouldShowFooter && <Footer ref={footerRef} />}
    </div>
  );
}

// Wrap App with Router *outside* the App component's definition for hooks to work correctly
function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp; // Export the wrapper component
