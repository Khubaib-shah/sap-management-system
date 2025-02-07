import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  ClipboardList,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", path: "/" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: ClipboardList, label: "Processing", path: "/processing" },
  // { icon: BarChart, label: "Reports", path: "/" },
];

function Layout({ children }) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const NavContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 md:px-4 text-base md:text-lg font-semibold">
          Uniform Management
        </h2>
        <div className="space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-3  right-0">
            <Menu className="h-80 w-80" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
          <div className="flex flex-1 flex-col bg-muted/40">
            <NavContent />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-72">
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
