const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
  renameKeys
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
  it('returns a reference object of title and article_id when passed an array of multiple objects', () => {
    expect(makeRefObj([{article_id: 1, title: 'A'}, {article_id: 2, title: 'B'}])).to.eql({A:1, B:2});
  });
  it('works when the object contains more key value pairs', () => {
    expect(makeRefObj([{article_id: 1, title: 'A', votes: 100}, {article_id: 2, title: 'B', votes: 2}])).to.eql({A:1, B:2});
    
  });
});

describe('formatComments', () => {
 it('returns a new array without mutating the original data', () => {
   const input = [{
  body:
    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 14,
  created_at: 1479818163389
}];
formatComments(input, {'Living in the shadow of a great man':2}, renameKeys);
expect(input).to.eql([{
  body:
    'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 14,
  created_at: 1479818163389
}])
 });
});
