from django.db import models
from django.contrib.auth.models import User


class Label(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    label_name = models.CharField(max_length=255)


class Artist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=255)


class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album_title = models.CharField(max_length=255)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    genre = models.CharField(max_length=255)
    image = models.ImageField(upload_to=f"{user}/album_covers/")


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song_title = models.CharField(max_length=255)
    duration = models.DurationField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    artists = models.ManyToManyField(Artist)
    song_file = models.FileField(upload_to=f"{user}/song_files/")
