import { times } from './number';

describe('number util function', function() {
  it('should return string number with appropriate commas', function() {
    expect(times('4012409812409890110', 14012.50327654)).toBe(
      '56,223,905,643,214,831,919,876.3410194'
    );
    expect(times('83567324562351234', 0.873743993)).toBe('73,016,447,847,435,744.663637362');
    expect(times('83567324562351234', 1.3533420708)).toBe('113,095,176,074,428,122.7384953672');
  });
});
