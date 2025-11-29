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
import ModelsPage from "./pages/admin/Models/ModelPage.tsx";
import ClientsPage from "./pages/admin/Clients/ClientsPage.tsx";
import HydraulicHosePage from "./pages/public/HydraulicHose/HydraulicHosePage.tsx";

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
      { path: `/${ADMIN_PATH}/login`, element: <LoginPage /> },
      {
        path: `/${ADMIN_PATH}/forget-password`,
        element: <ForgetPassword />,
      },
      {
        path: `/catalogo/mangueiras-hidráulicas`,
        element: <HydraulicHosePage />,
      },
      {
        path: `/catalogo/:productTypeSlug/fabricantes`,
        element: <CatalogProducersPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/produtos`,
        element: <CatalogProductsPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/fabricantes/:producerSlug/produtos`,
        element: <CatalogProductsPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/fabricantes/:producerSlug/produtos/:productSlug/:modelSlug`,
        element: <CatalogProductPage />,
      },
      {
        path: `/catalogo/:productTypeSlug/produtos/:productSlug/:modelSlug`,
        element: <CatalogProductPage />,
      },
      {
        path: `/${ADMIN_PATH}`,
        element: (
          <PrivateRoute>
            <Navigate to={`/${ADMIN_PATH}/home`} replace />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/home`,
        element: (
          <PrivateRoute>
            <HomeAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/familias`,
        element: (
          <PrivateRoute>
            <ProductTypesPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/fabricantes`,
        element: (
          <PrivateRoute>
            <ProducerPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/modelos`,
        element: (
          <PrivateRoute>
            <ModelsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/produtos`,
        element: (
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/textos`,
        element: (
          <PrivateRoute>
            <TextsPage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/imagens-carrosel`,
        element: (
          <PrivateRoute>
            <SliderImagePage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/servicos`,
        element: (
          <PrivateRoute>
            <ServicePage />
          </PrivateRoute>
        ),
      },
      {
        path: `/${ADMIN_PATH}/clientes`,
        element: (
          <PrivateRoute>
            <ClientsPage />
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
