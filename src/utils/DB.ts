import axios from 'axios';
import { api } from '../apis';

//get data
export const getData = async (pathName: string) => {
  try {
    const response = await axios.get(api + pathName);
    return response.data;
  } catch (e) {}
};
//get list data
export const getDataFilter = async (pathName: string) => {
  try {
    const response = await axios.get(api + pathName);
    return response;
  } catch (e) {}
};

//get data kem id
export const getDataForID = async (pathName: string, id: string) => {
  try {
    const response = await axios.get(`${api}${pathName}/${id}`);
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

export const deleteData = async (pathName: string, id: any) => {
  try {
    const response = await axios.delete(api + pathName + '/' + id); // Chú ý cách bạn kết hợp pathName và id.
    return response;
  } catch (e) {
    // Xử lý lỗi ở đây nếu cần.
  }
};
