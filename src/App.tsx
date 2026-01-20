import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Collections from "./pages/Collections";
import Collection from "./pages/Collection";
import Artwork from "./pages/Artwork";
import Inspiration from "./pages/Inspiration";
import Designers from "./pages/Designers";
import Studio from "./pages/Studio";
import Buyers from "./pages/Buyers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collection/:id" element={<Collection />} />
              <Route path="/artwork/:id" element={<Artwork />} />
              <Route path="/inspiration" element={<Inspiration />} />
              <Route path="/designers" element={<Designers />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/buyers" element={<Buyers />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
