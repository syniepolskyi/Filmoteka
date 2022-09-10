export const storage = {
  queue: [],
  watched: [],
};
export const ANON_WATCHED = 'watched';
export const ANON_QUEUE = 'queue';
export const STORAGE = 'storage';
export const localStorageAPI = {
  save,
  load,
};

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

export function setSessionStorege() {
  const storegeData = localStorage.getItem(STORAGE);
  sessionStorage.setItem('store', storegeData);
}

export function setToLocalLybraryStorege() {
  const storegeData = sessionStorage.getItem('store');
  localStorage.setItem(STORAGE, storegeData);
}
