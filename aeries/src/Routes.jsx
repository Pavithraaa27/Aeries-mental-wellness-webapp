import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Welcome from './pages/welcome';
import ChatInterface from './pages/chat-interface';
import MoodJournal from './pages/mood-journal';
import Dashboard from './pages/dashboard';
import WellnessResources from './pages/wellness-resources';
import UserSettings from './pages/user-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/mood-journal" element={<MoodJournal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wellness-resources" element={<WellnessResources />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
