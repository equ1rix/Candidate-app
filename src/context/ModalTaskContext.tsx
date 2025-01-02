import { ReactNode, createContext, useState } from 'react';

import { Statuses } from 'hooks/useFetchStatuses';
import { Position } from 'hooks/useFetchPositions';

import CandidatesModal from 'components/CandidatesModal';

export type ModalContextProps = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type ModalContextProviderProps = {
  children: ReactNode;
  statuses?: Statuses[];
  positions?: Position[];
};

const ModalContext = createContext<ModalContextProps>({
  isOpenModal: false,
  openModal: () => {},
  closeModal: () => {}
});

export const ModalContextProvider = ({
  children,
  positions,
  statuses
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
      {isOpenModal && (
        <CandidatesModal
          statuses={statuses || []}
          positions={positions || []}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};

export { ModalContext };
