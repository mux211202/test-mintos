import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import App from "../App";
import {CURRENCIES} from "../constants";
import {getCheckboxBySpan} from "./helpers";

test('shows all currencies from CURRENCIES array', async () => {
	render(<App />);
	const renderedCurrencies: HTMLElement[] = [];
	CURRENCIES.forEach(currency => {
		renderedCurrencies.push(screen.getByText(currency));
	})
	expect(renderedCurrencies).toHaveLength(CURRENCIES.length)
})

test('shows second currency after clicking on button', async () => {
	render(<App />);
	const usdButton = screen.getByText('USD');
	fireEvent.click(usdButton)
	const input = getCheckboxBySpan(usdButton);
	expect(input).toBeChecked()
	const usds = screen.getAllByText('USD');
	expect(usds).toHaveLength(2)
})

test('shows second currency after clicking on checkbox', async () => {
	render(<App />);
	const usdButton = screen.getByText('USD');
	const input = getCheckboxBySpan(usdButton);
	fireEvent.click(input)
	expect(input).toBeChecked()
	const usds = screen.getAllByText('USD');
	expect(usds).toHaveLength(2)
})

test('deletes selected currency from the page after clicking on button the second time', async () => {
	render(<App />);
	const usdButton = screen.getByText('USD');
	fireEvent.click(usdButton)
	fireEvent.click(usdButton)
	const input = getCheckboxBySpan(usdButton);
	expect(input).not.toBeChecked()
	const usds = screen.getAllByText('USD');
	expect(usds).toHaveLength(1)
})

test('deletes selected currency from the page after clicking on checkbox the second time', async () => {
	render(<App />);
	const usdButton = screen.getByText('USD');
	fireEvent.click(usdButton)
	const input = getCheckboxBySpan(usdButton);
	fireEvent.click(input)
	expect(input).not.toBeChecked()
	const usds = screen.getAllByText('USD');
	expect(usds).toHaveLength(1)
})

test('deletes selected currency from the page after clicking on cross in header', async () => {
	render(<App />);
	const usdButton = screen.getByText('USD');
	fireEvent.click(usdButton)
	const XButton = screen.getByText('X');
	expect(XButton).toBeInTheDocument();
	fireEvent.click(XButton)
	const usds = screen.getAllByText('USD');
	expect(usds).toHaveLength(1)
})