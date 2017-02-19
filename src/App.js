import React from 'react';
import slot from './money_slot_machine.png';

const styles = {
  slot: {
    marginBottom: '1em',
  },
};

const App = () => (
  <div className="container">
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button type="button" className="btn btn-primary btn-lg btn-block">レバーを引く</button>
    </div>
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button type="button" className="btn btn-primary btn-lg btn-block">レバーを引く</button>
    </div>
  </div>
);

export default App;
