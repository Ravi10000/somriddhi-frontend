import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import Banner from "./pages/Banner/Banner";
import Category from "./pages/Category/category";
import Deal from "./pages/Deals/deals";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/category" element={<Category />} />
          <Route path="/deal" element={<Deal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
