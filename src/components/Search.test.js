import { fireEvent, render, waitFor } from '@testing-library/vue';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Search from './Search.vue';
import {
  userSearch,
  userInfo,
  repoSearch,
  altUserInfo,
  altRepoSearch,
} from '../../tests/utils/mockResponses';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('https://api.github.com/search/users', (req, res, ctx) => {
    return res(ctx.json(userSearch));
  }),

  rest.get('https://api.github.com/users/brianTest', (req, res, ctx) => {
    return res(ctx.json(userInfo));
  }),

  rest.get('https://api.github.com/users/brianTesting', (req, res, ctx) => {
    return res(ctx.json(altUserInfo));
  }),

  rest.get('https://api.github.com/users/brianTest/repos', (req, res, ctx) => {
    return res(ctx.json(repoSearch));
  }),

  rest.get(
    'https://api.github.com/users/brianTesting/repos',
    (req, res, ctx) => {
      return res(ctx.json(altRepoSearch));
    }
  )
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test('renders as expecrted', async () => {
  const { getByTestId } = render(Search);
  getByTestId('search');
});

test('renders correct user count after search button is clicked', async () => {
  const { getByTestId, getByPlaceholderText } = render(Search);
  const input = getByPlaceholderText('Brian Barrow');
  await fireEvent.update(input, 'brian');
  const button = getByTestId('searchButton');
  await fireEvent.click(button);
  await waitFor(() => getByTestId('numberOfUsers'));
  const userText = getByTestId('numberOfUsers');
  expect(userText).toHaveTextContent('14 Users');
});

test('renders follower count as expected', async () => {
  const { getByTestId, getByPlaceholderText } = render(Search);
  const input = getByPlaceholderText('Brian Barrow');
  await fireEvent.update(input, 'brian');
  const button = getByTestId('searchButton');
  await fireEvent.click(button);
  await waitFor(() => getByTestId('followerCount-14'));
  const followerCountText = getByTestId('followerCount-14');
  expect(followerCountText).toHaveTextContent('Followers: 2,608');
});

test('renders star count as expected', async () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(Search);
  const input = getByPlaceholderText('Brian Barrow');
  await fireEvent.update(input, 'brian');
  const button = getByTestId('searchButton');
  await fireEvent.click(button);
  await waitFor(() => getByTestId('starCount-14'));
  const starCountText = getByTestId('starCount-14');
  await waitFor(() => getByText('Stars: 30'));
  expect(starCountText).toHaveTextContent('Stars: 30');
});
