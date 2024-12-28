import {
  RequestsRoutesEnum,
  RequestStatusEnum,
  RequestsTitleEnum,
} from '@/types/requests/enums';
import { create } from 'zustand';

interface ApprovalDTO {
  title?: RequestsTitleEnum;
  level?: number;
  status?: RequestStatusEnum;
  typeRequest?: RequestsTitleEnum;
  routeRequest: RequestsRoutesEnum;
  author?: string;
  userID?: number;
  maintenanceContractID?: number;
  softwareServiceContractID?: number;
  distributorRepresentativesContractID?: number;
}

interface ApproverModalState {
  justify: string;
  modal: boolean;
  modalActionType: RequestStatusEnum | null;
  approvalDTO: ApprovalDTO | null;
  setJustify: (justify: string) => void;
  showModal: (isVisible: boolean) => void;
  setModalActionType: (modalActionType: RequestStatusEnum | null) => void;
  setApprovalDTO: (approvalDTO: ApprovalDTO) => void;
  resetState: () => void;
}

const initialState = {
  justify: '',
  modal: false,
  modalActionType: null,
  approvalDTO: null,
};

export const useApproverModal = create<ApproverModalState>((set) => ({
  ...initialState,
  setJustify: (justify: string) => set({ justify }),
  setModalActionType: (modalActionType: RequestStatusEnum | null) =>
    set({ modalActionType }),
  showModal: (isVisible: boolean) => set({ modal: isVisible }),
  setApprovalDTO: (approvalDTO: ApprovalDTO) => set({ approvalDTO }),
  resetState: () => set({ ...initialState }),
}));
