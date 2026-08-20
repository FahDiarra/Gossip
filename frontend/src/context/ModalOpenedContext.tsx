import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ModalOpenedContextType = {
  isModalOpen: boolean;
  openLayer: () => void;
  closeLayer: () => void;
};

const ModalOpenedContext = createContext<ModalOpenedContextType | undefined>(
  undefined
);

type ModalOpenedContextProviderProps = {
  children: ReactNode;
};

export function ModalOpenedContextProvider({
  children,
}: ModalOpenedContextProviderProps) {
  const [uiLayerCount, setUiLayerCount] = useState<number>(0);

  const openLayer = () => {
    setUiLayerCount((count) => count + 1);
  };

  const closeLayer = () => {
    setUiLayerCount((count) => Math.max(0, count - 1));
  };

  return (
    <ModalOpenedContext.Provider
      value={{
        isModalOpen: uiLayerCount > 0,
        openLayer,
        closeLayer,
      }}
    >
      {children}
    </ModalOpenedContext.Provider>
  );
}

export function useModalOpened(): ModalOpenedContextType {
  const context = useContext(ModalOpenedContext);

  if (!context) {
    throw new Error(
      "useModalOpened must be used within a ModalOpenedContextProvider"
    );
  }

  return context;
}