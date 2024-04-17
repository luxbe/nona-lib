import { Rpc } from '../services/rpc/rpc';
import { Account } from './account/account';
import { Blocks } from './blocks/blocks';
import { Key } from './key/key';
import { Node } from './node/node';
import { Wallet } from './wallet/wallet';
import { NonaWebSocket } from './websocket/websocket';

export class Nona {
  public rpc: Rpc;
  public ws: NonaWebSocket;
  public blocks: Blocks;
  public key: Key;
  public node: Node;

  // TODO: Set options in interface
  // TODO: Set default values in interface
  constructor(url = 'http://localhost:7076', webSocketUrl = 'ws://localhost:7078') {
    this.rpc = new Rpc({ url });
    this.ws = new NonaWebSocket({ url: webSocketUrl });
    this.blocks = new Blocks(this.rpc);
    this.key = new Key(this.rpc);
    this.node = new Node(this.rpc);
  }

  public account(address: string): Account {
    return new Account(address, this.ws, this.rpc);
  }

  public wallet(privateKey: string): Wallet {
    return new Wallet(privateKey, this.blocks, this.rpc, this.ws);
  }
}
