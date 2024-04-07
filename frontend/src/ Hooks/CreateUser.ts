import { SignUpFormType } from "../Molecules/CommonPage/ValidateForm";

export const CreateUser = async (createUserProps: SignUpFormType) => {
  await fetch(`${process.env.REACT_APP_API_URL}/api/create/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: createUserProps.userName,
      password: createUserProps.password,
    }),
  });
  console.log('REACT_APP_API_URL' ,process.env.REACT_APP_API_URL)
};
