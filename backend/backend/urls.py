from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),  # products API
    path('api/cart/', include('cart.urls')),  # cart API
    path('api/recommendations/', include('recommender.urls')),  # recommendations API
    path('api/', include('users.urls')),  # auth API
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)