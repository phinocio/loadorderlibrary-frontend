import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
	it('Renders hello world', () => {
		// Setup
		render(<App />);
		// Interact
		// Inspect
		expect(
			screen.getByRole('heading', {
				level: 1,
			})
		).toHaveTextContent('Hello World!');
	});
});
