import axios from 'axios';
import { api } from '../apis';

//get data
export const getData = async (
  pathName: string,
  conditions: { key: string; value: string }[] = [],
) => {
  try {
    const conditionString = conditions
      .map((condition) => condition.key + '=' + condition.value)
      .join('&');
    const response = await axios.get(api + pathName + '?' + conditionString);

    return response.data;
  } catch (e) {}
};

//them moi
export const insertData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(api + pathName, data);

    return response.data;
  } catch (e) {}
};

//edit 1 phan
export const patchData = async (pathName: string, id: any, data: any) => {
  try {
    const response = await axios.patch(`${api}${pathName}/${id}`, data);

    return response.data;
  } catch (e) {}
};

//edit toan bo
export const putData = async (pathName: string, id: any, data: any) => {
  try {
    const response = await axios.put(`${api}${pathName}/${id}`, data);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
