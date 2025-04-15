import {useMutation, useQuery} from "@tanstack/react-query";
import {httpClient} from "../httpClient";
import {API_ROUTE} from "./api";
import {Data, MasterData, MasterDataPatient} from "./interface";

export const getCountryName = (countryId: string, countries: Data) => {
  return Object.entries(countries).find(([key, _]) => key == countryId)?.[1];
};

const getMasterData = () => {
  return httpClient.get<MasterData>(API_ROUTE.GET_MASTER_DATA);
};

const useGetMasterData = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_MASTER_DATA],
    queryFn: getMasterData,
    select: (response) => response.data,
  });
};

const getMasterDataPatient = () => {
  return httpClient.get<MasterDataPatient>(API_ROUTE.GET_MASTER_DATA_PATIENT);
};

const useGetMasterDataPatient = () => {
  return useQuery({
    queryKey: [API_ROUTE.GET_MASTER_DATA_PATIENT],
    queryFn: getMasterDataPatient,
    select: (response) => response.data,
  });
};

const getBreedBySpeciesId = (id: string) => {
  return httpClient.get<Data>(API_ROUTE.GET_BREED.replace("{id}", id));
};

const useGetBreedBySpeciesId = () => {
  return useMutation({
    mutationFn: getBreedBySpeciesId,
  });
};

export {useGetMasterData, useGetMasterDataPatient, useGetBreedBySpeciesId};
