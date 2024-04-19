import { Blocks } from '../../../lib/modules/blocks/blocks';
import { CreateBlockParams } from '../../../lib/modules/blocks/blocks-interface';
import { Block, BlockInfo } from '../../../lib/modules/blocks/blocks-schema';
import { Rpc } from '../../../lib/services/rpc/rpc';

describe('Blocks', () => {
  let blocks: Blocks;
  const rpcCallMock = jest.fn();
  const rpcMock = { call: rpcCallMock } as unknown as Rpc;

  beforeEach(() => {
    rpcCallMock.mockClear();
    blocks = new Blocks(rpcMock);
  });

  it('should create an instance of Blocks', () => {
    expect(blocks).toBeInstanceOf(Blocks);
  });

  it('should call block_count RPC method and parse the result', async () => {
    const countResponse = { count: '10', unchecked: '5', cemented: '5' };
    rpcCallMock.mockResolvedValue(countResponse);

    const result = await blocks.count();

    expect(rpcCallMock).toHaveBeenCalledWith('block_count');
    expect(result).toEqual(countResponse);
  });

  it('should call block_create RPC method with the provided params and parse the result', async () => {
    const createParams: CreateBlockParams = {
      account: 'account',
      previous: 'previousHash',
      representative: 'representative',
      balance: '1000',
      key: 'privateKey',
      link: 'link',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...createParamsWithoutKey } = createParams;
    const block: Block['block'] = {
      ...createParamsWithoutKey,
      type: 'state',
      link_as_account: 'linkAsAccount',
      signature: 'signature',
      work: 'work',
    };
    const createResponse: Block = { block, hash: 'processedHash' };
    rpcCallMock.mockResolvedValue(createResponse);

    const result = await blocks.create(createParams);

    expect(rpcCallMock).toHaveBeenCalledWith('block_create', {
      json_block: 'true',
      type: 'state',
      ...createParams,
    });
    expect(result).toEqual(createResponse.block);
  });

  it('should call process RPC method with the provided block and subtype, and parse the result', async () => {
    const block: Block['block'] = {
      type: 'state',
      account: 'account',
      previous: 'previousHash',
      representative: 'representative',
      balance: '1000',
      link: 'link',
      link_as_account: 'linkAsAccount',
      signature: 'signature',
      work: 'work',
    };
    const processResponse: Block = { block, hash: 'processedHash' };
    const subtype = 'send';
    rpcCallMock.mockResolvedValue(processResponse);

    const result = await blocks.process(block, subtype);

    expect(rpcCallMock).toHaveBeenCalledWith('process', {
      json_block: 'true',
      subtype,
      block,
    });
    expect(result).toEqual(processResponse.hash);
  });

  it('should call block_info RPC method with the provided hash and parse the result', async () => {
    const hash = 'blockHash';
    const infoResponse = {
      block_account: 'block_account',
      amount: 'amount',
      balance: 'balance',
      height: 'height',
      local_timestamp: '1713527539',
      successor: 'successor',
      confirmed: 'confirmed',
      contents: {
        type: 'type',
        account: 'account',
        previous: 'previous',
        representative: 'representative',
        balance: 'balance',
        link: 'link',
        link_as_account: 'link_as_account',
        signature: 'signature',
        work: 'work',
      },
      subtype: 'subtype',
    };
    rpcCallMock.mockResolvedValue(infoResponse);

    const result = await blocks.info(hash);

    expect(rpcCallMock).toHaveBeenCalledWith('block_info', {
      json_block: 'true',
      hash,
    });
    expect(result).toEqual(BlockInfo.parse(infoResponse));
  });
});
