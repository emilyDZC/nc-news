exports.formatDates = list => {
  return list.map(obj => {
    let date = new Date(obj.created_at);
    obj.created_at = date;
    return obj;
  });
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(obj => {
    refObj[obj.title] = obj.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
