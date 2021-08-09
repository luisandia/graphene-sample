from django.contrib import admin
from .models import Track


class TracksAdmin(admin.ModelAdmin):
    pass


admin.site.register(Track, TracksAdmin)