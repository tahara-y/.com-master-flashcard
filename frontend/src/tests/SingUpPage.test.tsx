import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SingUpPage from '../Pages/SingUpPage';

const setUp = () => {
  render(
    <BrowserRouter>
      <SingUpPage />
    </BrowserRouter>
  );
};

describe('Login画面のテキストチェック', () => {
  beforeEach(async () => {
    await act(async () => {
      setUp()
    });
  })
  it('Sign Upヘッダー', async () => {
    expect(screen.getByText('Sign Up', { selector: 'div' })).toBeInTheDocument();
  });
  it('LogIn切り替えリンク', async () => {
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });
  it('Email入力フォーム', async () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });
  it('Password入力フォーム', async () => {
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  it('SignUpボタン', async () => {
    expect(screen.getByText('Sign UP', { selector: 'button' })).toBeInTheDocument();
  });
  it('Sign Upボタン', async () => {
    expect(screen.getByText(
      'I would like to receive your newsletter and other promotional information.'
    )).toBeInTheDocument();
  });
  it('Forgot your Password?', async () => {
    expect(screen.getByText('Forgot your Password?')).toBeInTheDocument();
  });
});

describe('入力フォームのバリデーションテスト', () => {
  beforeEach(async () => {
    await act(async () => {
      setUp()
    });
  })
  it('Email入力フォームに0文字入力', async () => {
    const emailFormElement = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: 'Sign UP' });
    await userEvent.type(emailFormElement, '');
    await userEvent.click(submitButton);

    expect(await screen.findByText('メールアドレスを入力してください')).toBeInTheDocument();
  });
  it('Email入力フォームに不正な文字を入力', async () => {
    const emailFormElement = screen.getByPlaceholderText('Email');
    userEvent.type(emailFormElement, 'あ');

    const submitButton = screen.getByRole('button', { name: 'Sign UP' });
    userEvent.click(submitButton);

    expect(
      await screen.findByText('メールアドレスに有効でない文字が使用されています')).toBeInTheDocument();
  });
  it('パスワードに0文字入力', async () => {
    const passwordFormElement = screen.getByPlaceholderText('Password');
    userEvent.type(passwordFormElement, '');

    const submitButton = screen.getByRole('button', { name: 'Sign UP' });
    userEvent.click(submitButton);

    expect(
      await screen.findByText('パスワードを入力してください')).toBeInTheDocument();
  });
});
