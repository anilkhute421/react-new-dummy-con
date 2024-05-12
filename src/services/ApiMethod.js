import Api from "./Api";

//post Api
export const postApi = async (url, data) => {
  try {
    let result = await Api.post(url, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};


//get Api
export const getApi = async (url, data) => {
  try {
    let result = await Api.get(url, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};
