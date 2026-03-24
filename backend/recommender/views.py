from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import models
from .pipeline import get_recommendations
from cart.models import CartItem
from products.models import Product
from django.contrib.auth.models import User


@api_view(["GET"])
def recommend_products(request, user_id):

    recommendations = get_recommendations(user_id)

    return Response({
        "user_id": user_id,
        "recommended_products": recommendations
    })


@api_view(["GET"])
def cart_recommendations(request, user_identifier):
    """
    Get product recommendations based on items in the user's cart.
    Accepts either user_id (integer) or username (string).
    Recommends products from the same aisle (highest priority) or 
    same department (medium priority) as cart items.
    """
    # Try to get user by username first, then by id
    try:
        # Check if user_identifier is a username (string) or user_id (integer)
        if isinstance(user_identifier, str) and not user_identifier.isdigit():
            user = User.objects.get(username=user_identifier)
        else:
            user = User.objects.get(id=int(user_identifier))
    except User.DoesNotExist:
        return JsonResponse({
            "message": "User not found. Please login to get recommendations.",
            "recommendations": []
        })
    except ValueError:
        return JsonResponse({
            "message": "Invalid user identifier.",
            "recommendations": []
        })
    
    # Get cart items for the user
    cart_items = CartItem.objects.filter(user=user).select_related('product')
    
    if not cart_items:
        return JsonResponse({
            "message": "Your cart is empty. Add items to get recommendations!",
            "recommendations": []
        })
    
    # Collect unique aisle_ids and department_ids from cart items
    aisle_ids = set()
    department_ids = set()
    cart_product_ids = set()
    
    for item in cart_items:
        aisle_ids.add(item.product.aisle_id)
        department_ids.add(item.product.department_id)
        cart_product_ids.add(item.product.product_id)
    
    # STEP 1: Get products from SAME AISLE first (highest priority)
    # This ensures truly related products are recommended
    same_aisle_products = Product.objects.filter(
        aisle_id__in=aisle_ids
    ).exclude(product_id__in=cart_product_ids)[:10]
    
    # STEP 2: If not enough from same aisle, get from SAME DEPARTMENT (medium priority)
    if len(same_aisle_products) < 10:
        remaining_aisles = [p.aisle_id for p in same_aisle_products]
        same_department_products = Product.objects.filter(
            department_id__in=department_ids
        ).exclude(product_id__in=cart_product_ids).exclude(aisle_id__in=remaining_aisles)[:10 - len(same_aisle_products)]
        
        # Combine: same aisle first, then same department
        related_products = list(same_aisle_products) + list(same_department_products)
    else:
        related_products = list(same_aisle_products)
    
    recommendations = []
    for product in related_products:
        # Determine relationship type
        if product.aisle_id in aisle_ids:
            relationship = "same_aisle"
        elif product.department_id in department_ids:
            relationship = "same_department"
        else:
            relationship = "similar"
        
        # Get image URL
        product_image = product.image
        if not product_image:
            image_url = "https://via.placeholder.com/200x200?text=No+Image"
        elif product_image.startswith('http'):
            image_url = product_image
        else:
            image_url = f"http://127.0.0.1:8000{product_image}"
        
        recommendations.append({
            "product_id": product.product_id,
            "product_name": product.product_name,
            "aisle_id": product.aisle_id,
            "department_id": product.department_id,
            "price": product.price,
            "image": image_url,
            "relationship": relationship
        })
    
    return JsonResponse({
        "cart_items_count": len(cart_product_ids),
        "recommendations": recommendations
    })