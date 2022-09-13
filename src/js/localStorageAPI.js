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
      return serializedState === null ? {watched: [], queue: []} : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }