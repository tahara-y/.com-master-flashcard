from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import ChapterNumber
from .serializers import ChapterNumberSerializer

CHAPTER_NUM_URL = '/api/chapterNum/'


def create_chapterNum(chapter, maxNum):
    return ChapterNumber.objects.create(chapter=chapter, maxNum=maxNum)


def detail_url(chapter):
    return reverse('api:chapterNum-detail', args=[chapter])


class AuthorizedChapterNum(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='dummy@example.com',
            password='dummy_pw'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_3_1_should_get_all_chapterNum(self):
        create_chapterNum(chapter=1, maxNum=100)
        create_chapterNum(chapter=2, maxNum=200)
        res = self.client.get(CHAPTER_NUM_URL)
        chapterNum = ChapterNumber.objects.all().order_by('chapter')
        serializer = ChapterNumberSerializer(chapterNum, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_3_2_should_get_single_chapterNum(self):
        chapterNum = create_chapterNum(chapter=1, maxNum=100)
        url = detail_url(chapterNum.chapter)
        res = self.client.get(url)
        serializer = ChapterNumberSerializer(chapterNum)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_3_3_should_create_new_chapterNum_successfully(self):
        payload = {
            'chapter': 1,
            'maxNum': 100,
        }
        res = self.client.post(CHAPTER_NUM_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exits = ChapterNumber.objects.filter(
            chapter=payload['chapter']
        ).exists()
        self.assertTrue(exits)

    def test_3_4_should_not_create_new_chapterNum_with_invalid(self):
        payload = {'chapter': '', 'maxNum': ''}
        res = self.client.post(CHAPTER_NUM_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_3_5_should_partial_update_chapterNum(self):
        payload = {
            'chapter': 1,
            'maxNum': 100,
        }
        chapterNum = create_chapterNum(chapter=1, maxNum=100)
        url = detail_url(chapterNum.chapter)
        self.client.patch(url, payload)
        chapterNum.refresh_from_db()
        self.assertEqual(chapterNum.chapter, payload['chapter'])

    def test_3_6_should_update_chapterNum(self):
        chapterNum = create_chapterNum(chapter=1, maxNum=100)
        payload = {
            'chapter': 1,
            'maxNum': 100,
        }
        url = detail_url(chapterNum.chapter)
        self.client.put(url, payload)
        chapterNum.refresh_from_db()
        self.assertEqual(chapterNum.chapter, payload['chapter'])

    def test_3_7_should_delete_chapterNum(self):
        chapterNum = create_chapterNum(chapter=1, maxNum=100)
        self.assertEqual(1, ChapterNumber.objects.count())
        url = detail_url(chapterNum.chapter)
        self.client.delete(url)
        self.assertEqual(0, ChapterNumber.objects.count())
