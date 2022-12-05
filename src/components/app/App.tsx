import {useEffect, useRef} from 'react';
import Block from '../block/Block';

function App(): JSX.Element {
  const ratesRef = useRef({});

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((response) => response.json())
      .then((rates) => {
        ratesRef.current = rates.rates;
      })
  }, []);

  return (
    <div className="App">
      {/* <Block value={0} currency="RUB" onChangeCurrency={} />
      <Block value={0} currency="USD" /> */}
    </div>
  );
}

export default App;