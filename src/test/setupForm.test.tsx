/**
 * SetupForm Component Tests
 * 
 * Verifies BUG 1 fix: selected swipe-count button text is visible
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetupForm } from '../components/SetupForm';
import { GameProvider } from '../context/GameContext';
import { SettingsProvider } from '../context/SettingsContext';
import React from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, disabled, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button className={className} disabled={disabled} onClick={onClick} {...props}>{children}</button>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock audio hook
vi.mock('../hooks/useAudio', () => ({
  useBackgroundMusic: () => ({
    handleUserInteraction: vi.fn(),
  }),
}));

// Wrapper for rendering with providers
function renderWithProviders(ui: React.ReactElement) {
  return render(
    <SettingsProvider>
      <GameProvider>
        {ui}
      </GameProvider>
    </SettingsProvider>
  );
}

describe('SetupForm - BUG 1: Swipe Count Buttons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all question count options (15, 30, 50)', () => {
    renderWithProviders(<SetupForm />);
    
    // Find the count buttons by their test IDs
    expect(screen.getByTestId('count-option-15')).toBeInTheDocument();
    expect(screen.getByTestId('count-option-30')).toBeInTheDocument();
    expect(screen.getByTestId('count-option-50')).toBeInTheDocument();
  });

  it('shows visible text content on selected button', () => {
    renderWithProviders(<SetupForm />);
    
    // Default selected is 15
    const selectedButton = screen.getByTestId('count-option-15');
    
    // Verify the button contains the visible text "15"
    expect(selectedButton.textContent).toBe('15');
    
    // The selected button should have aria-pressed="true"
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('selected button has high-contrast background (not transparent)', () => {
    renderWithProviders(<SetupForm />);
    
    const selectedButton = screen.getByTestId('count-option-15');
    const className = selectedButton.className;
    
    // Selected button should have visible styling
    expect(className).toContain('bg-gradient-to-r');
    expect(className).toContain('from-secondary-400');
    expect(className).toContain('to-secondary-500');
    expect(className).toContain('text-slate-900'); // Dark text on yellow bg
  });

  it('unselected buttons have different styling', () => {
    renderWithProviders(<SetupForm />);
    
    // 30 is not selected by default
    const unselectedButton = screen.getByTestId('count-option-30');
    const className = unselectedButton.className;
    
    // Unselected button should have different styling
    expect(className).toContain('bg-gray-100');
    expect(className).toContain('text-gray-600');
    expect(unselectedButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('clicking a count option changes selection', () => {
    renderWithProviders(<SetupForm />);
    
    // Initially 15 is selected
    expect(screen.getByTestId('count-option-15')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('count-option-30')).toHaveAttribute('aria-pressed', 'false');
    
    // Click 30
    fireEvent.click(screen.getByTestId('count-option-30'));
    
    // Now 30 should be selected
    expect(screen.getByTestId('count-option-15')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('count-option-30')).toHaveAttribute('aria-pressed', 'true');
  });

  it('all count buttons have visible text that matches their values', () => {
    renderWithProviders(<SetupForm />);
    
    const counts = [15, 30, 50];
    
    counts.forEach((count) => {
      const button = screen.getByTestId(`count-option-${count}`);
      // Text content should match the number
      expect(button.textContent).toBe(count.toString());
      // Text should not be hidden (no text-transparent class)
      expect(button.className).not.toContain('text-transparent');
    });
  });
});

describe('SetupForm - Accessibility', () => {
  it('question count buttons have proper ARIA attributes', () => {
    renderWithProviders(<SetupForm />);
    
    const countOptions = [15, 30, 50];
    countOptions.forEach((count) => {
      const button = screen.getByTestId(`count-option-${count}`);
      expect(button).toHaveAttribute('aria-pressed');
    });
  });

  it('question count group has aria-label', () => {
    renderWithProviders(<SetupForm />);
    
    const group = screen.getByRole('group', { name: /question count/i });
    expect(group).toBeInTheDocument();
  });
});
