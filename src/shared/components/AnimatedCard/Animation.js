import { Easing, Animated } from 'react-native';

const assertDefinedAndNotNull = (message, variable) => {
  if (variable === undefined || variable === null) {
    throw new Error(message);
  }
};

const bindAnimationToPromiseAndStart = (animation) => {
  const promise = new Promise((resolve) => {
    animation.start(resolve);
  });

  return promise;
};

class Animation {
  constructor(duration = 300) {
    this.duration = duration;
  }

  getStartVariables() {}

  async run(animationVariables) {}
}

export class TransitionAnimation extends Animation {
  constructor(targetValues = {}, duration) {
    super(duration);
    console.log(targetValues.offsetX);
    this.targetValues = targetValues;
  }

  async run(animationVariables) {
    const targetValuesKeys = Object.keys(this.targetValues);

    if (targetValuesKeys.length === 0) {
      return Promise.resolve();
    }

    return Promise.all(
      targetValuesKeys.map(
        targetKey => this.runAnimationForVariable(targetKey, animationVariables[targetKey]),
      ),
    );
  }

  runAnimationForVariable(key, variable) {
    if (!variable) {
      console.log(`No variable for animating '${key}' value provided`);

      return Promise.resolve();
    }

    return bindAnimationToPromiseAndStart(
      Animated.timing(
        variable,
        {
          toValue: this.targetValues[key],
          duration: this.duration,
          easing: Easing.linear,
        },
      ),
    );
  }
}

export class FadeInAnimation extends TransitionAnimation {
  constructor(duration) {
    super({ opacity: 1, scale: 1 }, duration);
  }

  getStartVariables() {
    return {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.2),
    };
  }

  async run(animationVariables = {}) {
    assertDefinedAndNotNull('Opacity is required', animationVariables.opacity);
    assertDefinedAndNotNull('Scale is required', animationVariables.scale);

    return super.run(animationVariables);
  }
}

export class RotateAnimation extends Animation {
  constructor(halfwayThroughRotationCallback) {
    super();

    this.halfwayThroughRotationCallback = halfwayThroughRotationCallback;
  }

  async run({ rotationY } = {}) {
    assertDefinedAndNotNull('RotationY is required', rotationY);

    await bindAnimationToPromiseAndStart(Animated.sequence([
      Animated.timing(
        rotationY,
        {
          toValue: 90,
          duration: this.duration,
        },
      ),
    ]));

    if (this.halfwayThroughRotationCallback) {
      this.halfwayThroughRotationCallback();
    }

    await bindAnimationToPromiseAndStart(Animated.sequence([
      Animated.timing(
        rotationY,
        {
          toValue: 270,
          duration: 0,
        },
      ),
      Animated.timing(
        rotationY,
        {
          toValue: 360,
          duration: this.duration,
        },
      ),
      Animated.timing(
        rotationY,
        {
          toValue: 0,
          duration: 0,
        },
      ),
    ]));
  }
}
