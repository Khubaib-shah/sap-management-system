import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Processing from "./pages/Processing";
import { ItemsProvider } from "./context/ItemsContext";
import ItemDetail from "./pages/ItemDetail";
import Reports from "./pages/Reports";
import CreateInvoice from "./pages/CreateInvoice";

function App() {
  return (
    <ItemsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice/" element={<CreateInvoice />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<ItemDetail />} />
            <Route path="/orders" element={<Orders />} />

            <Route path="/processing" element={<Processing />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </Router>
    </ItemsProvider>
  );
}

export default App;
