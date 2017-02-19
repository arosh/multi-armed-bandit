import React from 'react';
import { connect } from 'react-redux';
import { pull } from './actions';
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

const App = props => (
  <div className="container">
    <h1 className="text-center">残り{props.chance}回引けます</h1>
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button
        type="button" className="btn btn-primary btn-lg btn-block"
        onClick={() => props.pull(1)} disabled={props.disabled}
      >
        レバーを引く
        </button>
    </div>
    <div className="col-xs-offset-2 col-xs-3">
      <img src={slot} alt="スロットマシーン" className="img-responsive" style={styles.slot} />
      <button
        type="button" className="btn btn-primary btn-lg btn-block"
        onClick={() => props.pull(2)} disabled={props.disabled}
      >
        レバーを引く
        </button>
    </div>
    <div className="col-xs-offset-2 col-xs-8">
      <table className="table table-condensed" style={styles.table}>
        <thead>
          <tr>
            <th />
            <th>1</th>
            <th>2</th>
            <th>sum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{'\\[N_i(t)\\]'}</th>
            <td>{props.arm1all}</td>
            <td>{props.arm2all}</td>
            <td>{props.arm1all + props.arm2all}</td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\alpha_i(t)\\]'}</th>
            <td>{props.arm1success}</td>
            <td>{props.arm2success}</td>
            <td>{props.arm1success + props.arm2success}</td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\beta_i(t)\\]'}</th>
            <td>{props.arm1failure}</td>
            <td>{props.arm2failure}</td>
            <td>{props.arm1failure + props.arm2failure}</td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\mu_i(t)\\]'}</th>
            <td>{(props.arm1mu).toFixed(2)}</td>
            <td>{(props.arm2mu).toFixed(2)}</td>
            <td>{((props.arm1success + props.arm2success) / (props.arm1all + props.arm2all)).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">{'\\[\\mathrm{UCB}=\\mu_i(t)+\\sqrt{\\frac{\\log t}{2N_i(t)}}\\]'}</th>
            <td>{(props.arm1ucb).toFixed(2)}</td>
            <td>{(props.arm2ucb).toFixed(2)}</td>
            <td />
          </tr>
          <tr>
            <th scope="row">{'\\[\\mathrm{TS}\\sim\\beta(\\alpha_i(t)+1,\\beta_i(t)+1)\\]'}</th>
            <td>{(props.arm1ts).toFixed(2)}</td>
            <td>{(props.arm2ts).toFixed(2)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

App.propTypes = {
  pull: React.PropTypes.func.isRequired,
  chance: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.string.isRequired,
  arm1all: React.PropTypes.number.isRequired,
  arm2all: React.PropTypes.number.isRequired,
  arm1ucb: React.PropTypes.number.isRequired,
  arm2ucb: React.PropTypes.number.isRequired,
  arm1success: React.PropTypes.number.isRequired,
  arm1failure: React.PropTypes.number.isRequired,
  arm2success: React.PropTypes.number.isRequired,
  arm2failure: React.PropTypes.number.isRequired,
  arm1mu: React.PropTypes.number.isRequired,
  arm2mu: React.PropTypes.number.isRequired,
  arm1ts: React.PropTypes.number.isRequired,
  arm2ts: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  let disabled;
  if (state.chance <= 0) {
    disabled = 'disabled';
  } else {
    disabled = '';
  }
  const arm1all = state.arm1success + state.arm1failure;
  const arm2all = state.arm2success + state.arm2failure;
  const arm1mu = state.arm1success / arm1all;
  const arm2mu = state.arm2success / arm2all;
  const t = arm1all + arm2all + 1;
  const arm1ucb = arm1mu + Math.sqrt(Math.log(t) / (2 * arm1all));
  const arm2ucb = arm2mu + Math.sqrt(Math.log(t) / (2 * arm2all));
  return {
    ...state,
    arm1all,
    arm2all,
    arm1mu,
    arm2mu,
    arm1ucb,
    arm2ucb,
    disabled,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pull: (id) => { dispatch(pull(id)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
