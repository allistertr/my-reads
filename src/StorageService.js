const KEY = 'my-reads-data';
const ANONYMOUS = 'anonymous';

export const saveData = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getData = () => {
  let data = JSON.parse(localStorage.getItem(KEY));
  if (data) return data;

  data = {
    "currentProfile": "anonymous",
    "profiles": {
      "anonymous": {
        "name": "anonymous",
        "language": "en",
        "books": []
      }
    }
  };

  return data;
};