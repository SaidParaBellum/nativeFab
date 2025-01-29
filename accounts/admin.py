from django.contrib import admin

from accounts.models import User, StudentProfile

# Register your models here.

admin.site.register(User)
admin.site.register(StudentProfile)