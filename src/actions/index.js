import { jStat } from 'jStat';

export function pull(id) {
  let prob;
  if (id === 1) {
    prob = 0.7;
  } else if (id === 2) {
    prob = 0.4;
  } else {
    console.error(`id = ${id}`);
  }
  const result = jStat.uniform.sample(0, 1) < prob;
  return {
    type: 'PULL',
    id,
    result,
  };
}

export function updateTS() {
  return (dispatch, getState) => {
    const state = getState();
    const alpha1 = state.arm1success;
    const beta1 = state.arm1failure;
    const alpha2 = state.arm2success;
    const beta2 = state.arm2failure;
    const sample1 = jStat.beta.sample(alpha1 + 1, beta1 + 1);
    const sample2 = jStat.beta.sample(alpha2 + 2, beta2 + 1);
    dispatch({
      type: 'UPDATE_TS',
      samples: [sample1, sample2],
    });
  };
}
