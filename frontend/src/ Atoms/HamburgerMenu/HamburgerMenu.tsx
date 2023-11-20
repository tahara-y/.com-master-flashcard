import { HamburgerIcon } from '@chakra-ui/icons'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'

type HamburgerMenuPropsType = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
  headerMenu?: string;
}

const HamburgerMenu: React.FC<HamburgerMenuPropsType> = (props) => {
  const { size, children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HamburgerIcon onClick={onOpen} width='30px' height='24px' />
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
