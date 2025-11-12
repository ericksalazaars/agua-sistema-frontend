import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientesPage from "./pages/ClientesPage";
import VisitasPage from "./pages/VisitasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientesPage />} />
        <Route path="/visitas" element={<VisitasPage />} />
      </Routes>
    </BrowserRouter>
  );
}
