import { Vehicle, VehicleFilter } from "@types";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

export const useVehicleFilter = (vehicles?: Vehicle[]) => {
  const { register, watch, reset } = useForm<VehicleFilter>();
  const filterValues = watch();

  const filteredVehicles = useMemo(() => {
    return (vehicles ?? []).filter((vehicle) => {
      const { vin, make, model, status } = filterValues;
      const includesVIN = vin
        ? vehicle.vin.toUpperCase().includes(vin.toUpperCase())
        : true;
      const includesMake = make
        ? vehicle.make.toUpperCase().includes(make.toUpperCase())
        : true;
      const includesModel = model
        ? vehicle.model.toUpperCase().includes(model.toUpperCase())
        : true;
      const includesStatus =
        status && status.length ? status.includes(vehicle.status) : true;
      return includesVIN && includesMake && includesModel && includesStatus;
    });
  }, [vehicles, filterValues]);

  const clearFilters = () => {
    reset();
  };

  return { filteredVehicles, clearFilters, register };
};
