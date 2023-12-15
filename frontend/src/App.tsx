import "./App.css";
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthProvider } from "./auth/AuthContext";
import ProjectPage from "./components/dashboard/ProjectPage";
import ServicePage from "./components/dashboard/ServicePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthProvider>
          }
        />
        <Route
          path="/project/:id"
          element={
            <AuthProvider>
              <Layout>
                <ProjectPage />
              </Layout>
            </AuthProvider>
          }
        />

        <Route
          path="/service/:id"
          element={
            <AuthProvider>
              <Layout>
                <ServicePage />
              </Layout>
            </AuthProvider>
          }
        />

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
