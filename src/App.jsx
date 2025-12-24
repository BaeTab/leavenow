import { Routes, Route, Navigate } from 'react-router-dom';
import CalendarDashboard from './components/CalendarDashboard';
import BlogPost from './components/BlogPost';
import BlogSection from './components/BlogSection';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CalendarDashboard />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blog" element={
          <div className="max-w-6xl mx-auto px-6 py-20">
            {/* Minimal Header for Blog List */}
            <h1 className="text-4xl font-black text-slate-900 mb-10 text-center">연차나우 블로그</h1>
            <BlogSection />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
