import getEstimationSummary from '../../app/components/EstimationArea/getEstimationSummary';

test('simple', () => {
  const estimationObjectForOneStory = {
    'userId-1': 3,
    'userId-2': 5,
    'userId-3': 5,
    'userId-4': 5,
    'userId-5': '3'
  };

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: 3,
    highest: 5,
    average: 4.2,
    estimationCount: 5,
    estimatedValues: {
      5: 3,
      3: 2
    }
  });
});

/*
 as of #192, we ignore negative values, which represent by default the "special" cards "?"  "BIG", etc.
 i.e. we also do not count the users that estimated / choose these (negative) cards => average is calculated:  Sum of all positive values devided by number of users that estimated positive values.
 */
test('negative values', () => {
  const estimationObjectForOneStory = {
    'userId-1': -1,
    'userId-2': -2,
    'userId-3': 5,
    'userId-4': 5,
    'userId-5': '8'
  };

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: -2,
    highest: 8,
    average: 6,
    estimationCount: 5,
    estimatedValues: {
      '-1': 1,
      '-2': 1,
      5: 2,
      8: 1
    }
  });
});

/*
#192
 */
test('only negative values', () => {
  const estimationObjectForOneStory = {
    'userId-1': -1,
    'userId-2': -2,
    'userId-3': -1
  };

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: -2,
    highest: -1,
    average: undefined,
    estimationCount: 3,
    estimatedValues: {
      '-1': 2,
      '-2': 1
    }
  });
});

test('decimal values', () => {
  const estimationObjectForOneStory = {
    'userId-1': 0.5,
    'userId-2': 5.5
  };

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: 0.5,
    highest: 5.5,
    average: 3,
    estimationCount: 2,
    estimatedValues: {
      0.5: 1,
      5.5: 1
    }
  });
});

test('rounding average', () => {
  const estimationObjectForOneStory = {
    'userId-1': 1,
    'userId-2': 3,
    'userId-3': 13
  };

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: 1,
    highest: 13,
    average: 5.67, // <-- round to two digit after the decimal point
    estimationCount: 3,
    estimatedValues: {
      1: 1,
      3: 1,
      13: 1
    }
  });
});

test('empty', () => {
  const estimationObjectForOneStory = {};

  const summary = getEstimationSummary(estimationObjectForOneStory);

  expect(summary).toEqual({
    lowest: undefined,
    highest: undefined,
    average: undefined,
    estimationCount: 0,
    estimatedValues: {}
  });
});
