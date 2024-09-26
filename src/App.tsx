// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Providers from "./utils/providers";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary, Layout } from "./components";

const PageNotFound = lazy(
  () => import("../src/pages/pageNotFound/pageNotFound")
);

const Home = lazy(() => import("../src/pages/home/home"));

const Login = lazy(() => import("../src/pages/login/login"));

const theme = createTheme({
  // white: "#e5e5e5",
  primaryColor: "brand",
  colors: {
    dark: [
      "#787B82",
      "#6B6F78",
      "#60656E",
      "#565B66",
      "#4C525E",
      "#434A58",
      "#3B4252",
      "#373C48",
      "#33373F",
      "#2F3238",
      "#2B2D31",
      "#27292C",
      "#242527",
    ],
    brand: [
      "#4C4F53",
      "#45474C",
      "#3E4146",
      "#373B41",
      "#31353C",
      "#2B3038",
      "#262B34",
      "#23272E",
      "#212328",
      "#1E2023",
      "#1C1D1F",
      "#191A1C",
      "#171819",
    ],
  },
});

export default function App() {
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
                  <Layout>
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  </Layout>
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
                  <Layout>
                    <PageNotFound />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </Providers>
    </MantineProvider>
  );
}
