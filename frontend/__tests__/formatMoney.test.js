import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
  });

  it('leaves cents off for whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(1000)).toEqual('$10');
    expect(formatMoney(500000)).toEqual('$5,000');
  })

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(145)).toEqual('$1.45');
    expect(formatMoney(500001)).toEqual('$5,000.01');
  })
})