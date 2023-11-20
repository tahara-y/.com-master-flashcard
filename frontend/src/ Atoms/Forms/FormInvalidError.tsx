import styled from '@emotion/styled';

type FormInvalidErrorProps = {
  isInvalid?: boolean;
  errorMessage?: string;
}

const FormInvalidError = (props: FormInvalidErrorProps) => {
  const { isInvalid, errorMessage } = props;
  return (
    <div>
      {isInvalid ? <StyledErrorText>{errorMessage}</StyledErrorText> : null}
    </div>
  )
};

export const StyledErrorText = styled.span`
  font-size: 12px;
  color: rgb(220, 20, 60);
  display: inline-block;
  margin-left: 10px;
`;

export default FormInvalidError;
