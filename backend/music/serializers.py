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
    artists = ArtistSerializer(many=True)

    class Meta:
        model = Song
        exclude = ["user"]


class AlbumSerializer(serializers.ModelSerializer):
    label = LabelSerializer(many=False)
    songs = SongSerializer(many=True)

    class Meta:
        model = Album
        fields = "__all__"
        exclude = ["user"]
