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
});
