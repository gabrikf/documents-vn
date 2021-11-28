import { createContext, ReactNode, useContext, useState } from "react";

interface TitleContexData {
  title: string;
  setCurrentTitle: (currentTitle: string) => void;
}
interface TitleProviderProps {
  children: ReactNode;
}

export const TitleContext = createContext({} as TitleContexData);

export function TitleProvider({ children }: TitleProviderProps) {
  const [title, setTitle] = useState("Documents");
  function setCurrentTitle(currentTitle: string) {
    setTitle(currentTitle);
  }
  return (
    <TitleContext.Provider
      value={{
        title,
        setCurrentTitle,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle() {
  const context = useContext(TitleContext);
  return context;
}
