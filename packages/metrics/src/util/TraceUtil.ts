'use strict';

import * as xorshift from 'xorshift';

export function getRandom64() {
  let randint = xorshift.randomint();
  let buf = new Buffer(8);
  buf.writeUInt32BE(randint[0], 0);
  buf.writeUInt32BE(randint[1], 4);

  return buf.toString('hex');
}

function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

export function convertObjectToTags(object) {
  const tags = [];

  Object.keys(object).forEach((key) => {
    let value = object[key];

    if (isObjectLike(value)) {
      value = JSON.stringify(value);
    }

    tags.push({key, value});
  });

  return tags;
}