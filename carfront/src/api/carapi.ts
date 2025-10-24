import axios, { AxiosRequestConfig } from "axios";
import { CarResponse, Car, CarEntity } from "../types";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt')?.replace('Bearer ', '');
  return {
      headers: {
        'Authorization' : token,
        'Content-Type': 'application/json',
      },
    };
};

export const getCars = async (): Promise<CarResponse[]> => {
  // 세션 스토리지 상에 'Bearer'가 포함되어있습니다. 근데 저희가 Postman에서 요청 날릴 때 'Bearer'부분을 빼놓고 붙여넣기 했었던 것을 떠올려서
  // 프론트 엔드 상에서 'Bearer '를 제거하고, 그걸 기준으로 요청을 날림.
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getAxiosConfig()
  );
  console.log(response.data._embedded.cars)
  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  // chanining method를 활용한 코드도 하나는 남겨두겠습니다.
  const response = await axios.delete(link, getAxiosConfig(),
  );
  return response.data;
};

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car, getAxiosConfig()
  );

  return response.data;
};

export const updateCar = async (carEntity: CarEntity): Promise<CarResponse> => {
  const response = await axios.put(carEntity.url, carEntity.car, getAxiosConfig());
  return response.data;
};
