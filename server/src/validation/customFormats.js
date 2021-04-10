const EMAIL_REGEX =
  /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
const EMAIL_MAX_LENGTH = 254;
const ROOMID_REGEX = /^[-a-z0-9_]+$/;
const UUIDv4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const CsvDATAURL_REGEX =
  /^data:(text\/csv|application\/vnd.ms-excel|application\/csv|text\/x-csv|application\/x-csv|text\/comma-separated-values|text\/x-comma-separated-values);base64,/;
const USERNAME_REGEX = /^.{3,80}$/;

/**
 * registers our custom formats like "username" "email" "roomId" "uuid"  with the given tv4 instance
 * @param tvi
 */
export function registerCustomFormats(tvi) {
  tvi.addFormat('email', (data) => {
    if (!data) {
      return; // allow empty string, undefined, null
    }

    if (data.length > EMAIL_MAX_LENGTH) {
      return `string must not be more than ${EMAIL_MAX_LENGTH} characters`;
    }
    return validateStringFormat(EMAIL_REGEX, 'must be a valid email-address', data);
  });
  tvi.addFormat(
    'roomId',
    validateStringFormat.bind(
      undefined,
      ROOMID_REGEX,
      'must be a valid roomId: only the following characters are allowed: a-z 0-9 _ -'
    )
  );
  tvi.addFormat(
    'uuidv4',
    validateStringFormat.bind(undefined, UUIDv4_REGEX, 'must be a valid uuid v4')
  );
  tvi.addFormat(
    'csvDataUrl',
    validateStringFormat.bind(undefined, CsvDATAURL_REGEX, 'must be a valid text/csv data url')
  );
  tvi.addFormat(
    'username',
    validateStringFormat.bind(undefined, USERNAME_REGEX, 'must be a valid username')
  );
  tvi.addFormat('parseableNumber', parseableNumber);
  tvi.addFormat('cardConfig', cardConfigUniqueValue);
  tvi.addFormat('confidenceLevel', confidenceLevel);
}

function validateStringFormat(formatRegex, errorMsg, data) {
  if (!data) {
    return; // allow empty string, undefined, null
  }

  if (typeof data === 'string' && formatRegex.test(data)) {
    return;
  }

  return errorMsg;
}

/**
 * The whole cardConfig is validated through default tv4 mechanisms (see commandHandlers/setCardConfig.js  cardConfigSchema)
 * Here we check uniqueness of items in the array.
 *
 * @param {object[]} data
 */
function cardConfigUniqueValue(data) {
  if (!data) {
    return;
  }
  const valueArray = data.map((i) => i.value);
  if (new Set(valueArray).size !== valueArray.length) {
    return 'CardConfig must not contain two cards with the same value';
  }
}

/**
 * tv4 format validation function: if falsy value returned, data matches the format -> valid.
 * @param data
 * @return {string} Returns a string with an error/info message if given data is not valid
 */
export function parseableNumber(data) {
  if (Number.isFinite(data)) {
    return; // all good, it's a number, neither "nan" nor +/- Infinity
  }

  // maybe it's a string that is parseable to float.
  const parsedValue = parseFloat(data);
  if (isNaN(parsedValue)) {
    return 'Given value is not parseable to a number';
  }
}

/**
 * tv4 format validation function: if falsy value returned, data matches the format -> valid.
 * @param data
 * @return {string} Returns a string with an error/info message if given data is not valid
 */
export function confidenceLevel(data) {
  if (parseableNumber(data)) {
    return 'Given value is is not a valid confidenceLevel (not a number / parseable to a number)';
  }

  const parsedValue = parseFloat(data);
  if (parsedValue === 0 || parsedValue === -1 || parsedValue === 1) {
    return;
  }

  return 'Given value is not a valid confidenceLevel';
}
