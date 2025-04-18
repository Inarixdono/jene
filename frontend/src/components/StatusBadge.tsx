import { Badge, BadgeProps } from "@chakra-ui/react";
import { spanishTranslations } from "@utils/translator";

interface StatusBadgeProps extends BadgeProps {
  status: keyof typeof spanishTranslations;
}

export const StatusBadge = (props: StatusBadgeProps) => {
  const { status, ...rest } = props;
  const label =
    status in spanishTranslations
      ? spanishTranslations[status]
      : "Not implemented";

  const color = getColor(status);
  return (
    <Badge
      colorPalette={color}
      variant="subtle"
      w="20"
      justifyContent={"center"}
      {...rest}
    >
      {label}
    </Badge>
  );
};

function getColor(status: string) {
  switch (status) {
    case "AVAILABLE":
    case "ACTIVE":
      return "green";
    case "SOLD":
      return "blue";
    case "SETTLED":
      return "teal";
    case "INACTIVE":
      return "gray";
    case "SEIZED":
    case "PENDING":
      return "orange";
    case "STOLEN":
      return "red";
    default:
      return "fg";
  }
}
