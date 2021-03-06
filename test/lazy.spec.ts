import { lazy, isLazy } from '../src/lazy';

describe('lazy', () => {
  const container = lazy((number: number) => number);

  test('should creates wrapper over function', () => {
    expect(isLazy(container)).toBe(true);
  });

  test('should map value', () => {
    const mapped = container.map((number) => Math.pow(number, 2));

    expect(mapped.run(2)).toBe(4);
  });

  test('should map value with chain method', () => {
    const chained = container.chain((number) =>
      lazy((first) => first + number + '!')
    );

    expect(chained.run(1)).toBe('2!');
  });

  test('should perform application operation', () => {
    const applied = container.apply(
      lazy((number) => (result) => number + result)
    );

    expect(applied.run(1)).toBe(2);
  });
});
