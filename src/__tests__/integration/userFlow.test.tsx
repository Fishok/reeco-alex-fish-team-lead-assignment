import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { makeServer } from '@/mocks/server';
import { store } from '@/store/store.ts';
import Users from '@/components/users';
import { Server } from 'miragejs/server';
import { AnyFactories, AnyModels, Registry } from 'miragejs/-types';

let server: Server<Registry<AnyModels, AnyFactories>>;

beforeAll(() => {
  server = makeServer();
});

afterAll(() => {
  server.shutdown();
});

describe('User integration flow', () => {
  it('renders list of users', async () => {
    render(
      <Provider store={store}>
        <Users />
      </Provider>
    );

    expect(await screen.findByText(/Alice Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Smith/i)).toBeInTheDocument();
  });

  it('toggles user active status', async () => {
    render(
      <Provider store={store}>
        <Users />
      </Provider>
    );

    const toggleThumbs = await screen.findAllByTestId('toggle-thumb');
    const firstToggle = toggleThumbs[0];
    const beforeClass = firstToggle.className;
    await userEvent.click(firstToggle.parentElement!);

    await waitFor(() => {
      const afterClass = firstToggle.className;
      expect(afterClass).not.toBe(beforeClass);
    });
  });

  it('deletes a user and removes from UI', async () => {
    render(
      <Provider store={store}>
        <Users />
      </Provider>
    );

    await screen.findByText('Carol White');
    const deleteIcon = screen.getByTestId('delete-icon-3');
    await userEvent.click(deleteIcon);

    await screen.findByText('Are you sure you want to delete this user?');
    await userEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Carol White')).not.toBeInTheDocument();
    });
  });
});
