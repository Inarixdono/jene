import { Customer, CustomerFilter } from "@types";
import { useForm } from "react-hook-form";

export const useCustomerFilter = (customers?: Customer[]) => {
  const { register, watch, reset } = useForm<CustomerFilter>();

  const clearFilters = () => reset();

  const filteredCustomers =
    customers?.filter((customer) => {
      if (!customer) return false;

      const { id, name, identityNumber } = watch();
      const includesId = customer.id.toString().includes((id ?? "").toString());
      const includesName = customer.name
        .toLowerCase()
        .includes((name ?? "").toLowerCase());
      const includesIdentity = customer.identityNumber.includes(
        identityNumber ?? ""
      );

      return includesId && includesName && includesIdentity;
    }) ?? [];

  return { filteredCustomers, clearFilters, register };
};
