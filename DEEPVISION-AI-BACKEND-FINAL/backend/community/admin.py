from django.contrib import admin
from community.models import Post, Comment, SavedPost, Report
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(SavedPost)
admin.site.register(Report)