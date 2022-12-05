import {useEffect, useRef, useState} from 'react';
import Block from '../block/Block';

function App(): JSX.Element {
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((response) => response.json())
      .then((rates) => {
        rates.rates["RUB"] = 1;
        ratesRef.current = rates.rates;
      })
  }, []);

  return (
    <div className="App">
      <Block
        value={0}
        currency={fromCurrency}
        onChangeValue={() => console.log()}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={0}
        currency={toCurrency}
        onChangeValue={() => console.log()}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;