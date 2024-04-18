from django.contrib import admin
from .models import *


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "label_name",
    )


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "artist_name",
    )


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "album_title",
        "label",
        "genre",
        "image",
    )


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "song_title",
        "duration",
        "album",
    )
    filter_horizontal = ("artists",)
