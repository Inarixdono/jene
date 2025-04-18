import { flattenRequest, PopulatedRequest } from "@types";

export const flattenRequestDetails = (requests: PopulatedRequest[]) => {
  const flattenRequests = requests.flatMap((request) =>
    request.detail.map((detail) => ({
      requestId: request.id,
      vehicleId: detail.vehicleId,
      customer: request.customer,
      vehicle: detail.vehicle,
      plateStatus: detail.plateStatus,
      registrationStatus: detail.registrationStatus,
      plateReceivedAt: detail.plateReceivedAt,
      plateDeliveredAt: detail.plateDeliveredAt,
      registrationDeliveredAt: detail.registrationDeliveredAt,
      registrationReceivedAt: detail.registrationReceivedAt,
    }))
  );

  return flattenRequest.array().parse(flattenRequests);
};
