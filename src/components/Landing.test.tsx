import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from './Landing';

describe('Landing Component', () => {
  it('renders correctly', () => {
    const mockNavigate = vi.fn();
    render(<Landing navigate={mockNavigate} />);
    // @ts-ignore
    expect(screen.getAllByText(/IDEON/i)[0]).toBeInTheDocument();
    
    // Check navigation interaction
    const getStartedButtons = screen.getAllByText(/Build My Project/i);
    fireEvent.click(getStartedButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('dna');
  });
});
