import {useMemo} from "react";
import {useGetMasterDataPatient} from "../services/master-data";
import {transformEnumToOptionsGenderType} from "@src/utils/object";

const useMasterDataPatient = () => {
  const {data} = useGetMasterDataPatient();

  // const patientSexOptions = useMemo(() => transformEnumToOptions(data?.sex || {}), [data]);
  const patientSexOptions = useMemo(
    () => transformEnumToOptionsGenderType(data?.sex || {}),
    [data],
  );

  return {
    codes: data?.codes || {},
    wellnessDiscount: data?.wellnessDiscount || {},
    color: data?.color || {},
    species: data?.species || {},
    sex: patientSexOptions,
    allergy: data?.allergy || {},
    class: data?.class || {},
    weightUnit: data?.weightUnit || {},
    insuranceProviders: data?.insuranceProviders || {},
  };
};

export {useMasterDataPatient};
