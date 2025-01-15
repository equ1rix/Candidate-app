import { ReactNode, createContext, useState } from 'react';

import { Statuses, useFetchStatuses } from 'hooks/useFetchStatuses';
import { Position, useFetchPositions } from 'hooks/useFetchPositions';

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
  children
}: ModalContextProviderProps) => {
  const { statuses } = useFetchStatuses();
  const { positions } = useFetchPositions();
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
      {
        <CandidatesModal
          onClose={closeModal}
          isOpenModal={isOpenModal}
          positions={positions}
          statuses={statuses}
        />
      }
    </ModalContext.Provider>
  );
};

export { ModalContext };
