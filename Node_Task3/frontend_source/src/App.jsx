import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestPasswordResetPage from './pages/RequestPasswordResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RequestPasswordResetPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            </Routes>
        </Router>
    );
};

export default App;