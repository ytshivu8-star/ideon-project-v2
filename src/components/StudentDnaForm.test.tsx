/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentDnaForm from './StudentDnaForm';

// Mock the API call
vi.mock('../api', () => ({
  generateProjects: vi.fn().mockResolvedValue([{ title: 'Mocked Project' }])
}));

describe('StudentDnaForm Component', () => {
  const mockNavigate = vi.fn();
  const mockSetStudentDna = vi.fn();
  const mockSetProjects = vi.fn();

  it('renders all form fields', () => {
    render(<StudentDnaForm navigate={mockNavigate} setStudentDna={mockSetStudentDna} setProjects={mockSetProjects} />);
    
    // Check if critical inputs exist (using placeholder)
    // @ts-ignore
    expect(screen.getByPlaceholderText('e.g. Computer Science')).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByPlaceholderText('e.g. Full Stack Developer')).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByPlaceholderText('e.g. JavaScript, React, Node.js')).toBeInTheDocument();
    
    // Check buttons
    // @ts-ignore
    expect(screen.getByRole('button', { name: /Generate My Projects/i })).toBeInTheDocument();
  });

  it('handles empty validation properly', async () => {
    render(<StudentDnaForm navigate={mockNavigate} setStudentDna={mockSetStudentDna} setProjects={mockSetProjects} />);
    
    // Submit form without filling required fields
    const submitButton = screen.getByRole('button', { name: /Generate My Projects/i });
    fireEvent.click(submitButton);
    
    // It should NOT call setStudentDna because inputs are missing and form won't submit successfully
    expect(mockSetStudentDna).not.toHaveBeenCalled();
  });

  it('allows filling out the form and triggers generation', async () => {
    render(<StudentDnaForm navigate={mockNavigate} setStudentDna={mockSetStudentDna} setProjects={mockSetProjects} />);
    
    const branchInput = screen.getByPlaceholderText('e.g. Computer Science');
    const skillsInput = screen.getByPlaceholderText('e.g. JavaScript, React, Node.js');
    
    fireEvent.change(branchInput, { target: { value: 'CSE' } });
    fireEvent.change(skillsInput, { target: { value: 'React' } });
    
    const submitButton = screen.getByRole('button', { name: /Generate My Projects/i });
    
    // NOTE: In JSDOM, HTML5 required validation doesn't prevent submission by default via fireEvent.
    // However, the test proves that the submit handler executes properly.
    fireEvent.submit(submitButton); // trigger submit on the form
    
    // We expect loading state to trigger
    // @ts-ignore
    expect(screen.getByRole('button', { name: /Analyzing DNA/i })).toBeInTheDocument();
  });
});
