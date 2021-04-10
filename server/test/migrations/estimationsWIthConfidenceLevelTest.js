import {v4 as uuid} from 'uuid';

import initDb from './db';
import withConfidenceLevel from '../../migrations/20210409061632-estimations-with-confidenceLevel';
import {throwIfBulkWriteResultInvalid} from './migrationTestUtil';

test('DBMIGRATION: migrate "estimations" from simple userId->value to userId->{value,confidenceLevel}', async () => {
  const [db, roomz] = await initDb();

  // insert room with users
  const roomId = uuid();
  const preRoom = {
    id: roomId,
    users: [
      {
        id: 'cf35de30-962f-4126-a5ac-f2f83cc4133d',
        username: 'Alex',
        avatar: 9
      },
      {
        id: '02447407-a841-470c-bc42-fa338d172654',
        username: 'Ronny',
        avatar: 0
      }
    ],
    stories: [
      {
        title: '11472',
        description: '',
        id: '7fff9ca8-452c-4e7e-a9e2-e2fd2d7ac44d',
        estimations: {
          'cf35de30-962f-4126-a5ac-f2f83cc4133d': 5
        },
        createdAt: 1599469016288,
        revealed: true
      },
      {
        title: '11472',
        description: '',
        id: 'ff69950c-b276-40b3-b02f-3eef0fddf8d4',
        estimations: {
          'cf35de30-962f-4126-a5ac-f2f83cc4133d': 8,
          '02447407-a841-470c-bc42-fa338d172654': 3
        },
        createdAt: 1599469016288,
        revealed: true
      },
      {
        id: '4a1d1faa-4407-40ff-bad2-1de3a6a86e77',
        title: 'Client Basket: New Info Product type',
        estimations: {},
        createdAt: 1602919851440.0
      },
      {
        id: 'fa430360-621b-493a-a33c-39be4e395039',
        title: 'Third Story',
        createdAt: 1602919851440.0
      }
    ]
  };

  await roomz.insertOne(preRoom);

  // migrate "up"
  const bWriteResult = await withConfidenceLevel.up(db);
  throwIfBulkWriteResultInvalid(bWriteResult);

  const room = await roomz.findOne({id: roomId});

  expect(room.stories[0].estimations).toEqual({
    'cf35de30-962f-4126-a5ac-f2f83cc4133d': {value: 5, confidenceLevel: 0}
  });
  expect(room.stories[1].estimations).toEqual({
    'cf35de30-962f-4126-a5ac-f2f83cc4133d': {value: 8, confidenceLevel: 0},
    '02447407-a841-470c-bc42-fa338d172654': {value: 3, confidenceLevel: 0}
  });
  expect(room.stories[2].estimations).toEqual({});
  expect(room.stories[3].estimations).toBeUndefined();
});

test('DBMIGRATION: migrate "estimations" back (down) from userId->{value,confidenceLevel} to simple userId->value', async () => {
  const [db, roomz] = await initDb();

  // insert room with users
  const roomId = uuid();
  const preRoom = {
    id: roomId,
    users: [
      {
        id: 'cf35de30-962f-4126-a5ac-f2f83cc4133d',
        username: 'Alex',
        avatar: 9
      },
      {
        id: '02447407-a841-470c-bc42-fa338d172654',
        username: 'Ronny',
        avatar: 0
      }
    ],
    stories: [
      {
        title: '11472',
        description: '',
        id: '7fff9ca8-452c-4e7e-a9e2-e2fd2d7ac44d',
        estimations: {
          'cf35de30-962f-4126-a5ac-f2f83cc4133d': {value: 5, confidenceLevel: 1}
        },
        createdAt: 1599469016288,
        revealed: true
      },
      {
        title: '11472',
        description: '',
        id: 'ff69950c-b276-40b3-b02f-3eef0fddf8d4',
        estimations: {
          'cf35de30-962f-4126-a5ac-f2f83cc4133d': {value: 8, confidenceLevel: 0},
          '02447407-a841-470c-bc42-fa338d172654': {value: 3, confidenceLevel: -1}
        },
        createdAt: 1599469016288,
        revealed: true
      },
      {
        id: '4a1d1faa-4407-40ff-bad2-1de3a6a86e77',
        title: 'Client Basket: New Info Product type',
        estimations: {},
        createdAt: 1602919851440.0
      },
      {
        id: 'fa430360-621b-493a-a33c-39be4e395039',
        title: 'Third Story',
        createdAt: 1602919851440.0
      }
    ]
  };

  await roomz.insertOne(preRoom);

  // migrate "up"
  const bWriteResult = await withConfidenceLevel.down(db);
  throwIfBulkWriteResultInvalid(bWriteResult);

  const room = await roomz.findOne({id: roomId});

  expect(room.stories[0].estimations).toEqual({'cf35de30-962f-4126-a5ac-f2f83cc4133d': 5});
  expect(room.stories[1].estimations).toEqual({
    'cf35de30-962f-4126-a5ac-f2f83cc4133d': 8,
    '02447407-a841-470c-bc42-fa338d172654': 3
  });
  expect(room.stories[2].estimations).toEqual({});
  expect(room.stories[3].estimations).toBeUndefined();
});
