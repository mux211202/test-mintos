import {within} from "@testing-library/react";

//returns the checkbox, that is related to the same currency
export const getCheckboxBySpan = (span: HTMLElement): HTMLElement => {
	// eslint-disable-next-line testing-library/no-node-access
	const container = span.parentElement as HTMLElement;
	const input = within(container).getByLabelText('checkbox')
	return input
}