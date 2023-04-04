import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginModalContext = createContext();

export const useLoginModal = () => useContext(LoginModalContext);

export default function LoginModalProvider({ children }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
    // navigate("/");
  };
  const openModal = () => setModalOpen(true);

  return (
    <LoginModalContext.Provider value={{ modalOpen, closeModal, openModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}
