from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.request import Request
from django.test import TestCase
from rest_framework import status
from .models import *
from .serializers import *
from django.urls import reverse

from django.core.files import File

class BaseTestCase(TestCase):
    '''
    Base class used to set up db with instance of each model.
    Also tests the serializers for each model
    '''
    
    def setUp(self):
        self.user = User.objects.create(username='testuser')

    def create_label(self, **kwargs):
        data = {'label_name': 'Test Label', **kwargs}
        serializer = LabelSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save(user=self.user)

    def create_artist(self, **kwargs):
        data = {'artist_name' : 'Test Artist', **kwargs}
        serializer = ArtistSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save(user=self.user)

    def create_album(self, label_instance, **kwargs):
        data = {
            'album_title' : 'Test Album',
            'label' : label_instance.pk,
            'genre' : 'Test Genre',
            **kwargs
        }
        serializer = AlbumSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save(user=self.user)

    def create_song(self, album_instance, artist_instance, **kwargs):
        data = {
            'song_title' : 'Song 1',
            'duration' : '12:12',
            'album' : album_instance.pk,
            'artists' : [artist_instance.pk],
            'song_file' : File(open("./media/tests/BIG SWIMMER - Racks (Official Music Video).mp3", "rb")),
            **kwargs
        }
        serializer = SongSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save(user=self.user)


class TestSerializerLogic(BaseTestCase):
    def test_serializers(self):
        label_instance = self.create_label()
        artist_instance = self.create_artist()
        album_instance = self.create_album(label_instance=label_instance)
        song_instance = self.create_song(album_instance=album_instance, artist_instance=artist_instance)

        user_albums = Album.objects.filter(user=self.user).prefetch_related('label', 'songs__artists')
        serialized_data = AlbumNestedSerializer(user_albums, many=True).data

        self.assertEqual(len(serialized_data), len(user_albums))


class TestUserAlbumsAPIView(BaseTestCase, APITestCase):
    def test_user_albums_api(self): 
        factory = APIRequestFactory()
        request = factory.get('/')
        self.client.force_authenticate(user=self.user)
        request.user = self.user
        
        user_albums_serialized = self.serialize_user_albums(request)

        url = reverse('user_albums_list_api', kwargs={'user_id': self.user.id})
 
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        response_data = response.data

        self.assertEqual(response_data, user_albums_serialized)

    def serialize_user_albums(self, request: Request):
        '''
        Function to query user album objects and serialize with nested serializer, similar to how the
        user_albums_api works
        '''
        user_albums = Album.objects.filter(user=self.user).select_related('label').prefetch_related('songs__artists')
        serialized_data = AlbumNestedSerializer(user_albums, many=True, context={'request': request}).data

        # Convert image and song file paths to absolute URI link
        for album_data in serialized_data:
            if 'image' in album_data and album_data['image']:
                album_data['image'] = request.build_absolute_uri(album_data['image'])
            for song_data in album_data['songs']:
                if 'song_file' in song_data and song_data['song_file']:
                    song_data['song_file'] = request.build_absolute_uri(song_data['song_file'])
        
        return serialized_data
