import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, InputRightElement } from '@chakra-ui/react'
import styled from '@emotion/styled';
import React from 'react';

type FormInputRightElementType = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  h?: string;
  size?: string;
  onClick?: () => void;
  variant?: string;
  show?: boolean;
}

const FormInputRightElement: React.FC<FormInputRightElementType> = (props) => {
  const { children, width, height, h, size, onClick, variant, show } = props;
  return (
    <InputRightElement width={width} height={height}>
      {children}
      <SButtonPass
        h={h}
        size={size}
        onClick={onClick}
        variant={variant}
      >
        {show ? <ViewOffIcon width='16px' height='16px' /> : <ViewIcon width='16px' height='16px' />}
      </SButtonPass>
    </InputRightElement>
  )
}

const SButtonPass = styled(Button)`
  position: right;
  opacity: 70%;
`;

export default FormInputRightElement;
