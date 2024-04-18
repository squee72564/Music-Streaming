from django.urls import path
from .views import *

urlpatterns = [
    path(
        "api/user/<int:user_id>/albums/",
        UserAlbumsAPIView.as_view(),
        name="user_albums_api",
    ),
    path(
        "api/user/<int:user_id>/albums/<int:album_id>/",
        UserAlbumAPIView.as_view(),
        name="user_album_api",
    ),
]
