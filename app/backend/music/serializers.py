from rest_framework import serializers
from .models import Label, Artist, Album, Song, Genre


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        exclude = ["user"]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        exclude = ["user"]


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        exclude = ["user"]


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        exclude = ["user"]


class SongNestedSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)

    class Meta:
        model = Song
        exclude = ["user"]


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        exclude = ["user"]


class AlbumNestedSerializer(serializers.ModelSerializer):
    label = LabelSerializer(many=False)
    songs = SongNestedSerializer(many=True)
    genres = GenreSerializer(many=True)

    class Meta:
        model = Album
        exclude = ["user"]

    def create(self, validated_data):
        label_data = validated_data.pop("label")
        genres_data = validated_data.pop("genres")
        songs_data = validated_data.pop("songs")

        label, _ = Label.objects.get_or_create(
            user=validated_data["user"], **label_data
        )

        album, _ = Album.objects.get_or_create(label=label, **validated_data)

        for genre_data in genres_data:
            genre, _ = Genre.objects.get_or_create(
                user=validated_data["user"], **genre_data
            )
            album.genres.add(genre)

        for song_data in songs_data:
            artists_data = song_data.pop("artists")
            song = Song.objects.create(
                user=validated_data["user"], album=album, **song_data
            )
            song.artists.add(
                *[
                    Artist.objects.get_or_create(
                        user=validated_data["user"], **artist_data
                    )[0]
                    for artist_data in artists_data
                ]
            )

        return album
