import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { Flights } from "./components/pages/flights/Flights";
import { CreditCards } from "./components/pages/credit-cards/CreditCards";
import TermsAndConditions from "./components/pages/terms-and-conditions/TermsAndConditions";
import { NotFound } from "./components/pages/not-found/NotFound";
import { SharedFlight } from "./components/flight/SharedFlight";
import { CalendarFlights } from "./components/pages/calender-flights/CalendarFlights";
import { About } from "./components/pages/about/About";
import Privacy from "./components/pages/privacy/Privacy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/calendar-flights" element={<CalendarFlights />} />
      <Route path="/credit-cards" element={<CreditCards />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/sharedflight" element={<SharedFlight />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
