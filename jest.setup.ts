import '@testing-library/jest-dom/extend-expect';
import { server } from './src/mocks/server';
import { QueryCache } from 'react-query'

const queryCache = new QueryCache()
afterEach(() => {
  queryCache.clear()
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());