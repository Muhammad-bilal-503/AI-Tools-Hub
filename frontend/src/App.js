import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// All 35 Tool Pages
import ResumeTool from './pages/tools/ResumeTool';
import MentalHealthTool from './pages/tools/MentalHealthTool';
import CodeReviewTool from './pages/tools/CodeReviewTool';
import LearningPathTool from './pages/tools/LearningPathTool';
import ContentStudioTool from './pages/tools/ContentStudioTool';
import LegalSummaryTool from './pages/tools/LegalSummaryTool';
import FakeNewsTool from './pages/tools/FakeNewsTool';
import FinanceTool from './pages/tools/FinanceTool';
import AccessibilityTool from './pages/tools/AccessibilityTool';
import InterviewTool from './pages/tools/InterviewTool';
import MealPlanTool from './pages/tools/MealPlanTool';
import TravelTool from './pages/tools/TravelTool';
import PlagiarismTool from './pages/tools/PlagiarismTool';
import ChatbotTool from './pages/tools/ChatbotTool';
import AltTextTool from './pages/tools/AltTextTool';
import HomeworkTool from './pages/tools/HomeworkTool';
import SentimentTool from './pages/tools/SentimentTool';
import LanguageTool from './pages/tools/LanguageTool';
import MeetingTool from './pages/tools/MeetingTool';
import EmailTool from './pages/tools/EmailTool';
import SymptomsTool from './pages/tools/SymptomsTool';
import NewsTool from './pages/tools/NewsTool';
import StoryTool from './pages/tools/StoryTool';
import ScraperTool from './pages/tools/ScraperTool';
import FlashcardTool from './pages/tools/FlashcardTool';
import SecurityTool from './pages/tools/SecurityTool';
import InteriorTool from './pages/tools/InteriorTool';
import SocialStrategyTool from './pages/tools/SocialStrategyTool';
import VoiceDataTool from './pages/tools/VoiceDataTool';
import PortfolioTool from './pages/tools/PortfolioTool';
import ProductRecommendTool from './pages/tools/ProductRecommendTool';
import DebateTool from './pages/tools/DebateTool';
import BrandTool from './pages/tools/BrandTool';
import CodeDocsTool from './pages/tools/CodeDocsTool';
import FormBuilderTool from './pages/tools/FormBuilderTool';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{color:'#6366f1',textAlign:'center',marginTop:'40px'}}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tool/resume" element={<ProtectedRoute><ResumeTool /></ProtectedRoute>} />
        <Route path="/tool/mental-health" element={<ProtectedRoute><MentalHealthTool /></ProtectedRoute>} />
        <Route path="/tool/code-review" element={<ProtectedRoute><CodeReviewTool /></ProtectedRoute>} />
        <Route path="/tool/learning-path" element={<ProtectedRoute><LearningPathTool /></ProtectedRoute>} />
        <Route path="/tool/content-studio" element={<ProtectedRoute><ContentStudioTool /></ProtectedRoute>} />
        <Route path="/tool/legal-summary" element={<ProtectedRoute><LegalSummaryTool /></ProtectedRoute>} />
        <Route path="/tool/fake-news" element={<ProtectedRoute><FakeNewsTool /></ProtectedRoute>} />
        <Route path="/tool/finance" element={<ProtectedRoute><FinanceTool /></ProtectedRoute>} />
        <Route path="/tool/accessibility" element={<ProtectedRoute><AccessibilityTool /></ProtectedRoute>} />
        <Route path="/tool/interview" element={<ProtectedRoute><InterviewTool /></ProtectedRoute>} />
        <Route path="/tool/meal-plan" element={<ProtectedRoute><MealPlanTool /></ProtectedRoute>} />
        <Route path="/tool/travel" element={<ProtectedRoute><TravelTool /></ProtectedRoute>} />
        <Route path="/tool/plagiarism" element={<ProtectedRoute><PlagiarismTool /></ProtectedRoute>} />
        <Route path="/tool/chatbot" element={<ProtectedRoute><ChatbotTool /></ProtectedRoute>} />
        <Route path="/tool/alt-text" element={<ProtectedRoute><AltTextTool /></ProtectedRoute>} />
        <Route path="/tool/homework" element={<ProtectedRoute><HomeworkTool /></ProtectedRoute>} />
        <Route path="/tool/sentiment" element={<ProtectedRoute><SentimentTool /></ProtectedRoute>} />
        <Route path="/tool/language" element={<ProtectedRoute><LanguageTool /></ProtectedRoute>} />
        <Route path="/tool/meeting" element={<ProtectedRoute><MeetingTool /></ProtectedRoute>} />
        <Route path="/tool/email" element={<ProtectedRoute><EmailTool /></ProtectedRoute>} />
        <Route path="/tool/symptoms" element={<ProtectedRoute><SymptomsTool /></ProtectedRoute>} />
        <Route path="/tool/news" element={<ProtectedRoute><NewsTool /></ProtectedRoute>} />
        <Route path="/tool/story" element={<ProtectedRoute><StoryTool /></ProtectedRoute>} />
        <Route path="/tool/scraper" element={<ProtectedRoute><ScraperTool /></ProtectedRoute>} />
        <Route path="/tool/flashcards" element={<ProtectedRoute><FlashcardTool /></ProtectedRoute>} />
        <Route path="/tool/security" element={<ProtectedRoute><SecurityTool /></ProtectedRoute>} />
        <Route path="/tool/interior" element={<ProtectedRoute><InteriorTool /></ProtectedRoute>} />
        <Route path="/tool/social-strategy" element={<ProtectedRoute><SocialStrategyTool /></ProtectedRoute>} />
        <Route path="/tool/voice-data" element={<ProtectedRoute><VoiceDataTool /></ProtectedRoute>} />
        <Route path="/tool/portfolio" element={<ProtectedRoute><PortfolioTool /></ProtectedRoute>} />
        <Route path="/tool/product-recommend" element={<ProtectedRoute><ProductRecommendTool /></ProtectedRoute>} />
        <Route path="/tool/debate" element={<ProtectedRoute><DebateTool /></ProtectedRoute>} />
        <Route path="/tool/brand" element={<ProtectedRoute><BrandTool /></ProtectedRoute>} />
        <Route path="/tool/code-docs" element={<ProtectedRoute><CodeDocsTool /></ProtectedRoute>} />
        <Route path="/tool/form-builder" element={<ProtectedRoute><FormBuilderTool /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
