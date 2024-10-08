// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Providers from "./utils/providers";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary, Layout, ProtectedRoute } from "./components";

const PageNotFound = lazy(
  () => import("../src/pages/pageNotFound/pageNotFound")
);

const Home = lazy(() => import("../src/pages/home/home"));

const Login = lazy(() => import("../src/pages/login/login"));

const Users = lazy(() => import("../src/pages/users/users"));

const Conversations = lazy(
  () => import("../src/pages/conversations/conversations")
);

const theme = createTheme({
  // white: "#e5e5e5",
});

export default function App() {
  const token = localStorage.getItem("token");
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications autoClose={4000} position="top-right" />
      <Providers>
        <Router>
          <Suspense>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Users />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:userId/conversations"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Conversations />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ErrorBoundary>
                    <Login />
                  </ErrorBoundary>
                }
              />
              <Route
                path="*"
                element={
                  token ? (
                    <Layout>
                      <PageNotFound />
                    </Layout>
                  ) : (
                    <PageNotFound />
                  )
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </Providers>
    </MantineProvider>
  );
}
