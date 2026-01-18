import { test, expect } from '@playwright/test';

test.describe('Swipe Quiz', () => {
  test('completes full flow from setup to results', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Check we're on the setup screen
    await expect(page.getByText("Let's Find Your Vibe!")).toBeVisible();

    // Enter favorite things
    await page.getByPlaceholder(/What should we call you/i).fill('Alex');
    await page.getByPlaceholder(/I love cats, pizza/i).fill('cats, pizza, minecraft');

    // Click some category chips
    await page.getByRole('button', { name: /Animals/i }).click();
    await page.getByRole('button', { name: /Games/i }).click();

    // Click start button
    await page.getByRole('button', { name: /Let's Go/i }).click();

    // Wait for swipe screen to load
    await expect(page.getByText(/Swipe or use buttons/i)).toBeVisible({ timeout: 10000 });

    // Swipe through 5 cards using buttons
    for (let i = 0; i < 5; i++) {
      // Alternate between like and nope
      if (i % 2 === 0) {
        await page.getByRole('button', { name: /Love it/i }).click();
      } else {
        await page.getByRole('button', { name: /Not for me/i }).click();
      }
      
      // Small delay between swipes
      await page.waitForTimeout(300);
    }

    // Continue swiping until we see results or hit the limit
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
      // Check if we're on results screen
      const resultsVisible = await page.getByText(/You are\.\.\./i).isVisible().catch(() => false);
      if (resultsVisible) {
        break;
      }

      // Try to swipe
      const loveButton = page.getByRole('button', { name: /Love it/i });
      const isEnabled = await loveButton.isEnabled().catch(() => false);
      
      if (isEnabled) {
        await loveButton.click();
        await page.waitForTimeout(300);
      }
      
      attempts++;
    }

    // Verify results screen
    await expect(page.getByText(/You are\.\.\./i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Alex, you are/i)).toBeVisible();
    
    // Check for personality type elements
    await expect(page.getByText(/Your Swipe Stats/i)).toBeVisible();
    await expect(page.getByText(/Your Top Vibes/i)).toBeVisible();
    await expect(page.getByText(/You Might Also Like/i)).toBeVisible();
    
    // Verify play again button exists
    await expect(page.getByRole('button', { name: /Play Again/i })).toBeVisible();
  });

  test('can use keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Fill in the form
    await page.getByPlaceholder(/I love cats, pizza/i).fill('dogs, sports');
    
    // Start the game
    await page.getByRole('button', { name: /Let's Go/i }).click();

    // Wait for swipe screen
    await expect(page.getByText(/Swipe or use buttons/i)).toBeVisible({ timeout: 10000 });

    // Use arrow keys to swipe
    await page.keyboard.press('ArrowRight'); // Like
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowLeft'); // Nope
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowRight'); // Like

    // The game should still be running (we swiped 3 cards)
    // Just verify we can see progress
    await expect(page.locator('text=/\\d+\\/\\d+/')).toBeVisible();
  });

  test('undo button works', async ({ page }) => {
    await page.goto('/');

    // Fill and start
    await page.getByPlaceholder(/I love cats, pizza/i).fill('cats');
    await page.getByRole('button', { name: /Let's Go/i }).click();

    // Wait for swipe screen
    await expect(page.getByText(/Swipe or use buttons/i)).toBeVisible({ timeout: 10000 });

    // Swipe once
    await page.getByRole('button', { name: /Love it/i }).click();
    await page.waitForTimeout(300);

    // Undo button should be enabled
    const undoButton = page.getByRole('button', { name: /Undo/i });
    await expect(undoButton).toBeEnabled();

    // Click undo
    await undoButton.click();
    await page.waitForTimeout(300);

    // Progress should go back
    // The undo button might be disabled now
    await expect(undoButton).toBeDisabled();
  });

  test('shows error when no input provided', async ({ page }) => {
    await page.goto('/');

    // Try to start without any input
    await page.getByRole('button', { name: /Let's Go/i }).click();

    // Should show error message
    await expect(page.getByText(/Please tell us about your favorite things/i)).toBeVisible();
  });

  test('settings toggles work', async ({ page }) => {
    await page.goto('/');

    // Find and click the music toggle
    const musicToggle = page.getByRole('button', { name: /music/i });
    await musicToggle.click();

    // Find and click the motion toggle
    const motionToggle = page.getByRole('button', { name: /motion|animation/i });
    await motionToggle.click();

    // Both should still be clickable (toggling state)
    await expect(musicToggle).toBeEnabled();
    await expect(motionToggle).toBeEnabled();
  });

  test('standard mode shows results after exact swipe count', async ({ page }) => {
    await page.goto('/');

    // Enter minimum info
    await page.getByPlaceholder(/I love cats, pizza/i).fill('dinosaurs, space, robots');

    // Select 15 swipes (standard mode - smallest count for faster test)
    await page.getByTestId('swipe-count-15').click();

    // Start the game
    await page.getByRole('button', { name: /Let's Go/i }).click();

    // Wait for swipe screen to load
    await expect(page.getByText(/Swipe or use buttons/i)).toBeVisible({ timeout: 10000 });

    // Verify we're in standard mode with progress indicator
    await expect(page.locator('text=/0\\/15/')).toBeVisible();

    // Swipe exactly 15 times using buttons (more reliable than touch/keyboard)
    for (let i = 0; i < 15; i++) {
      const loveButton = page.getByRole('button', { name: /Love it/i });
      const nopeButton = page.getByRole('button', { name: /Not for me/i });
      
      // Alternate to get variety in results
      if (i % 3 === 0) {
        await nopeButton.click();
      } else {
        await loveButton.click();
      }
      
      // Wait for animation to complete
      await page.waitForTimeout(350);
    }

    // Results screen should appear automatically
    await expect(page.getByText(/You are\.\.\./i)).toBeVisible({ timeout: 5000 });
    
    // Should show personality type name
    const personalityText = page.locator('.font-display.text-3xl, .font-display.text-4xl');
    await expect(personalityText).toBeVisible();
    
    // Should show stats section
    await expect(page.getByText(/Your Swipe Stats/i)).toBeVisible();
    
    // Play again button should be visible
    await expect(page.getByRole('button', { name: /Play Again/i })).toBeVisible();
  });

  test('swipe count buttons are visible and have proper styling', async ({ page }) => {
    await page.goto('/');

    // Check each swipe count button exists and has visible text
    const countButtons = [15, 25, 50];
    
    for (const count of countButtons) {
      const button = page.getByTestId(`swipe-count-${count}`);
      await expect(button).toBeVisible();
      
      // Check button text is visible (not transparent)
      const buttonText = button.locator('text=' + count);
      await expect(buttonText).toBeVisible();
    }

    // Click one and verify it gets selected styling
    await page.getByTestId('swipe-count-25').click();
    
    // The selected button should have aria-pressed="true"
    await expect(page.getByTestId('swipe-count-25')).toHaveAttribute('aria-pressed', 'true');
  });
});
