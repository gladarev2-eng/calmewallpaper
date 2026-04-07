import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";


import Artwork from "./pages/Artwork";
import Inspiration from "./pages/Inspiration";
import Designers from "./pages/Designers";
import Studio from "./pages/Studio";
import Buyers from "./pages/Buyers";
import Contacts from "./pages/Contacts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <FavoritesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/catalog" element={<Catalog />} />


                    <Route path="/artwork/:id" element={<Artwork />} />
                    <Route path="/inspiration" element={<Inspiration />} />
                    <Route path="/designers" element={<Designers />} />
                    <Route path="/studio" element={<Studio />} />
                    <Route path="/buyers" element={<Buyers />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FavoritesProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
