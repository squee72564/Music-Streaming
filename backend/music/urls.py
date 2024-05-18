from django.urls import path
from .api_views import *
from .views import *

urlpatterns = [
    # Testing react
    path(
        "collection/",
        TestReactView.as_view(),
        name="music_collection_page",
    ),
    # Albums
    path(
        "api/albums/create/",
        UserAlbumsCreateAPIView.as_view(),
        name="user_album_create_api",
    ),
    path(
        "api/albums/<int:pk>/",
        UserAlbumsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_album_rud_api",
    ),
    path(
        "api/albums/",
        UserAlbumsListAPIView.as_view(),
        name="user_albums_nested_list_api",
    ),
    path(
        "api/albums/",
        UserAlbumsListAPIView.as_view(),
        name="user_albums_nested_list_api",
    ),
    # Songs
    path(
        "api/songs/create/",
        UserSongsCreateAPIView.as_view(),
        name="user_songs_create_api",
    ),
    path(
        "api/songs/<int:pk>/",
        UserSongsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_songs_rud_api",
    ),
    path(
        "api/songs/",
        UserSongsListAPIView.as_view(),
        name="user_songs_list_api",
    ),
    # Artists
    path(
        "api/artists/create/",
        UserArtistsCreateAPIView.as_view(),
        name="user_artsts_create_api",
    ),
    path(
        "api/artists/<int:pk>/",
        UserArtistsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_artsts_rud_api",
    ),
    path(
        "api/artists/",
        UserArtistsListAPIView.as_view(),
        name="user_artists_list_api",
    ),
    # Labels
    path(
        "api/labels/create/",
        UserLabelsCreateAPIView.as_view(),
        name="user_labels_create_api",
    ),
    path(
        "api/labels/<int:pk>/",
        UserLabelsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_labels_rud_api",
    ),
    path(
        "api/labels/",
        UserLabelsListAPIView.as_view(),
        name="user_labels_list_api",
    ),
]
