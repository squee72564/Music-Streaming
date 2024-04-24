from django.urls import path
from .api_views import *
from .views import *

urlpatterns = [
    # Testing react
    path(
        "test-react-page/",
        TestReactView.as_view(),
        name="test_react_page",
    ),
    path(
        "test-react-page/<path:path>",
        TestReactView.as_view(),
        name="test_react_page_with_path",
    ),
    # Albums
    path(
        "api/albums/create/",
        UserAlbumsCreateAPIView.as_view(),
        name="user_album_create_api",
    ),
    path(
        "api/user/<int:user_id>/albums/<int:pk>/",
        UserAlbumsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_album_rud_api",
    ),
    path(
        "api/user/<int:user_id>/albums/",
        UserAlbumsListAPIView.as_view(),
        name="user_albums_list_api",
    ),
    # Songs
    path(
        "api/songs/create/",
        UserSongsCreateAPIView.as_view(),
        name="user_songs_create_api",
    ),
    path(
        "api/user/<int:user_id>/songs/<int:pk>/",
        UserSongsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_songs_rud_api",
    ),
    path(
        "api/user/<int:user_id>/songs/",
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
        "api/user/<int:user_id>/artists/<int:pk>/",
        UserArtistsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_artsts_rud_api",
    ),
    path(
        "api/user/<int:user_id>/artists/",
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
        "api/user/<int:user_id>/labels/<int:pk>/",
        UserLabelsRetrieveUpdateDestroyAPIView.as_view(),
        name="user_labels_rud_api",
    ),
    path(
        "api/user/<int:user_id>/labels/",
        UserLabelsListAPIView.as_view(),
        name="user_labels_list_api",
    ),
]
