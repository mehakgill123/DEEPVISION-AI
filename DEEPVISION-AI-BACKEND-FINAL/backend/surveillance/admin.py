from django.contrib import admin
from surveillance.models import Camera, DetectionLog, Alert
# Register your models here.

admin.site.register(Camera)
admin.site.register(DetectionLog)
admin.site.register(Alert)