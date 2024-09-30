import React, { useState, useCallback } from "react";

const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const throwError = useCallback((err: Error) => {
    setError(err);
  }, []);

  return { error, resetError, throwError };
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { error, resetError } = useErrorBoundary();

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px", border: "1px solid red" }}>
        <h1>Something went wrong.</h1>
        <p>{error.message}</p>
        <button onClick={resetError}>Try Again</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
