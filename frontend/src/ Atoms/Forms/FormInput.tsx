import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react'

type FormInputType = {
  placeholder?: string;
  height?: string;
  type?: 'text' | 'password';
  name?: string;
  value?: string;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  }
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  }
  isInvalid?: boolean;
  errorBorderColor?: string;
}

const FormInput: React.FC<FormInputType> = (props) => {
  const {
    placeholder,
    height,
    type,
    name,
    value,
    onChange,
    onBlur,
    isInvalid,
    errorBorderColor,
  } = props;

  return (
    <>
      <SInput
        placeholder={placeholder}
        height={height}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        errorBorderColor={errorBorderColor}
      />
    </>
  )
}

const SInput = styled(Input)`
  background-color: #F6F6F6;
`;

export default FormInput;
