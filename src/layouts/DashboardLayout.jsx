import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <div style={{display: 'flex', minHeight: '100vh'}}>
    <aside style={{width: '220px', background: '#f8f9fa', padding: '1rem'}}>
      <nav>
        <ul style={{listStyle: 'none', padding: 0}}>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/subjects">Subjects</a></li>
          <li><a href="/mcqs">MCQs</a></li>
          <li><a href="/flashcards">Flashcards</a></li>
          <li><a href="/past-papers">Past Papers</a></li>
          <li><a href="/mock-exams">Mock Exams</a></li>
          <li><a href="/progress">Progress</a></li>
          <li><a href="/leaderboard">Leaderboard</a></li>
          <li><a href="/ai-tutor">AI Tutor</a></li>
        </ul>
      </nav>
    </aside>
    <main style={{flex: 1, padding: '2rem'}}>
      <Outlet />
    </main>
    <aside style={{width: '320px', background: '#f1f3f6', padding: '1rem', borderLeft: '1px solid #eee'}}>
      <div>AI Chat (coming soon)</div>
    </aside>
  </div>
);

export default DashboardLayout;
