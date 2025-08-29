from django.contrib import admin
from users.models import CustomUser, ContactUs, Feedback
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(ContactUs)
admin.site.register(Feedback)