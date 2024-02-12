import React, { useEffect, useState } from "react";
import { InputGroup, Checkbox, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import FormInput from "../ Atoms/Forms/FormInput";
import FormInputRightElement from "../ Atoms/Forms/FormInputRightElement";
import PrimaryButton from "../ Atoms/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  SignUpFormType,
  sighUpValidate,
} from "../Molecules/CommonPage/ValidateForm";
import FormInvalidError from "../ Atoms/Forms/FormInvalidError";
import { CreateUser } from "../ Hooks/CreateUser";

const SingUpPage = () => {
  const [show, setShow] = useState(false);
  const handleClickHideOrShowButton = () => setShow(!show);
  const [touchedFormInput, setTouchedFormInput] = useState({
    userName: false,
    password: false,
  });

  const toast = useToast();
  type StatusToastType = {
    title: string;
    status: "success" | "error" | "warning" | "info";
  };
  const navigate = useNavigate();
  const handleClickSignUpButton = async () => {
    setTouchedFormInput({
      userName: true,
      password: true,
    });
    if (!Boolean(formik.errors.userName) && !Boolean(formik.errors.password)) {
      try {
        await CreateUser(formik.values);
        navigate("../");
        const toastProps: StatusToastType = {
          title: "アカウントを作成しました",
          status: "success",
        };
        toast({
          title: toastProps.title,
          status: toastProps.status,
          isClosable: true,
          duration: 10000,
        });
      } catch (error) {
        console.error("サインアップ中にエラーが発生しました:", error);
      }
    }
  };

  const formik = useFormik<SignUpFormType>({
    initialValues: {
      userName: "",
      password: "",
    },
    validate: sighUpValidate,
    onSubmit: () => {},
  });

  useEffect(() => {
    setTouchedFormInput({
      userName: false,
      password: false,
    });
    formik.validateForm();
    // formik は useFormik フックによって生成され、変更されることがないため、依存配列に含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SHeader>
        <SHeaderText>Sign Up</SHeaderText>
        <SLogin href="../">Log In</SLogin>
      </SHeader>
      <SContent>
        <SInputContainer>
          <SInputFormStyle>
            <FormInput
              placeholder="Email"
              height="3.125rem"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              isInvalid={
                touchedFormInput.userName && Boolean(formik.errors.userName)
              }
              errorBorderColor="crimson"
            />
            <FormInvalidError
              isInvalid={
                touchedFormInput.userName && Boolean(formik.errors.userName)
              }
              errorMessage={formik.errors.userName}
            />
          </SInputFormStyle>
          <SInputFormStyle>
            <InputGroup>
              <FormInput
                type={show ? "text" : "password"}
                placeholder="Password"
                height="3.125rem"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={
                  touchedFormInput.password && Boolean(formik.errors.password)
                }
                errorBorderColor="crimson"
              />
              <FormInputRightElement
                width="3rem"
                height="3.125rem"
                h="3.125rem"
                size="sm"
                onClick={handleClickHideOrShowButton}
                variant="unstyled"
                show={show}
              ></FormInputRightElement>
            </InputGroup>
            <FormInvalidError
              isInvalid={
                touchedFormInput.password && Boolean(formik.errors.password)
              }
              errorMessage={formik.errors.password}
            />
          </SInputFormStyle>
        </SInputContainer>
        <SCheckBoxContainer>
          <Checkbox size="md" colorScheme="green" />
          <SCheckBoxText>
            I would like to receive your newsletter and other promotional
            information.
          </SCheckBoxText>
        </SCheckBoxContainer>
        <SButtonStyle>
          <PrimaryButton
            colorScheme="green"
            color="white"
            onClick={() => {
              handleClickSignUpButton();
            }}
          >
            Sign UP
          </PrimaryButton>
        </SButtonStyle>
        <SForgotContent>
          <SForgot href="">Forgot your Password?</SForgot>
        </SForgotContent>
      </SContent>
    </>
  );
};

const SHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 3.75rem;
  margin-bottom: 1.5rem;
  margin-top: 2.75rem;
`;

const SHeaderText = styled.div`
  font-weight: 600;
  font-size: 2rem;
`;

const SLogin = styled.a`
  color: #38a169;
  position: absolute;
  right: 1rem;
  font-weight: 600;
`;

const SContent = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SInputContainer = styled.div`
  margin-bottom: 2rem;
`;

const SInputFormStyle = styled.div`
  margin-bottom: 1rem;
`;

const SCheckBoxContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;

const SCheckBoxText = styled.div`
  color: #666666;
`;

const SButtonStyle = styled.div`
  margin-bottom: 1rem;
`;

const SForgotContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SForgot = styled.a`
  color: #38a169;
  font-weight: bold;
`;

export default SingUpPage;
