import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
} from "@components/ui/drawer";
import { Stack } from "@chakra-ui/react";
import { Menu } from "@components/Menu";
import { useDrawerStore } from "@store/drawer";

interface DrawerProps {
  children: JSX.Element[];
}

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const { isOpen, toggleOpen } = useDrawerStore();

  return (
    <DrawerRoot placement="start" open={isOpen} onOpenChange={toggleOpen}>
      <DrawerBackdrop />
      {children}
      <DrawerContent>
        <DrawerBody paddingBlockStart="12">
          <Stack>
            <Menu />
          </Stack>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
