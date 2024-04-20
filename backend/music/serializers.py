from rest_framework import serializers
from .models import Label, Artist, Album, Song


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        exclude = ["user"]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        exclude = ["user"]


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        exclude = ["user"]


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        exclude = ["user"]


class SongNestedSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)

    class Meta:
        model = Song
        exclude = ["user"]


class AlbumNestedSerializer(serializers.ModelSerializer):
    label = LabelSerializer(many=False)
    songs = SongNestedSerializer(many=True)

    class Meta:
        model = Album
        exclude = ["user"]
