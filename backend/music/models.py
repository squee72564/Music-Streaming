from django.db import models


class Label(models.Model):
    label_name = models.CharField(max_length=255)


class Artist(models.Model):
    artist_name = models.CharField(max_length=255)


class Album(models.Model):
    album_title = models.CharField(max_length=255)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    genre = models.CharField(max_length=255)


class Song(models.Model):
    song_title = models.CharField(max_length=255)
    duration = models.DurationField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    artists = models.ManyToManyField(Artist)
