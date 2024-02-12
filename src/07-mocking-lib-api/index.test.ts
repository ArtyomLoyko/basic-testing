// Uncomment the code below and write your tests
import { throttledGetDataFromApi } from './index';
import axios from 'axios';

const relativePath = 'some/path';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({});

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({});

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = 'some data';
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe(responseData);
  });
});
