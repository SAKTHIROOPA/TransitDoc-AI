import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import RepositoryPage from './pages/RepositoryPage';
import SemanticSearchPage from './pages/SemanticSearchPage';
import KnowledgeGraphPage from './pages/KnowledgeGraphPage';
import AISummaryPage from './pages/AISummaryPage';
import AnalyticsPage from './pages/AnalyticsPage';

/**
 * Route protection guard checking JWT validity
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, checkTokenValidity } = useAuthStore();
  const location = useLocation();

  const isValid = isAuthenticated && checkTokenValidity();

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Toast Notification Provider */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#0F172A',
            color: '#FFFFFF',
            fontSize: '12px',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="repository" element={<RepositoryPage />} />
          <Route path="search" element={<SemanticSearchPage />} />
          <Route path="knowledge-graph" element={<KnowledgeGraphPage />} />
          <Route path="summary" element={<AISummaryPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
