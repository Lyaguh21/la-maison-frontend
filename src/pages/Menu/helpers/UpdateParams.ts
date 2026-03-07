import { SetURLSearchParams } from "react-router-dom";

export const updateParams = (
  key: string,
  value: string | null,
  searchParams: any,
  setSearchParams: SetURLSearchParams,
) => {
  const params = Object.fromEntries(searchParams);

  if (!value) {
    delete params[key];
  } else {
    params[key] = value;
  }

  setSearchParams(params);
};
