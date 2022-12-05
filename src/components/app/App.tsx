import {useEffect, useRef, useState} from 'react';
import Block from '../block/Block';
import {RatesType} from '../../types/rates';

function App(): JSX.Element {
  const ratesRef = useRef<RatesType>({});

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
        onFromPriceChange(1);
      })
  }, []);

  const onFromPriceChange = (value: number) => {
    const result = (ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) * value;
    setFromPrice(value);
    setToPrice(result);
  };
  
  const onToPriceChange = (value: number) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setToPrice(value);
    setFromPrice(result);
  };

  useEffect(() => {
    onFromPriceChange(fromPrice);
  }, [toCurrency]);
  
  useEffect(() => {
    onToPriceChange(toPrice);
  }, [fromCurrency]);

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
