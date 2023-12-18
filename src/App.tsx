import { useCallback, useState } from 'react'
import './style/App.css'
import { CURRENCIES } from "./constants"
import Currency from "./Currency";

function App() {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([])

  const addCurrency = (currency: string) => {
    setSelectedCurrencies((state) => [...state, currency])
  }

  const deleteCurrency = (currency: string) => {
    setSelectedCurrencies((state) => {
      const newState = [...state];
      newState.splice(state.indexOf(currency), 1)
      return newState
    })
  }

  const handleCurrencyUpdate = useCallback(
    (currency: string) => {
      if(selectedCurrencies.includes(currency)) {
        deleteCurrency(currency)
      } else {
        addCurrency(currency)
      }
    }, [selectedCurrencies]
  );

  return (
    <section className="container">
      { selectedCurrencies.length > 0 &&
        <header className="selected-currencies">
          {
            selectedCurrencies.map(currency =>
              <Currency
                key={`selected-${currency}`}
                editable={false}
                updateCurrency={handleCurrencyUpdate}
                currency={currency}
              />
            )
          }
        </header>
      }
      <div className="currency-selector">
        {
          CURRENCIES.map(currency =>
            <Currency
              key={`select-${currency}`}
              editable={true}
              updateCurrency={handleCurrencyUpdate}
              currency={currency}
              checked={selectedCurrencies.includes(currency)}
            />
          )
        }
      </div>
    </section>
  )
}

export default App
