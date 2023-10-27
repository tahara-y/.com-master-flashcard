from django.test.testcases import TestCase
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = '/api/create/'
PROFILE_URL = '/api/profile/'
TOKEN_URL = '/api/auth/'


class AuthorizedUserApiTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='dummy', email='dummy@example.com', password='dummy_pw'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_1_1_should_get_user_profile(self):
        res = self.client.get(PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'username': self.user.username,
            'email': self.user.email,
        })

    def test_1_2_should_not_allowed_by_PUT(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        res = self.client.put(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_1_3_should_not_allowed_by_patch(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        res = self.client.patch(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class UnauthorizedUserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_1_4_should_create_new_user(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(
            user.check_password(payload['password'])
        )
        self.assertNotIn('password', res.data)

    def test_1_5_should_not_create_user_by_same_credentials(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        get_user_model().objects.create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_6_should_response_token(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        get_user_model().objects.create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)
        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_1_7_should_response_token_with_invalid_credentials(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        wrong_payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'wrong_pw'
        }
        get_user_model().objects.create_user(**payload)
        res = self.client.post(TOKEN_URL, wrong_payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_8_should_not_response_with_non_exist_credentials(self):
        payload = {
            'username': 'dummy',
            'email': 'dummy@example.com',
            'password': 'dummy_pw'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_9_should_not_get_user_profile_when_unauthorized(self):
        res = self.client.get(PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
