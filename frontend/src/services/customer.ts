import Request from "./request";
import {
  populatedCustomer,
  customer,
  CustomerCreate,
  CustomerUpdate,
  Customer,
  customerUpdate,
} from "@types";

export const getCustomer = async (id: number) => {
  const service = new Request("customers");
  const data = await service.getOne<Customer>(id);
  return populatedCustomer.parseAsync(data);
};

export const getCustomers = async () => {
  const service = new Request("customers");
  const data = await service.get<Customer>();
  return customer.array().parse(data);
};

export const createCustomer = async (customer: CustomerCreate) => {
  const service = new Request("customers");
  await service.post<CustomerCreate, Customer>(customer);
};

export const updateCustomer = async (customer: CustomerUpdate) => {
  const service = new Request("customers");
  const response = await service.update<CustomerUpdate>(customer);
  return customerUpdate.parse(response);
};
