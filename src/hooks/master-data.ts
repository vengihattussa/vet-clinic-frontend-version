import {transformEnumToOptions} from "@src/utils/object";
import {useMemo} from "react";
import {useGetMasterData} from "../services/master-data";

const useMasterData = () => {
  const {data} = useGetMasterData();

  const titleOptions = useMemo(() => transformEnumToOptions(data?.title || {}), [data]);
  const relationshipTypeOptions = useMemo(
    () => transformEnumToOptions(data?.relationshipType || {}),
    [data],
  );

  return {
    zipCode: data?.zipCode || {},
    country: data?.country || {},
    codes: data?.codes || {},
    businessReferralCategory: data?.businessReferralCategory || {},
    referralCategory: data?.referralCategory || {},
    relationshipType: relationshipTypeOptions,
    contactPreference: data?.contactPreference || {},
    historyZip: data?.historyZip || {},
    statementSite: data?.statementSites || {},
    title: titleOptions,
    class: data?.class || {},
    contractPriceType: data?.contractPriceType || {},
    preferredDoctor: data?.preferredDoctor || {},
    state: data?.state || {},
  };
};

export {useMasterData};
