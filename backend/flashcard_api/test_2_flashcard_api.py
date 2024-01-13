from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Flashcard
from .serializers import FlashcardSerializer

FLASHCARD_URL = '/api/flashcards/'


def create_flashcard(id, chapter, chapterWordOrder, word, description):
    return Flashcard.objects.create(id=id, word=word, description=description)


def detail_url(id):
    return reverse('api:flashcard-detail', args=[id])


class AuthorizedFlashcardApiTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='dummy@example.com',
            password='dummy_pw'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_2_1_should_get_all_flashcard(self):
        create_flashcard(id=1, chapter=1, chapterWordOrder='00001',
                         word='dummy1', description='dummy1')
        create_flashcard(id=2, chapter=1, chapterWordOrder='00002',
                         word='dummy2', description='dummy2')
        res = self.client.get(FLASHCARD_URL)
        flashcard = Flashcard.objects.all().order_by('id')
        serializer = FlashcardSerializer(flashcard, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_2_2_should_get_single_flashcard(self):
        flashcard = create_flashcard(id=1, chapter=1, chapterWordOrder='00001',
                                     word='dummy1', description='dummy1')
        url = detail_url(flashcard.id)
        res = self.client.get(url)
        serializer = FlashcardSerializer(flashcard)
        self.assertEqual(res.data, serializer.data)

    def test_2_3_should_create_new_flashcard_successfully(self):
        payload = {
            'id': 1,
            'chapter': 1,
            'chapterWordOrder': '00001',
            'word': 'dummy1',
            'description': 'dummy1'
        }
        res = self.client.post(FLASHCARD_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exits = Flashcard.objects.filter(
            word=payload['word']
        ).exists()
        self.assertTrue(exits)

    def test_2_4_should_not_create_new_segment_with_invalid(self):
        payload = {'id': 1,
                   'chapter': 1,
                   'chapterWordOrder': '',
                   'word': '',
                   'description': ''}
        res = self.client.post(FLASHCARD_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_2_5_should_partial_update_segment(self):
        payload = {
            'id': 1,
            'chapter': 1,
            'chapterWordOrder': '00001',
            'word': 'dummy1',
            'description': 'dummy1'
        }
        flashcard = create_flashcard(id=1, chapter=1, chapterWordOrder='00001',
                                     word='dummy1', description='dummy1')
        url = detail_url(flashcard.id)
        self.client.patch(url, payload)
        flashcard.refresh_from_db()
        self.assertEqual(flashcard.word, payload['word'])

    def test_2_6_should_update_flashcard(self):
        flashcard = create_flashcard(id=1, chapter=1, chapterWordOrder='00001',
                                     word='dummy1', description='dummy1')
        payload = {
            'id': 1,
            'chapter': 1,
            'chapterWordOrder': '00001',
            'word': 'dummy1',
            'description': 'dummy1'
        }
        url = detail_url(flashcard.id)
        self.client.put(url, payload)
        flashcard.refresh_from_db()
        self.assertEqual(flashcard.word, payload['word'])

    def test_2_7_should_delete_segment(self):
        flashcard = create_flashcard(id=1, chapter=1, chapterWordOrder='00001',
                                     word='dummy1', description='dummy1')
        self.assertEqual(1, Flashcard.objects.count())
        url = detail_url(flashcard.id)
        self.client.delete(url)
        self.assertEqual(0, Flashcard.objects.count())


class UnauthorizedSegmentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_2_8_should_not_get_segment_when_unauthorized(self):
        res = self.client.get(FLASHCARD_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
