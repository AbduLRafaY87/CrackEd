import React from 'react';

const Header = () => (
  <header style={{padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <div>CrackEd LMS</div>
    <nav>
      <a href="/">Home</a> | <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/features">Features</a>
      <button style={{marginLeft: '1rem'}}>Login</button>
      <button style={{marginLeft: '0.5rem'}}>Sign Up</button>
    </nav>
  </header>
);

export default Header; 