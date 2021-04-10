const migrateUtil = require('../migrate-util');

module.exports = {
  /**
   * transforms "estimations" in stories from a simple "userId->value" mapping to   "userId->{value:X,confidenceLevel:0}"
   */
  async up(db) {
    const ops = [];

    await db
      .collection('rooms')
      .find({})
      .forEach((room) => {
        if (room.stories) {
          room.stories = room.stories.map(addConfidenceLevelToEstimInStory);
          migrateUtil.toBulkOps(ops, room);
        }
      });

    if (ops.length) {
      return db.collection('rooms').bulkWrite(ops);
    }
  },

  /**
   * transforms "estimations" in stories back from "userId->{value:X,confidenceLevel:0}" to a simple "userId->value" mapping
   */
  async down(db) {
    const ops = [];

    await db
      .collection('rooms')
      .find({})
      .forEach((room) => {
        if (room.stories) {
          room.stories = room.stories.map(removeConfidenceLevelFromEstimInStory);
          migrateUtil.toBulkOps(ops, room);
        }
      });

    if (ops.length) {
      return db.collection('rooms').bulkWrite(ops);
    }
  }
};

const addConfidenceLevelToEstimInStory = (story) => {
  if (!story.estimations) {
    return story;
  }

  story.estimations = Object.entries(story.estimations).reduce((result, currentEstimEntry) => {
    const userId = currentEstimEntry[0];
    const value = currentEstimEntry[1];
    result[userId] = {value, confidenceLevel: 0};
    return result;
  }, {});

  return story;
};

const removeConfidenceLevelFromEstimInStory = (story) => {
  if (!story.estimations) {
    return story;
  }

  story.estimations = Object.entries(story.estimations).reduce((result, currentEstimEntry) => {
    result[currentEstimEntry[0]] = currentEstimEntry[1].value;
    return result;
  }, {});

  return story;
};
