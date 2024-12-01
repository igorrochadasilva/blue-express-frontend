export interface RequestItem {
  type: string;
  status: string;
  statusColor: string;
  requestDate: string;
  requester: string;
  approver: string;
  SLA: number;
  id: number;
  order: number;
  link: string;
}

export type barData = {
  text: string;
  color: string;
  barSize: number;
  qtd: number;
};
