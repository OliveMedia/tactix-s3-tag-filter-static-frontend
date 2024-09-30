import { Navigate } from "react-router-dom";

const PageNotFound = () => {
  const token = localStorage.getItem("token");

  if (token === null) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center text-accent">
      <h1 className="text-5xl font-bold">404</h1>
      <h3 className="text-xl font-semibold">Oops! Page not found.</h3>
      <p>{`The page you're looking for doesn't exist.`}</p>
    </div>
  );
};

export default PageNotFound;
