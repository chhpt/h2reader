export const saveData = async (key, data) => {
  if (key.indexOf('_') > -1) throw new Error('key 不能包含下滑线');
  global.storage.save({
    key,
    data
  });
};

export const getData = async key => {
  return new Promise((resolve, reject) => {
    global.storage
      .load({ key })
      .then(value => {
        resolve(value);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const removeData = key => {
  global.storage.remove({
    key
  });
};

export const clearData = () => {
  global.storage.clearMap();
};
