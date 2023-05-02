const simulateWatchPosition = ({ steps, speed }, callback) => {
  const animationSpeed = speed || 1000;
  let currentStepIndex = 0;

  const intervalID = setInterval(() => {
    if (currentStepIndex >= steps.length) {
      clearInterval(intervalID);
      return;
    }

    const nextCoord = steps[currentStepIndex];

    if (callback) callback(nextCoord);

    currentStepIndex++;
  }, animationSpeed);

  window.intervalID = intervalID;
  window.pauseSimulation = () => clearInterval(window.intervalID);
};

