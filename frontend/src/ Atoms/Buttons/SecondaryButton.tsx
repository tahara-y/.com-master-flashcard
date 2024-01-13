import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react'

type SecondaryButtonType = {
  children?: React.ReactNode;
  onClick?: () => void;
  height?: string;
  width?: string;
  isDisabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonType> = (props) => {
  const { children, onClick, height, width, isDisabled } = props;
  return (
    <SButton
      colorScheme='white'
      variant='solid'
      color='green'
      onClick={onClick}
      height={height}
      width={width}
      isDisabled={isDisabled}>
      {children}
    </SButton>
  )
}

const SButton = styled(Button) <{ height?: string, width?: string }>`
  border-radius: 6rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: normal;
  height: ${({ height }) => height ? height : 'auto'};
  width: ${({ width }) => width ? width : '100%'};
  background-color: white;
`;


export default SecondaryButton;
