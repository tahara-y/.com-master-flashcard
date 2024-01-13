//NOTE:各バリデーションのレスポンス型を定義
export type Response = {
  isValid: boolean;
  message: string;
};

//NOTE:ユーザーネームの入力フォームのバリデーション
export const validateUserName = (value: string):Response => {
  if (!value) {
    return { isValid: false, message: 'メールアドレスを入力してください' };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return { isValid: false, message: 'メールアドレスに有効でない文字が使用されています' };
  };
  return { isValid: true, message: '' };
};

//NOTE:パスワードの入力フォームのバリデーション
export const validatePassword = (value: string):Response => {
  if (!value) {
    return { isValid: false, message: 'パスワードを入力してください' };
  };
  return { isValid: true, message: '' };
};

//NOTE:Sign UPで使用するフォームのデータ型
export type SignUpFormType = {
  userName: string;
  password: string;
};

//NOTE:Sign UPで使用するバリデーション
export const sighUpValidate = (values: SignUpFormType) => {
  const errors = {
    email: '',
    userName: '',
    password: '',
  };
  const userNameValidatedResult = validateUserName(values.userName);
  if (!userNameValidatedResult.isValid) {
    errors.userName = userNameValidatedResult.message;
  };
  const passwordValidatedResult = validatePassword(values.password);
  if (!passwordValidatedResult.isValid) {
    errors.password = passwordValidatedResult.message;
  };
  return errors;
};

//NOTE:Log Inで使用するフォームのデータ型
export type LogInFormType = {
  userName: string;
  password: string;
};

//NOTE:Log Inページで使用するフォームのデータ型
export const logInValidate = (values: LogInFormType) => {
  const errors = {
    userName: '',
    password: '',
  };
  const userNameValidatedResult = validateUserName(values.userName);
  if (!userNameValidatedResult.isValid) {
    errors.userName = userNameValidatedResult.message;
  };
  const passwordValidatedResult = validatePassword(values.password);
  if (!passwordValidatedResult.isValid) {
    errors.password = passwordValidatedResult.message;
  };
  return errors;
};