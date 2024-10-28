import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from '../components/Tabs';
import { useGetTabsQuery } from '../redux/api/tabsAPI';

jest.mock('../redux/api/tabsAPI');

describe('Tabs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and shows loading state', () => {
    useGetTabsQuery.mockReturnValue({
      isLoading: true,
    });

    render(<Tabs />);
    expect(screen.getByTestId('spinner'))
  });

  test('renders error state', () => {
    useGetTabsQuery.mockReturnValue({
      isError: true,
      error: { message: 'Network Error' },
    });

    render(<Tabs />);
    expect(screen.getByText('Network Error')).toBeInTheDocument(); 
  });

  test('renders tabs and displays the correct content for the active tab', () => {
    useGetTabsQuery.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: 'Tab Content', 
    });

    render(<Tabs />);
    
    expect(screen.getByText(/tab 1/i)).toBeInTheDocument();
    expect(screen.getByText(/tab 2/i)).toBeInTheDocument();
    expect(screen.getByText(/tab 3/i)).toBeInTheDocument();
    expect(screen.getByText(/tab 4/i)).toBeInTheDocument();

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Tab Content')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/tab 2/i));
    
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  test('highlights the active tab', () => {
    useGetTabsQuery.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: 'Tab Content',
    });

    render(<Tabs />);
    
    expect(screen.getByText(/tab 1/i)).toHaveClass('active');

    fireEvent.click(screen.getByText(/tab 2/i));

    expect(screen.getByText(/tab 1/i)).not.toHaveClass('active');
    expect(screen.getByText(/tab 2/i)).toHaveClass('active');
  });
});
