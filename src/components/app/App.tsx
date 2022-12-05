import React from 'react';
import Block from '../block/Block';

function App(): JSX.Element {
  return (
    <div className="App">
      <Block value={0} currency="RUB" onChangeCurrency={} />
      <Block value={0} currency="USD" />
    </div>
  );
}

export default App;