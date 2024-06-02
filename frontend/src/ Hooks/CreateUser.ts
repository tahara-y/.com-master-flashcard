import { SignUpFormType } from "../Molecules/CommonPage/ValidateForm";

export const CreateUser = async (createUserProps: SignUpFormType) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/create/`, {
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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "An error occurred during sign up");
  }

  return response.json();
};
