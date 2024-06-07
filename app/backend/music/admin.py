from django.contrib import admin
from .models import *


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ("label_name",)


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ("artist_name",)


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("genre_name",)


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = (
        "album_title",
        "label",
        "image",
    )
    filter_horizontal = ("genres",)


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = (
        "song_title",
        "song_file",
        "album",
    )
    filter_horizontal = ("artists",)
