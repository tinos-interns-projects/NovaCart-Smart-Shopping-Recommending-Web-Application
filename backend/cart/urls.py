from django.urls import path
from . import views

urlpatterns = [
    path('get/<str:username>/', views.get_cart, name='get-cart'),
    path('add/', views.add_to_cart, name='add-to-cart'),
    path('remove/', views.remove_from_cart, name='remove-from-cart'),
    path('update/', views.update_cart_quantity, name='update-cart-quantity'),
]
