const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns the date in the correct format when passed unix timestamp', () => {
    const timeStamp = new Date(1542284514171);
    expect(formatDates([{ created_at : 1542284514171}])).to.eql([{ created_at: timeStamp }]);
  });
  it('works with an array of date objects', () => {
    const date1 = new Date(1542284514171);
    const date2 = new Date(1416140514171);
    expect(formatDates([{created_at: 1542284514171}, {created_at: 1416140514171}])).to.eql([{created_at: date1}, {created_at: date2}]);
  });
});    

describe('makeRefObj', () => {
  it('returns a reference object consisting of title and article_id', () => {
    expect(makeRefObj([{article_id: 1, title: 'A'}])).to.eql({A: 1});
  });
  it('returns a reference object when passed an array of multiple objects', () => {
    expect(makeRefObj([{article_id: 1, title: 'A'}, {article_id: 2, title: 'B'}])).to.eql({A:1, B:2});
  });
});

describe('formatComments', () => {});
