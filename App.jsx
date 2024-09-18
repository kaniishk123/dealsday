import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Homepage from "./Homepage";
import Create from "./Create";
import View from "./View";
import Update from "./Update";
export default function App(){
  return(
    <BrowserRouter>
    <div>
    {window.location.pathname !== '/' && <Homepage/>}
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/view" element={<View />}/>
      <Route path="/update" element={<Update/>}/>
      </Routes>
      </div>
      </BrowserRouter>
  )
}