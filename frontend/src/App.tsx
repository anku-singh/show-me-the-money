import React from "react";
import BalanceSheet from "./components/BalanceSheet";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BalanceSheet />
    </ErrorBoundary>
  );
};

export default App;
