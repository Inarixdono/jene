import { createListCollection } from "@chakra-ui/react";
import { vehicle, documentStatus, VehicleForCustomer } from "@types";
import { spanishTranslations } from "@utils/translator";

interface Provinces {
  [key: string]: string[];
}

const provinces: Provinces = {
  "Puerto Plata": [
    "Puerto Plata",
    "Altamira",
    "Guananico",
    "Imbert",
    "Los Hidalgos",
    "Luperón",
    "Sosúa",
    "Villa Isabela",
    "Villa Montellano",
  ],
  "Maria Trinidad Sanchez": ["Nagua", "Cabrera", "El Factor", "Río San Juan"],
  Samana: ["Samaná", "Las Terrenas", "Santa Bárbara de Samaná", "Sánchez"],
};

export const useUserOptions = () => {
  const roles = createListCollection({
    items: [
      { label: "Superusuario", value: "SUPERUSER" },
      { label: "Administrador", value: "ADMIN" },
      { label: "Usuario", value: "USER" },
      { label: "Invitado", value: "GUEST" },
    ],
  });

  const departments = createListCollection({
    items: [
      { label: "Desarrollo", value: "DEVELOPMENT" },
      { label: "Administración", value: "ADMINISTRATION" },
      { label: "Contabilidad", value: "ACCOUNTING" },
      { label: "Ventas", value: "SALES" },
      { label: "Cuentas por cobrar", value: "RECEIVABLES" },
      { label: "Facturación", value: "BILLING" },
      { label: "Servicio al cliente", value: "CUSTOMER SERVICE" },
    ],
  });

  return { roles, departments };
};

export const useProvinces = (selectedProvince: string | null) => {
  const provinceOptions = createListCollection({
    items: Object.keys(provinces).map((province) => ({
      label: province,
      value: province,
    })),
  });

  const cityOptions = createListCollection({
    items: selectedProvince
      ? provinces[selectedProvince].map((city) => ({
          label: city,
          value: city,
        }))
      : [],
  });

  return [provinceOptions, cityOptions];
};

export const useCustomerStatuses = () => {
  return createListCollection({
    items: [
      { label: "Activo", value: "ACTIVE" },
      { label: "Inactivo", value: "INACTIVE" },
    ],
  });
};

export const useVehicleOptions = () => {
  const conditions = createListCollection({
    items: [
      { label: "Nuevo", value: "true" },
      { label: "Usado", value: "false" },
    ],
  });

  const types = createListCollection({
    items: vehicle.shape.vehicleType.options.map((type) => ({
      label: spanishTranslations[type],
      value: type,
    })),
  });

  const status = createListCollection({
    items: vehicle.shape.status.options.map((status) => ({
      label: spanishTranslations[status],
      value: status,
    })),
  });

  return { conditions, types, status };
};

export const useCustomerVehicles = (vehicles: VehicleForCustomer[]) => {
  return createListCollection({
    items:
      vehicles?.map((vehicle) => ({
        label: vehicle.vin,
        value: vehicle.id,
      })) ?? [],
  });
};

export const useRequestStatuses = () => {
  return createListCollection({
    items: documentStatus.options.map((status) => ({
      label: spanishTranslations[status],
      value: status,
    })),
  });
};
