// PageTitleContext.js
import { createContext, useContext, useState } from "react";
import React from "react";

const PageTitleContext = createContext();

export function PageTitleProvider({ children }) {
  const [title, setTitle] = useState(""); // default title

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  return useContext(PageTitleContext);
}
