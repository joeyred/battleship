/**
 * Create a series of state changes or other funtionality based on animation frames
 * and multi-step animations.
 *
 * @method series
 *
 * @param  {Object|Boolean} hooks - Callbacks to be executed at specific points
 *                                  in the series.
 * @param  {Function} [hooks.before] - Fired before the first frame is requested.
 * @param  {Function} [hooks.beforeEachFrame] - Fired before each frame.
 * @param  {Function} [hooks.beforeEachStep] - Fired before each step.
 * @param  {Function} [hooks.afterEachFrame] - Fired after each frame.
 * @param  {Function} [hooks.afterEachStep] - Fired after each step.
 * @param  {Function} [hooks.after] - Fired after final frame.
 *
 * @param  {Array[]} steps               - Array of `step` arrays.
 * @param  {Number} steps[].durration    - Ammount of frames in the step.
 * @param  {Object} steps[].partialState  - Partial to be passed to `this.setState`.
 * @param  {Function} [steps[].callback] - Optional callback function.
 */
const series = (hooks, ...steps) => {
  let stepIndex = 0;
  let start = null;
  let stepStart = null;
  let duration = {
    current:      0,
    previousStep: null,
    total:        0
  };
  let stepsFired = [];

  // Loop through the steps and put together whatever values may be needed.
  for (let i = 0; i < steps.length; i++) {
    // Get total duration
    duration.total += steps[i][0];
    // Set up Array for our fake loop.
    stepsFired.push(false);
  }


  function step(timestamp) {
    start = start ? start : timestamp;
    stepStart = stepStart ? stepStart : timestamp;
    let progress = timestamp - start;

    // HOOK: Before Each Frame
    if (hooks && hooks.beforeEachFrame) {
      hooks.beforeEachFrame();
    }
    // console.log('das a frame');
    // Actions per step
    if (progress >= duration.current && stepsFired[stepIndex] === false) {
      // console.log('step happening');
      let callback = steps[stepIndex][1] || false;

      // HOOK: Before Each Step
      if (hooks && hooks.beforeEachStep) {
        hooks.beforeEachStep();
      }

      // if there's a callback, fire it.
      if (callback) {
        callback();
      }
      stepsFired[stepIndex] = true;

      // only add to the durration as long as it isnt the last step.
      if (stepIndex !== steps.length) {
        duration.current += steps[stepIndex][0];
      }

      if (hooks && hooks.afterEachStep) {
        hooks.afterEachStep();
      }

      // Up the step index
      stepIndex++;
    }

    // HOOK: afterEachFrame
    if (hooks && hooks.afterEachFrame) {
      hooks.afterEachFrame();
    }

    // Invoke the next frame as long as the total duration of the animation series
    // hasn't been exceded.
    if (progress < duration.total) {
      window.requestAnimationFrame(step);
    } else {
      // HOOK: after
      if (hooks && hooks.after) {
        hooks.after();
      }
    }
  }
  // console.log('hello');
  window.requestAnimationFrame(step);
}

export default series;
