import { FC, ReactNode } from "react";

import { ErrorBoundary as ErrorLimit } from "react-error-boundary";

import { FallBackUi } from "../fallBackUi";

interface IErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: FC<IErrorBoundaryProps> = ({ children }) => {
  return <ErrorLimit FallbackComponent={FallBackUi}>{children}</ErrorLimit>;
};

export default ErrorBoundary;
