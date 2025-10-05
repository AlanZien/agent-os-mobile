import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks';

import { Button } from '@/components/Button';
import { UserListScreen } from '@/screens/UserListScreen';
import { useAuth } from '@/hooks/useAuth';
import { fetchUsers } from '@/services/api';

// Mock dependencies
jest.mock('@/services/api');
jest.mock('@react-navigation/native');

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );

    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPressMock} />
    );

    fireEvent.press(getByText('Click me'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading prop is true', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Click me" onPress={() => {}} loading={true} />
    );

    expect(queryByText('Click me')).toBeNull();
    // ActivityIndicator should be visible
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPressMock} disabled={true} />
    );

    fireEvent.press(getByText('Click me'));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('handles async onPress correctly', async () => {
    const asyncMock = jest.fn().mockResolvedValue(undefined);
    const { getByText } = render(
      <Button title="Click me" onPress={asyncMock} />
    );

    fireEvent.press(getByText('Click me'));

    await waitFor(() => {
      expect(asyncMock).toHaveBeenCalledTimes(1);
    });
  });

  it('applies correct styles for different variants', () => {
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={() => {}} variant="primary" />
    );

    const button = getByText('Primary').parent;
    // Assert primary styles

    rerender(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />
    );
    // Assert secondary styles
  });
});

describe('UserListScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (fetchUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const { getByTestId } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders user list after successful fetch', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { getByText } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });
  });

  it('renders error state when fetch fails', async () => {
    const errorMessage = 'Failed to load users';
    (fetchUsers as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { getByText } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });

  it('navigates to user detail when user is pressed', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ];

    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { getByText } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });

    fireEvent.press(getByText('John Doe'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('UserDetail', {
      userId: '1',
    });
  });

  it('handles pull to refresh', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ];

    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { getByTestId } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    await waitFor(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(1);
    });

    const flatList = getByTestId('user-flat-list');
    fireEvent(flatList, 'refresh');

    await waitFor(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(2);
    });
  });

  it('renders empty state when no users', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(
      <UserListScreen navigation={mockNavigation as any} route={{} as any} />
    );

    await waitFor(() => {
      expect(getByText('No users found')).toBeTruthy();
    });
  });
});

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('successfully logs in user', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    const mockToken = 'mock-token';

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: mockUser, token: mockToken }),
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('john@example.com', 'password123');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles login failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      try {
        await result.current.login('john@example.com', 'wrongpassword');
      } catch (err) {
        // Expected to throw
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Invalid credentials');
  });

  it('successfully logs out user', async () => {
    const { result } = renderHook(() => useAuth());

    // First login
    await act(async () => {
      await result.current.login('john@example.com', 'password123');
    });

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('Integration: Login Flow', () => {
  it('completes full login flow from screen to authenticated state', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: mockUser, token: 'mock-token' }),
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Fill in login form
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    // Submit form
    fireEvent.press(getByText('Login'));

    // Wait for login to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('john@example.com'),
        })
      );
    });
  });
});

// E2E Test Example (Detox)
describe('E2E: User List Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display user list and navigate to detail', async () => {
    await waitFor(element(by.id('user-list-screen')))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.text('John Doe'))).toBeVisible();

    await element(by.text('John Doe')).tap();

    await expect(element(by.id('user-detail-screen'))).toBeVisible();
    await expect(element(by.text('john@example.com'))).toBeVisible();
  });

  it('should handle pull to refresh', async () => {
    await waitFor(element(by.id('user-list-screen')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('user-flat-list')).swipe('down', 'fast', 0.8);

    await waitFor(element(by.id('loading-indicator')))
      .toBeVisible()
      .withTimeout(2000);

    await waitFor(element(by.id('loading-indicator')))
      .not.toBeVisible()
      .withTimeout(5000);
  });
});
