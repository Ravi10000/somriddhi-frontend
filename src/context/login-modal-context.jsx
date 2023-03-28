import { useContext, createContext, useState } from "react";

export const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export default function LoginModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <LoginModalContext.Provider value={{ modalOpen, closeModal, openModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}
