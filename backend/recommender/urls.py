from django.urls import path
from .views import recommend_products, cart_recommendations

urlpatterns = [
    path('<int:user_id>/', recommend_products),
    path('cart/<str:user_identifier>/', cart_recommendations, name='cart_recommendations'),
]