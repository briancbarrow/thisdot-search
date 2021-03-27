import { fireEvent, render, waitFor } from '@testing-library/vue';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Search from './Search.vue';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('https://api.github.com/search/users', (req, res, ctx) => {
    const query = req.url.searchParams;
    const q = query.get('q');
    const page = query.get('page');
    const per_page = query.get('per_page');
    console.log('HERE', q, page, per_page);
    // respond using a mocked JSON body
    return res(
      ctx.json({
        total_count: 4,
        items: [
          {
            login: 'brian',
            id: 657,
            avatar_url: 'https://avatars.githubusercontent.com/u/657?v=4',
            url: 'https://api.github.com/users/brian',
            repos_url: 'https://api.github.com/users/brian/repos',
          },
          {
            login: 'brianyu28',
            id: 16066224,
            avatar_url: 'https://avatars.githubusercontent.com/u/16066224?v=4',
            url: 'https://api.github.com/users/brianyu28',
            repos_url: 'https://api.github.com/users/brianyu28/repos',
          },
          {
            login: 'testBrian',
            id: 16066424,
            avatar_url: 'https://avatars.githubusercontent.com/u/16066424?v=4',
            url: 'https://api.github.com/users/testBrian',
            repos_url: 'https://api.github.com/users/testBrian/repos',
          },
          {
            login: 'brianTest',
            id: 18966224,
            avatar_url: 'https://avatars.githubusercontent.com/u/18966224?v=4',
            url: 'https://api.github.com/users/brianTest',
            repos_url: 'https://api.github.com/users/brianTest/repos',
          },
        ],
      })
    );
  })
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

test('renders list of users after search button is clicked', async () => {
  const { getByTestId, getByPlaceholderText } = render(Search);
  const input = getByPlaceholderText('Brian Barrow');
  await fireEvent.update(input, 'brian');
  const button = getByTestId('searchButton');
  await fireEvent.click(button);
  await waitFor(() => getByTestId('numberOfUsers'));
  const userText = getByTestId('numberOfUsers');
  expect(userText).toHaveTextContent('4 Users');
});
