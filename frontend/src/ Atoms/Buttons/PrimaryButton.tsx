import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react'

type PrimaryButtonType = {
  children?: React.ReactNode;
  colorScheme?: string;
  color?: string;
  onClick?: () => void;
  height?: string;
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonType> = (props) => {
  const { children, colorScheme, color, onClick, height, type } = props;
  return (
    <SButton
      colorScheme={colorScheme}
      color={color}
      onClick={onClick}
      height={height}
      type={type}
    >
      {children}
    </SButton>
  )
}

const SButton = styled(Button) <{ height?: string }>`
  width: 100%;
  border-radius: 6rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: normal;
  height: ${({ height }) => height ? height : 'auto'};
`;


export default PrimaryButton
