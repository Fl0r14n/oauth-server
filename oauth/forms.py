from captcha.fields import ReCaptchaField
from django import forms

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm

re_captcha_field = ReCaptchaField()


class CaptchaField(forms.CharField):
    """
    wrapper field. We just need to do the backend validation
    """

    def validate(self, value):
        super(CaptchaField, self).validate(value)
        re_captcha_field.validate(value)


class UserAddForm(forms.ModelForm):
    email = forms.CharField(
        label='Email',
        max_length=64,
        help_text='Email'
    )
    password = forms.CharField(
        label='Password',
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}),
        help_text='Password',
    )
    captcha = CaptchaField()

    def save(self, commit=True):
        user = super().save(commit=False)
        username = self.data.get('username')
        if not username:  # remove this if the registration will require username
            user.username = self.cleaned_data['email']
        user.set_password(self.cleaned_data['password'])
        user.is_active = True  # remove this for double opt in
        if commit:
            user.save()
        return user

    class Meta:
        model = get_user_model()
        exclude = ('date_joined', 'username',)


class UserEditForm(UserChangeForm):
    class Meta:
        model = get_user_model()
        exclude = ('date_joined',)
