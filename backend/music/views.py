from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework import generics
from .models import Album
from .serializers import AlbumSerializer


class UserAlbumsAPIView(generics.ListAPIView):
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return Album.objects.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserAlbumAPIView(generics.ListAPIView):
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        album_id = self.kwargs["album_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return Album.objects.filter(user_id=user_id, id=album_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")
