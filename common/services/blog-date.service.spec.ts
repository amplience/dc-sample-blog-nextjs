import convertToBlogDate from './blog-date.service';

describe('blog-date.service', (): void => {
  test('convertToBlogDate should format a date string using the default format', (): void => {
    expect(convertToBlogDate('2019-08-14')).toEqual('14 August, 2019');
  });

  test('convertToBlogDate should return an empty string when no date value passed', (): void => {
    expect(convertToBlogDate(undefined)).toEqual('');
  });
});
