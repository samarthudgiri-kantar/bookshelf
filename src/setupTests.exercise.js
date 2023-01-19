import '@testing-library/jest-dom/extend-expect'
import { act, waitFor } from '@testing-library/react'
import { queryCache } from 'react-query'
import * as auth from 'auth-provider'
import { server } from 'test/server'
import * as usersDB from 'test/data/users'
import * as listItemsDB from 'test/data/list-items'
import * as booksDB from 'test/data/books'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

afterEach(async () => {
  queryCache.clear()
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ])
})

afterEach(async () => {
  await waitFor(() => expect(queryCache.isFetching).toBe(0))
  if (jest.isMockFunction(setTimeout)) {
    act(() => jest.runOnlyPendingTimers())
    jest.useRealTimers()
  }
})