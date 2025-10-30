import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthContext.tsx";
import { PrivateRoute } from "./routes/PrivateRoute.tsx";
import App from "./App.tsx";
import LoginPage from "./pages/admin/Login/LoginPage.tsx";
import HomeAdminPage from "./pages/admin/Home/HomeAdminPage.tsx";
import ProductTypesPage from "./pages/admin/ProductTypes/ProductTypesPage.tsx";
import ProductsPage from "./pages/admin/Products/ProductsPage.tsx";
import ProducerPage from "./pages/admin/Producers/ProducerPage.tsx";
import TextsPage from "./pages/admin/Texts/TextsPage.tsx";
import ForgetPassword from "./pages/admin/ForgetPassword/ForgetPassword.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import HomePage from "./pages/public/Home/HomePage.tsx";
import CatalogProductsPage from "./pages/public/Catalog/Products/CatalogProductsPage.tsx";
import CatalogProducersPage from "./pages/public/Catalog/Producers/CatalogProducersPage.tsx";
import CatalogProductPage from "./pages/public/Catalog/Product/CatalogProductPage.tsx";
import AboutUsPage from "./pages/public/AboutUs/AboutUsPage.tsx";
import ContactPage from "./pages/public/Contact/ContactPage.tsx";
import SliderImagePage from "./pages/admin/Slider/SliderPage.tsx";
import ServicePage from "./pages/admin/Service/ServicePage.tsx";
import ServicesPage from "./pages/public/Services/ServicesPage.tsx";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sobre",
        element: <AboutUsPage />,
      },
      {
        path: "/servicos",
        element: <ServicesPage />,
      },
      {
        path: "/contato",
        element: <ContactPage />,
      },
      { path: `${ADMIN_PATH}/login`, element: <LoginPage /> },
      {
        path: `${ADMIN_PATH}/forget-password`,
        element: <ForgetPassword />,
      },
      {
        path: `/catalogo/:productTypeSlug/`,
        element: <CatalogProducersPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/:producerSlug`,
        element: <CatalogProductsPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/:producerSlug/produtos`,
        element: <CatalogProductsPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/:producerSlug/:productSlug`,
        element: <CatalogProductPage />,
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Navigate to="/admin/home" replace />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/home`,
        element: (
          <PrivateRoute>
            <HomeAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/product-types`,
        element: (
          <PrivateRoute>
            <ProductTypesPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/producers`,
        element: (
          <PrivateRoute>
            <ProducerPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/products`,
        element: (
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/texts`,
        element: (
          <PrivateRoute>
            <TextsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/image-slider`,
        element: (
          <PrivateRoute>
            <SliderImagePage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ADMIN_PATH}/services`,
        element: (
          <PrivateRoute>
            <ServicePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
