import { LogInFormType } from '../Molecules/CommonPage/ValidateForm';

type GetAuthTokenType = {
  status: boolean;
  token: string;
}

const  GteAuthToken = async(values:LogInFormType): Promise<GetAuthTokenType> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: values.userName,
      password: values.password
    })
  });
  const data = await response.json();
  const token = data.token;
  return {
    status:response.ok,
    token: token,
  };
};

export default GteAuthToken;
