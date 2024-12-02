import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComponentForm from './components/ComponentForm';
import ComponentList from './components/ComponentList';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/add">Add Component :)</Link> | <Link to="/list">View Components</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Welcome to Component Manager</h1>} />
                <Route path="/add" element={<ComponentForm />} />
                <Route path="/list" element={<ComponentList />} />
            </Routes>
        </Router>
    );
}

export default App;
