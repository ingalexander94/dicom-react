import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./models";
import Navbar from "./components/Navbar";
import "./App.css";

const Tridimensional = lazy(() => import("src/pages/Tridimensional"));
const Twodimensional = lazy(() => import("src/pages/Twodimensional"));
const Dicom = lazy(() => import("src/pages/Dicom"));
const VideoDicom = lazy(() => import("src/pages/VideoDicom"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <BrowserRouter>
          <Navbar />
          <article className={"app_wrapper"}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={publicRoutes.TWODIMENSIONAL} />}
              />
              <Route
                path={publicRoutes.TRIDIMENSIONAL}
                element={<Tridimensional />}
              />
              <Route
                path={publicRoutes.TWODIMENSIONAL}
                element={<Twodimensional />}
              />
              <Route path={publicRoutes.DICOM} element={<Dicom />} />
              <Route path={publicRoutes.VIDEODICOM} element={<VideoDicom />} />
              <Route
                path="*"
                element={<Navigate to={publicRoutes.TRIDIMENSIONAL} />}
              />
            </Routes>
          </article>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
