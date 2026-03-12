// const a = Buffer.from(
//   'eyJpZCI6IjY5OGFjYzkwOGQ2MzI0NmQ4NTg0Y2Y2MSIsImV4cGlyeSI6MTc3MTgyOTkwMn0',
//   'base64url',
// ).toString();
// console.log(a);

const a = Buffer.from(
  '{"id":"698acc908d63246d8584cf61","expiry":1780469902}',
).toString('base64url');

console.log(a);
