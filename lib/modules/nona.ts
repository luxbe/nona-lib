import { Rpc } from '../services/rpc/rpc';
import { Accounts } from './accounts/accounts';
import { Blocks } from './blocks/blocks';
import { Key } from './key/key';

export class Nona {
  rpc: Rpc;
  blocks: Blocks;
  accounts: Accounts;
  key: Key;

  constructor(url = 'http://localhost:7076') {
    this.rpc = new Rpc({ url });
    this.blocks = new Blocks(this.rpc);
    this.key = new Key(this.rpc);
    this.accounts = new Accounts(this.rpc);
  }
}
