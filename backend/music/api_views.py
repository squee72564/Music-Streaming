from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Album
from .serializers import *


class UserAlbumsListAPIView(generics.ListAPIView):
    serializer_class = AlbumNestedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return (
                Album.objects.filter(user_id=user_id)
                .select_related("label")
                .prefetch_related("songs__artists")
            )
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserAlbumsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return self.queryset.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserAlbumsCreateAPIView(generics.CreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserSongsListAPIView(generics.ListAPIView):
    serializer_class = SongNestedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return Song.objects.filter(user_id=user_id).prefetch_related("artists")
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserSongsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return self.queryset.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserSongsCreateAPIView(generics.CreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserLabelsListAPIView(generics.ListAPIView):
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return Label.objects.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserLabelsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return self.queryset.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserLabelsCreateAPIView(generics.CreateAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserArtistsListAPIView(generics.ListAPIView):
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return Artist.objects.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserArtistsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        if self.request.user.is_superuser or self.request.user.id == user_id:
            return self.queryset.filter(user_id=user_id)
        else:
            raise PermissionDenied("You are not allowed to access this resource.")


class UserArtistsCreateAPIView(generics.CreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
