import { Fragment, useEffect, useRef } from "react";

import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import BrokenRobot from "../../assets/images/broken-robot.png";
const FallBackUi = ({ error, resetErrorBoundary }: FallbackProps) => {
  const pathname = useLocation();
  const previousRouteRef = useRef(pathname);
  const router = useNavigate();

  useEffect(() => {
    // Get the previous and current routes
    const previousRoute = previousRouteRef.current;
    const currentRoute = pathname;

    // Compare the previous and current routes
    if (previousRoute !== currentRoute) {
      resetErrorBoundary();
    }

    // Update the previous route
    previousRouteRef.current = currentRoute;
  }, [pathname, resetErrorBoundary]);

  return (
    <Fragment>
      <div
        role="alert"
        className="flex h-screen  flex-col items-center justify-center text-red-500"
      >
        <img
          style={{
            width: "15rem",
          }}
          height={500}
          width={500}
          src={BrokenRobot}
          alt="broken-robot"
        />
        <p>{`Uh oh... There's a problem. Try refreshing the app.`}</p>
        <pre>{error.message}</pre>
        <div className="flex flex-col items-center justify-center space-y-3">
          <span>{`If refreshing the app doesn't work, Please`}</span>

          <Button
            variant="outline"
            onClick={() => {
              localStorage.clear();
              router("/login");
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default FallBackUi;
