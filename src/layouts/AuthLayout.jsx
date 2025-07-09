import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <>
    <Header />
    <main style={{minHeight: '80vh'}}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AuthLayout;
