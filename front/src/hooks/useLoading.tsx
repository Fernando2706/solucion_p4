import React, { createContext, useContext, useState } from 'react';

interface LoadingContextProp {
  showLoading: () => void;
  clearLoading: () => void;
  loading: boolean;
}

const Context = createContext({} as LoadingContextProp);

export const LoadingProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  function showLoading() {
    setLoading(true);
  }

  function clearLoading() {
    setLoading(false);
  }

  return (
    <Context.Provider
      value={{
        clearLoading,
        showLoading,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useLoading = () => useContext(Context);
