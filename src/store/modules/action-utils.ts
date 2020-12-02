import { AxiosResponse } from 'axios';

export const parseList = (response: AxiosResponse) => {
  if (response.status !== 200) {
    throw Error(
      `Data could not be parsed due to status code ${response.status} not matching 200`
    );
  }
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response: AxiosResponse, code: number) => {
  if (response.status !== code) {
    throw Error(
      `Data could not be parsed due to status code ${response.status} not matching ${code}`
    );
  }
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};
