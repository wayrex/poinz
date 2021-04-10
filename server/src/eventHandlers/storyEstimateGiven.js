/**
 * Stores the given estimation value on the story for the given user
 */
import {modifyStory} from './roomModifiers';

const storyEstimateGivenEventHandler = (room, eventPayload, userId) => {
  return modifyStory(room, eventPayload.storyId, (story) => ({
    ...story,
    estimations: {
      ...story.estimations,
      [userId]: {
        value: eventPayload.value,
        confidenceLevel: eventPayload.confidenceLevel ? eventPayload.confidenceLevel : 0
      }
    }
  }));
};

export default storyEstimateGivenEventHandler;
