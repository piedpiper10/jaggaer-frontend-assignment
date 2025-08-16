import React, { useState } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <>
      <Header title={pageTitle} />
      <Outlet context={{ setPageTitle }} />
    </>
  );
}
