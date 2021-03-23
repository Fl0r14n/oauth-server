from django.contrib import admin

from django.contrib.auth.admin import UserAdmin, GroupAdmin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from oauth.models import User, Group


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = (
        'email', 'picture_img', 'username', 'first_name', 'last_name',
        'is_staff'
    )
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'),
         {'fields': ('picture', 'username', 'first_name', 'last_name')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups',
                       'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    def picture_img(self, obj):
        picture = obj.picture
        return mark_safe(
            '<img src="{url}" width="{width}" height={height}>'.format(
                url=obj.picture.url,
                width='64px',
                height='64px'
            )) if picture else ''


@admin.register(Group)
class GroupAdmin(GroupAdmin):
    pass
