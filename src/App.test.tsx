import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from './App';

describe('App Routing', () => {
  it('renders landing page by default', () => {
    render(<App />);
    // @ts-ignore
    expect(screen.getByText(/From Idea to Innovation/i)).toBeInTheDocument();
  });
});
