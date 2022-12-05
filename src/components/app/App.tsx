import {useEffect, useRef, useState} from 'react';
import Block from '../block/Block';

function App(): JSX.Element {
  const ratesRef = useRef({});
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("RUB");
  const [fromPrice, setFromPrice] = useState<number>(0);
  const [toPrice, setToPrice] = useState<number>(0);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((response) => response.json())
      .then((rates) => {
        rates.rates["RUB"] = 1;
        ratesRef.current = rates.rates;
      })
  }, []);

  const onFromPriceChange = (value: number) => {
    setFromPrice(value);
  };
  
  const onToPriceChange = (value: number) => {
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeValue={onFromPriceChange}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onToPriceChange}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;