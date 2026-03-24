from django.urls import path
from .views import product_list, staff_products, staff_product_add, staff_product_update, staff_product_delete, upload_image, related_products

urlpatterns = [
    path('', product_list, name='product-list'),  # root of products API
    path('staff/', staff_products, name='staff-products'),
    path('staff/add/', staff_product_add, name='staff-product-add'),
    path('staff/update/<int:product_id>/', staff_product_update, name='staff-product-update'),
    path('staff/delete/<int:product_id>/', staff_product_delete, name='staff-product-delete'),
    path('upload/', upload_image, name='upload-image'),
    path('related/<int:product_id>/', related_products, name='related-products'),
]