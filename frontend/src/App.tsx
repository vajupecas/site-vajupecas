import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";
import WhatsApp from "./components/Layout/WhatsApp";
import { TextsProvider } from "./contexts/TextContext";

function App() {
  const location = useLocation();
  const showWhatsApp = !location.pathname.startsWith("/admin");

  return (
    <TextsProvider>
      <ScrollToTop />
      <Outlet />
      {showWhatsApp && <WhatsApp />}
    </TextsProvider>
  );
}

export default App;
