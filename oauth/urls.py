from django.urls import path, include
import oauth2_provider.views as oauth2_views
import oauth.views as views
import django.contrib.auth.views as auth_views

account_endpoint_views = [
    path('current/', views.current_user, name='current-user'),
    path('register/', views.register_user, name='register-user'),
    path('change/', views.edit_user, name='edit-user'),
]

oauth2_endpoint_views = [
    path('authorize/login/',
         auth_views.LoginView.as_view(template_name='admin/login.html'),
         name='login'),
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
         name='introspect'),
    path('.well-known/openid-configuration/',
         oauth2_views.ConnectDiscoveryInfoView.as_view(),
         name='oidc-connect-discovery-info'),
    path('.well-known/jwks.json',
         oauth2_views.JwksInfoView.as_view(),
         name="jwks-info"),
    path('userinfo/',
         oauth2_views.UserInfoView.as_view(),
         name="user-info")
]

urlpatterns = [
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('o/', include(oauth2_endpoint_views)),
    path('account/', include(account_endpoint_views)),
]
