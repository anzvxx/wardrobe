import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoadingAnimation from "./components/common/LoadingAnimation";

// Lazy load routes for better performance
const Upload = lazy(() => import("./routes/Upload"));
const Wardrobe = lazy(() => import("./routes/Wardrobe"));
const Outfits = lazy(() => import("./routes/Outfits"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <LoadingAnimation size="lg" text="Loading OutfitMatch..." />
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/outfits" element={<Outfits />} />
          {/* Add the tempo route to prevent catchall issues */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
