import React from "react";
import { Route, Routes } from "react-router-dom";
import DogList from "./pages/DogList";
import CatList from "./pages/CatList";
import OtherList from "./pages/OtherList";
import AdoptionForm from "./pages/AdoptionForm";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DogList />} />
        <Route path="/cat" element={<CatList />} />
        <Route path="/others" element={<OtherList />} />
        <Route path="/adoptionForm" element={<AdoptionForm />} />
      </Routes>
    </>
  );
}

export default App;
