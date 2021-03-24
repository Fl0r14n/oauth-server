from django.urls import path, include
import oauth2_provider.views as oauth2_views
import oauth.views as views

account_endpoint_views = [
    path('current/', views.current_user, name='current-user'),
    path('register/', views.register_user, name='register-user'),
    path('change/', views.edit_user, name='edit-user'),
]

oauth2_endpoint_views = [
    path('authorize/',
         oauth2_views.AuthorizationView.as_view(),
         name='authorize'),
    path('token/',
         oauth2_views.TokenView.as_view(),
         name='token'),
    path('revoke/',
         oauth2_views.RevokeTokenView.as_view(),
         name='revoke-token'),
    path('introspect/',
         oauth2_views.IntrospectTokenView.as_view(),
         name='introspect')
]

urlpatterns = [
    path('o/', include(oauth2_endpoint_views)),
    path('account/', include(account_endpoint_views)),
]
