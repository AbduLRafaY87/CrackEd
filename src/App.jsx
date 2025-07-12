import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeaderTop from './components/common/HeaderTop';

// Import all your pages
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import LandingPage from './pages/Public/LandingPage';
import AboutUsPage from './pages/Public/AboutUsPage';
import ContactPage from './pages/Public/ContactPage';
import FeaturesPage from './pages/Public/FeaturesPage';
import PrivacyPolicyPage from './pages/Public/Legal/PrivacyPolicyPage';
import TermsOfUsePage from './pages/Public/Legal/TermsOfUsePage';
import RefundPolicyPage from './pages/Public/Legal/RefundPolicyPage';
import DashboardHome from './pages/Dashboard/DashboardHome';
import UserProfileSettingsPage from './pages/Dashboard/UserProfileSettingsPage';
import SubjectsPage from './pages/Learning/SubjectsPage';
import NotesPage from './pages/Learning/NotesPage';
import McqsPage from './pages/Learning/McqsPage';
import FlashcardsPage from './pages/Learning/FlashcardsPage';
import PastPapersPage from './pages/Learning/PastPapersPage';
import MockExamsPage from './pages/Learning/MockExamsPage';
import UpgradePage from './pages/Payment/UpgradePage';
import PaymentStatusPage from './pages/Payment/PaymentStatusPage';
import AITeacherAssistantPage from './pages/AI/AITeacherAssistantPage';
import ProgressPage from './pages/Progress/ProgressPage';
import LeaderboardPage from './pages/Progress/LeaderboardPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagementPage from './pages/Admin/UserManagementPage';
import PaymentVerificationPage from './pages/Admin/PaymentVerificationPage';
import ContentManagementPage from './pages/Admin/ContentManagementPage';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
// import AdminRoute from './routes/AdminRoute';

// PublicLayout wraps public pages with Header and Footer and renders child routes via Outlet
const PublicLayout = () => (
  <>
    {/* <HeaderTop /> */}
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Private Routes (requires authentication) */}
        <Route element={
          <AuthProvider>
            <PrivateRoute />
          </AuthProvider>
        }>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/profile" element={<UserProfileSettingsPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/:subjectId/notes/:chapterId" element={<NotesPage />} />
            <Route path="/subjects/:subjectId/mcqs/:chapterId" element={<McqsPage />} />
            <Route path="/subjects/:subjectId/flashcards/:chapterId" element={<FlashcardsPage />} />
            <Route path="/past-papers" element={<PastPapersPage />} />
            <Route path="/mock-exams" element={<MockExamsPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/payment-status" element={<PaymentStatusPage />} />
            <Route path="/ai-tutor" element={<AITeacherAssistantPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Route>

        {/* Admin Routes (requires admin role) - Uncomment and implement AdminRoute later */}
        {/*
        <Route element={
          <AuthProvider>
            <AdminRoute />
          </AuthProvider>
        }>
          <Route element={<AdminLayout />}> // You will create AdminLayout similar to DashboardLayout
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/payments" element={<PaymentVerificationPage />} />
            <Route path="/admin/content" element={<ContentManagementPage />} />
          </Route>
        </Route>
        */}

        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;