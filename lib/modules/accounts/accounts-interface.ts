import {
  ConfirmationFilter,
  WebSocketConfirmationParams,
} from '../websocket/confirmation/websocket-confirmation-interface';

export interface ReceivableOptions {
  account: string;
  count?: number;
  sort?: boolean;
}

export interface ReceivableOptionsSorted extends ReceivableOptions {
  sort: true;
}

export interface ReceivableOptionsUnsorted extends ReceivableOptions {
  sort?: false;
}

export type ReceivableHasheBlocks = string[];
export type ReceivableValueBlocks = {
  [key: string]: string;
};
export type Receivable = ReceivableHasheBlocks | ReceivableValueBlocks;

export interface AccountBalance {
  balance: string;
  pending: string;
  receivable: string;
}

export type ListenConfirmationParams = Omit<WebSocketConfirmationParams, 'filter'> & {
  filter?: Omit<ConfirmationFilter, 'accounts'>;
};
