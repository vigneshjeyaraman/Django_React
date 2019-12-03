from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers
from apps.accounts import views

router = routers.DefaultRouter()
router.register(r'^shipment', views.ShipmentManagement)

urlpatterns = [
    url('^', include(router.urls)),
    path('signup',views.SignUp.as_view(),name="user_signup"),
    path('login',views.Login.as_view(),name='user_login'),
]
