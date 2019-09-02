import convertToBlogDate from './blog-date.service';

describe('blog-date.service', (): void => {
  test('convertToBlogDate should format a date string using the default format', (): void => {
    expect(convertToBlogDate('2019-08-14')).toEqual('August 14, 2019');
  });

  test('convertToBlogDate should format a date string using the default format and add a leading zero', (): void => {
    expect(convertToBlogDate('2019-08-04')).toEqual('August 04, 2019');
  });

  test('convertToBlogDate should return an empty string when no date value passed', (): void => {
    expect(convertToBlogDate('undefined')).toEqual('');
  });
});
