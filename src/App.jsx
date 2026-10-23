import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Rain from "./components/layout/Rain";
import { FragmentsProvider } from "./components/fragments/FragmentsProvider";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import ReadPage from "./pages/ReadPage";
import LocalizadoPage from "./pages/LocalizadoPage";

// Volta ao topo a cada mudança de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <FragmentsProvider>
        <ScrollToTop />
        <Rain />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livros/:slug" element={<BookPage />} />
          <Route path="/livros/:slug/ler" element={<ReadPage />} />
          <Route path="/localizado" element={<LocalizadoPage />} />
        </Routes>
        <Footer />
      </FragmentsProvider>
    </BrowserRouter>
  );
}
