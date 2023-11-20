import React, { useEffect, useState } from 'react'
import { InputGroup } from '@chakra-ui/react'
import styled from '@emotion/styled'
import FormInput from '../ Atoms/Forms/FormInput';
import FormInputRightElement from '../ Atoms/Forms/FormInputRightElement';
import PrimaryButton from '../ Atoms/Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { LogInFormType, logInValidate } from '../Molecules/CommonPage/ValidateForm';
import { useFormik } from 'formik';
import FormInvalidError from '../ Atoms/Forms/FormInvalidError';
import GteAuthToken from '../ Hooks/GteAuthToken';
import GetUserProfile from '../ Hooks/GetUserProfile';

const LogInPage = () => {
  const [show, setShow] = useState(false);
  const handleClickHideOrShowButton = () => setShow(!show);

  const navigate = useNavigate();
  const [touchedFormInput, setTouchedFormInput] = useState({
    userName: false,
    password: false,
  });

  const formik = useFormik<LogInFormType>({
    initialValues: {
      userName: '',
      password: '',
    },
    validate: logInValidate,
    onSubmit: () => { },
  });

  const handleClickLogInButton = async () => {
    setTouchedFormInput({
      userName: true,
      password: true,
    });
    if (!Boolean(formik.errors.userName) && !Boolean(formik.errors.password)) {
      try {
        const authTokenData = await GteAuthToken(formik.values)
        if (!authTokenData.status) {
          formik.setErrors({
            userName: 'ユーザーネームかパスワードに誤りがあります',
            password: 'ユーザーネームかパスワードに誤りがあります',
          });
          return;
        };
        const userProfileData = GetUserProfile(authTokenData.token)
        navigate('/menu', { state: userProfileData });
      } catch (error) {
        console.error('サインイン中にエラーが発生しました:', error);
      };
    };
  };

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
      <form onSubmit={formik.handleSubmit}>
        <SHeader>
          <SHeaderText>Log In</SHeaderText>
          <SLogin href='/signup'>Sign Up</SLogin>
        </SHeader>
        <SContent>
          <SInputContainer>
            <SInputFormStyle>
              <FormInput
                placeholder='User Name'
                height='3.125rem'
                name='userName'
                value={formik.values.userName}
                onChange={formik.handleChange}
                isInvalid={touchedFormInput.userName && Boolean(formik.errors.userName)}
                errorBorderColor='crimson'
              />
              <FormInvalidError
                isInvalid={touchedFormInput.userName && Boolean(formik.errors.userName)}
                errorMessage={formik.errors.userName}
              />
            </SInputFormStyle>
            <SInputFormStyle>
              <InputGroup>
                <FormInput
                  type={show ? 'text' : 'password'}
                  placeholder='Password'
                  height='3.125rem'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={touchedFormInput.password && Boolean(formik.errors.password)}
                  errorBorderColor='crimson'
                />
                <FormInputRightElement
                  width='3rem'
                  height='3.125rem'
                  h='3.125rem'
                  size='sm'
                  onClick={handleClickHideOrShowButton}
                  variant='unstyled'
                  show={show}
                >
                </FormInputRightElement>
              </InputGroup>
              <FormInvalidError
                isInvalid={touchedFormInput.password && Boolean(formik.errors.password)}
                errorMessage={formik.errors.password}
              />
            </SInputFormStyle>
          </SInputContainer>
          <SButtonStyle>
            <PrimaryButton
              colorScheme='green'
              color='white'
              onClick={handleClickLogInButton}
            >
              Log In
            </PrimaryButton>
          </SButtonStyle>
          <SForgotContent>
            <SForgot href=''>Forgot your Password?</SForgot>
          </SForgotContent>
        </SContent >
      </form>
    </ >
  )
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
  color: #38A169;
  position: absolute;
  right: 1rem;
  font-weight: 600;
`;

const SContent = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SInputContainer = styled.div`
  margin-bottom: 178px;
`;

const SInputFormStyle = styled.div`
  margin-bottom: 1rem;
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
  color: #38A169;
  font-weight: bold;
`;

export default LogInPage;
