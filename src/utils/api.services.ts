import { AxiosError } from 'axios';
import { api } from '../apis';
import { axiosInstance } from '../apis/configAxios';
// const axiosInstance = createAxiosInstance();

//get data
export const getData = async (pathName: any) => {
  try {
    const response = await axiosInstance.get(api + pathName);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

//get data kem id
export const getDataForID = async (pathName: any, id: any) => {
  try {
    const response = await axiosInstance.get(`${api}${pathName}/${id}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

//them moi
export const insertData = async (pathName: any, data: any) => {
  try {
    const response = await axiosInstance.post(api + pathName, data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

//edit
export const updateData = async (pathName: any, id: any, data: any) => {
  try {
    const response = await axiosInstance.put(`${api}${pathName}${id}`, data);

    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};

export const deleteData = async (pathName: any, id: any) => {
  try {
    const response = await axiosInstance.delete(api + pathName + id);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
  }
};
