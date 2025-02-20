import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Processing from "./pages/Processing";
import ItemDetail from "./pages/ItemDetail";
import Reports from "./pages/Reports";
import CreateInvoice from "./pages/CreateInvoice";
import Completed from "./pages/Completed";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice/" element={<CreateInvoice />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<ItemDetail />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/processing" element={<Processing />} />
          <Route path="/complete" element={<Completed />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
