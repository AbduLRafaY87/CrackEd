import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Smooth scroll to FAQ section
  const handleScrollToFAQ = (e) => {
    e.preventDefault();
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false); // Close sidebar after navigation
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" style={{ 
        borderBottom: '1px solid #e9ecef',
        padding: '1rem 0',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95) !important'
      }}>
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ fontSize: '1.5rem' }}>
            <img 
              src="CrackEdBGRemoved.webp" 
              alt="CrackEd LMS" 
              className='logoImg' 
              style={{ 
                height: '40px', 
                width: 'auto',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link 
                  className={`nav-link position-relative${location.pathname === '/' ? ' active' : ''}`} 
                  to="/"
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    color: location.pathname === '/' ? '#0d6efd' : '#495057'
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link position-relative${location.pathname === '/about' ? ' active' : ''}`} 
                  to="/about"
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    color: location.pathname === '/about' ? '#0d6efd' : '#495057'
                  }}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link position-relative${location.pathname === '/features' ? ' active' : ''}`} 
                  to="/features"
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    color: location.pathname === '/features' ? '#0d6efd' : '#495057'
                  }}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link position-relative${location.pathname === '/contact' ? ' active' : ''}`} 
                  to="/contact"
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    color: location.pathname === '/contact' ? '#0d6efd' : '#495057'
                  }}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <a 
                  href="#faq-section" 
                  className="nav-link" 
                  onClick={handleScrollToFAQ}
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    color: '#495057'
                  }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="d-none d-lg-flex gap-2">
            <Link 
              to="/login" 
              className="btn btn-outline-primary"
              style={{
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: '2px solid #0d6efd'
              }}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-primary"
              style={{
                borderRadius: '25px',
                padding: '0.5rem 1.5rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(45deg, #0d6efd, #6610f2)',
                border: 'none'
              }}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="btn d-lg-none"
            onClick={toggleSidebar}
            style={{
              border: 'none',
              padding: '0.5rem',
              backgroundColor: 'transparent'
            }}
          >
            <Menu size={24} color="#495057" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 d-lg-none"
          style={{
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1049,
            transition: 'opacity 0.3s ease'
          }}
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`position-fixed h-100 d-lg-none ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{
          top: 0,
          left: 0,
          width: '280px',
          backgroundColor: 'white',
          zIndex: 1050,
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto'
        }}
      >
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" onClick={closeSidebar}>
            <img 
              src="CrackEdBGRemoved.webp" 
              alt="CrackEd LMS" 
              className='logoImg' 
              style={{ height: '32px', width: 'auto' }}
            />
          </Link>
          <button
            className="btn"
            onClick={closeSidebar}
            style={{
              border: 'none',
              padding: '0.25rem',
              backgroundColor: 'transparent'
            }}
          >
            <X size={20} color="#495057" />
          </button>
        </div>
        
        <div className="p-3">
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link 
                className={`text-decoration-none d-block py-2 px-3 rounded ${location.pathname === '/' ? 'bg-primary text-white' : 'text-dark'}`}
                to="/"
                onClick={closeSidebar}
                style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                className={`text-decoration-none d-block py-2 px-3 rounded ${location.pathname === '/about' ? 'bg-primary text-white' : 'text-dark'}`}
                to="/about"
                onClick={closeSidebar}
                style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                className={`text-decoration-none d-block py-2 px-3 rounded ${location.pathname === '/features' ? 'bg-primary text-white' : 'text-dark'}`}
                to="/features"
                onClick={closeSidebar}
                style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Features
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                className={`text-decoration-none d-block py-2 px-3 rounded ${location.pathname === '/contact' ? 'bg-primary text-white' : 'text-dark'}`}
                to="/contact"
                onClick={closeSidebar}
                style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <NavLink
                href="#faq-section" 
                className="text-decoration-none d-block py-2 px-3 rounded text-dark"
                onClick={handleScrollToFAQ}
                style={{
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
          
          <div className="mt-4 pt-3 border-top">
            <div className="d-grid gap-2">
              <Link 
                to="/login" 
                className="btn btn-outline-primary"
                onClick={closeSidebar}
                style={{
                  borderRadius: '25px',
                  fontWeight: '500',
                  border: '2px solid #0d6efd'
                }}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-primary"
                onClick={closeSidebar}
                style={{
                  borderRadius: '25px',
                  fontWeight: '500',
                  background: 'linear-gradient(45deg, #0d6efd, #6610f2)',
                  border: 'none'
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        
      `}</style>
    </>
  );
};

export default Header;