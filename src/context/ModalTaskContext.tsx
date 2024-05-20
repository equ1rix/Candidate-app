import { ReactNode, createContext, useState } from 'react';

import CandidatesModal from 'components/CandidatesModal';

export type ModalContextProps = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type ModalContextProviderProps = {
  children: ReactNode;
};

const ModalContext = createContext<ModalContextProps>({
  isOpenModal: false,
  openModal: () => {},
  closeModal: () => {}
});

export const ModalContextProvider = ({
  children
}: ModalContextProviderProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const contextValue: ModalContextProps = {
    isOpenModal,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {isOpenModal && <CandidatesModal onClose={closeModal} />}
    </ModalContext.Provider>
  );
};

export { ModalContext };
