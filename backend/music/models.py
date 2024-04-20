from django.db import models
from django.contrib.auth.models import User

from django.conf import settings


def get_album_cover_upload_path(instance, filename):
    return f"users/{instance.user.username}/album_images/{filename}"


def get_song_file_upload_path(instance, filename):
    return f"users/{instance.user.username}/song_files/{filename}"


class Label(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    label_name = models.CharField(max_length=255)


class Artist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=255)


class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album_title = models.CharField(max_length=255)
    label = models.ForeignKey(Label, related_name="albums", on_delete=models.CASCADE)
    genre = models.CharField(max_length=255)
    image = models.ImageField(
        default="no_image.jpg",
        upload_to=get_album_cover_upload_path,
    )


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song_title = models.CharField(max_length=255)
    duration = models.DurationField()
    album = models.ForeignKey(Album, related_name="songs", on_delete=models.CASCADE)
    artists = models.ManyToManyField(Artist)
    song_file = models.FileField(upload_to=get_song_file_upload_path)
