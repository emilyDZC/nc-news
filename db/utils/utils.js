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

exports.renameKeys = (arr, keyToChange, newKey) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i][newKey] = arr[i][keyToChange];
    delete arr[i][keyToChange];
    newArr.push(arr[i]);
  }
  return newArr;
};

exports.formatComments = (comments, articleRef, renameKeys) => {
  // pass in commentData and refObj once created
  // comment created_by renamed to author
  // comment belongs_to renamed to article_id
  // article_id --> swap for one in refObj
  // created_at --> date object
  // keep all other properties
  console.log(comments)
let newObj = comments.map(obj => {
  return [...comments]
})
console.log(newObj)
return newObj;
// check migrations lecture notes bottom of page
};
