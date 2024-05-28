from rest_framework import generics, permissions
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser
from .models import *
from .serializers import *
import json


class UserAlbumsListAPIView(generics.ListAPIView):
    serializer_class = AlbumSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["label", "genres"]

    def get_queryset(self):
        return (
            Album.objects.filter(user_id=self.request.user.id)
            .select_related("label")
            .prefetch_related("songs__artists")
            .prefetch_related("genres")
        )


class UserAlbumsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumNestedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id)


class UserAlbumsCreateAPIView(generics.CreateAPIView):
    serializer_class = AlbumNestedSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        # We convert json passed in from front end into python dictionary needed for serialization
        for key, value in request.data.items():
            # Check if the value is a string and can be parsed as JSON
            if isinstance(value, str):
                try:
                    # Attempt to parse the value as JSON
                    parsed_value = json.loads(value)
                    request.data[key] = parsed_value
                except json.JSONDecodeError:
                    # If parsing fails, leave the value unchanged
                    pass

        # Attach recieved files to the song data for serializer
        for key, file in request.FILES.items():
            # Extract the index from the key
            try:
                index = int(key.split("[")[1].split("]")[0])
            except:
                continue

            # Attach the file to the corresponding song data
            request.data[f"songs[{index}]"]["song_file"] = file

        response = super().post(request, *args, **kwargs)

        return response

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserSongsListAPIView(generics.ListAPIView):
    serializer_class = SongNestedSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Song.objects.filter(user_id=self.request.user.id).prefetch_related(
            "artists"
        )


class UserSongsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id)


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
        return Label.objects.filter(user_id=self.request.user.id)


class UserLabelsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id)


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
        return Artist.objects.filter(user_id=self.request.user.id)


class UserArtistsRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user_id=self.request.user.id)


class UserArtistsCreateAPIView(generics.CreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserGenresListAPIView(generics.ListAPIView):
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Genre.objects.filter(user_id=self.request.user.id)


class UserGenresRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Genre.objects.filter(user_id=self.request.user.id)


class UserGenresCreateAPIView(generics.CreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
