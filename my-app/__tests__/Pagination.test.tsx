import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaginationComponent } from '@/components/Pagination/Pagination';

describe('PaginationComponent', () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  // Test 1: Verify that the pagination component renders exactly 10 clickable page links (excluding next/prev buttons)
  it('renders 10 clickable page links', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={15}
        onPageChange={onPageChangeMock}
      />
    );

    // Find all links that contain numeric text (1 to 10)
    const pageLinks = screen.getAllByRole('link', { name: /^[0-9]+$/ });

    //10 page links are present
    expect(pageLinks.length).toBe(10);
  });

  // Test 2: Verify that clicking the "Next" button changes the page number correctly
  it('clicks next button and changes page', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={15}
        onPageChange={onPageChangeMock}
      />
    );

    // Simulate clicking the NEXT button
    const nextButton = screen.getByRole('link', { name: /next/i });
    fireEvent.click(nextButton);

    // Check that onPageChange was called with page 2
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  // Test 3: Verify that clicking the "Previous" button changes the page number correctly
  it('clicks previous button and changes page', () => {
    render(
      <PaginationComponent
        currentPage={5}
        totalPages={15}
        onPageChange={onPageChangeMock}
      />
    );

    // Simulate clicking the PREV button
    const prevButton = screen.getByRole('link', { name: /previous/i });
    fireEvent.click(prevButton);

    // Check that onPageChange was called with page 4
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
