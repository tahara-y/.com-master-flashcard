import { SignUpFormType } from "../Molecules/CommonPage/ValidateForm";

export const CreateUser = async(createUserProps:SignUpFormType) => {
  await fetch(`${process.env.REACT_APP_API_URL}/api/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: createUserProps.userName,
      password: createUserProps.password,
    }),
  });
};
