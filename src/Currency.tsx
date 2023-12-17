import './style/Currency.css'
import React from "react"

interface CurrencyProps {
	currency: string,
	updateCurrency: (currency: string) => void
	editable: boolean,
	checked?: boolean
}

const Currency: React.FC<CurrencyProps> = React.memo((
	{
    currency,
		updateCurrency,
		editable,
		checked
	}) => {


	const containerClickHandler = () => {
		if (!editable) return;
		updateCurrency(currency);
	}

	const childClickHandler = (event: React.MouseEvent<HTMLInputElement | HTMLElement>) => {
		event.stopPropagation();
		updateCurrency(currency);
	}

	const className = editable ? "currency editable" : "currency";
	return (
		<div onClick={containerClickHandler} className={className} key={currency}>
			<input
				checked={checked}
				onClick={childClickHandler}
				type="checkbox"
				aria-label="checkbox"
				readOnly
			/>
			<span>{currency}</span>
			{ !editable && <span onClick={childClickHandler} className="cross">X</span>}
		</div>
	)
}, (prevProps, nextProps) => prevProps.checked === nextProps.checked)

export default Currency;
