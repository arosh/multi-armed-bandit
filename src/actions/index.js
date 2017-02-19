import { jStat } from 'jStat';

export function updateTS() {
  return (dispatch, getState) => {
    const { arm1success, arm1failure, arm2success, arm2failure } = getState();
    const sample1 = jStat.beta.sample(arm1success + 1, arm1failure + 1);
    const sample2 = jStat.beta.sample(arm2success + 1, arm2failure + 1);
    dispatch({
      type: 'UPDATE_TS',
      samples: [sample1, sample2],
    });
  };
}

function bernoulli(p) {
  return jStat.uniform.sample(0, 1) < p;
}

export function pull(id) {
  let prob;
  if (id === 1) {
    prob = 0.7;
  } else if (id === 2) {
    prob = 0.4;
  } else {
    console.error(`id = ${id}`);
  }
  const result = bernoulli(prob);
  return (dispatch) => {
    dispatch({
      type: 'PULL',
      id,
      result,
    });
    dispatch(updateTS());
  };
}
