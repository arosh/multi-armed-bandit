import React from 'react';
import slot from './money_slot_machine.png';

const styles = {
  slot: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  table: {
    marginTop: '1em',
  },
};

const App = () => (
  <div className="container">
    <h1 className="text-center">残り100回引けます</h1>
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button type="button" className="btn btn-primary btn-lg btn-block">レバーを引く</button>
    </div>
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button type="button" className="btn btn-primary btn-lg btn-block">レバーを引く</button>
    </div>
    <div className="col-xs-offset-2 col-xs-8">
      <table className="table table-condensed" style={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{'\\[N_i(t)\\]'}</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\alpha_i(t)\\]'}</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\beta_i(t)\\]'}</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\mu_i(t)\\]'}</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\mathrm{UCB}=\\mu_i(t)+\\sqrt{\\frac{\\log t}{2N_i(t)}}\\]'}</th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\mathrm{TS}\\sim\\beta(\\alpha_i(t)+1,N_i(t)-\\alpha_i(t)+1)\\]'}</th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default App;
