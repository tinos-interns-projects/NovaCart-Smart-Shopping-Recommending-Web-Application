from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import random
from django.conf import settings
from django.db import models
from .models import Product

# Staff product data storage (in-memory for demo - in production use database)
STAFF_PRODUCTS = {}

def product_list(request):
    """Return products from database with pagination and search support"""
    # Get pagination parameters from query string
    page = int(request.GET.get('page', 1))
    page_size = int(request.GET.get('page_size', 20))
    search_query = request.GET.get('search', '').strip()
    
    # Validate parameters
    if page < 1:
        page = 1
    if page_size < 1 or page_size > 100:
        page_size = 20
    
    # Base queryset with optional search
    if search_query:
        products = Product.objects.filter(product_name__icontains=search_query)
    else:
        products = Product.objects.all()
    
    # Get total count
    total_count = products.count()
    
    # Calculate offset
    offset = (page - 1) * page_size
    
    # Get paginated products
    products = products[offset:offset + page_size]
    
    data = []
    for p in products:
        # Generate random discount and original price for display
        original_price = round(p.price * random.uniform(1.1, 1.5), 2)
        discount = int((1 - p.price / original_price) * 100)
        
        data.append({
            "id": p.id,
            "product_id": p.product_id,
            "product_name": p.product_name,
            "aisle_id": p.aisle_id,
            "department_id": p.department_id,
            "price": p.price,
            "original_price": original_price,
            "discount": discount,
            "image": p.image
        })
    
    # Return paginated response with metadata
    return JsonResponse({
        "products": data,
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total_count": total_count,
            "total_pages": (total_count + page_size - 1) // page_size
        }
    }, safe=False)


def related_products(request, product_id):
    """
    Get related products based on:
    1. Same aisle (highest priority)
    2. Same department (medium priority)
    3. Random products from other departments (fallback)
    """
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return JsonResponse({
            "product": None,
            "related_products": []
        })
    
    # Get products from same aisle first
    same_aisle = list(Product.objects.filter(
        aisle_id=product.aisle_id
    ).exclude(product_id=product.product_id)[:5])
    
    # Get products from same department but different aisle
    same_department = list(Product.objects.filter(
        department_id=product.department_id
    ).exclude(aisle_id=product.aisle_id).exclude(product_id=product.product_id)[:5])
    
    # Combine and shuffle results
    related = same_aisle + same_department
    random.shuffle(related)
    
    # If not enough related products, add random products from other departments
    if len(related) < 10:
        other_depts = Product.objects.exclude(
            models.Q(department_id=product.department_id) | models.Q(product_id=product.product_id)
        )[:10 - len(related)]
        related.extend(other_depts)
    
    # Build response
    related_data = []
    for p in related:
        # Determine relationship type
        if p.aisle_id == product.aisle_id:
            relationship = "same_aisle"
        elif p.department_id == product.department_id:
            relationship = "same_department"
        else:
            relationship = "similar"
        
        # Get image URL
        product_image = p.image
        if not product_image:
            image_url = "https://via.placeholder.com/200x200?text=No+Image"
        elif product_image.startswith('http'):
            image_url = product_image
        else:
            image_url = f"http://127.0.0.1:8000{product_image}"
        
        related_data.append({
            "id": p.id,
            "product_id": p.product_id,
            "product_name": p.product_name,
            "aisle_id": p.aisle_id,
            "department_id": p.department_id,
            "price": p.price,
            "image": image_url,
            "relationship": relationship
        })
    
    # Get main product image
    main_image = product.image
    if not main_image:
        main_image_url = "https://via.placeholder.com/200x200?text=No+Image"
    elif main_image.startswith('http'):
        main_image_url = main_image
    else:
        main_image_url = f"http://127.0.0.1:8000{main_image}"
    
    return JsonResponse({
        "product": {
            "id": product.id,
            "product_id": product.product_id,
            "product_name": product.product_name,
            "aisle_id": product.aisle_id,
            "department_id": product.department_id,
            "price": product.price,
            "image": main_image_url
        },
        "related_products": related_data
    })

@csrf_exempt
def staff_products(request):
    """Staff API for managing products - returns all products with full details"""
    if request.method == 'GET':
        # Return all products from database
        products = Product.objects.all()
        data = []
        for p in products:
            data.append({
                "id": p.id,
                "product_id": p.product_id,
                "product_name": p.product_name,
                "aisle_id": p.aisle_id,
                "department_id": p.department_id,
                "price": p.price,
                "image": p.image
            })
        return JsonResponse(data, safe=False)
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def staff_product_add(request):
    """Add a new product"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        product_id = data.get('id') or data.get('product_id')
        name = data.get('name')
        price = data.get('price')
        image = data.get('image', '')
        aisle_id = data.get('aisle_id', 1)
        department_id = data.get('department_id', 1)
        
        if not name or price is None:
            return JsonResponse({'success': False, 'message': 'Name and price are required'}, status=400)
        
        # Generate ID if not provided
        if not product_id:
            product_id = max([p.product_id for p in Product.objects.all()], default=0) + 1
        else:
            product_id = int(product_id)
        
        product = Product.objects.create(
            product_id=product_id,
            product_name=name,
            price=float(price),
            image=image,
            aisle_id=int(aisle_id),
            department_id=int(department_id)
        )
        
        return JsonResponse({
            'success': True, 
            'message': 'Product added successfully',
            'product': {
                'id': product.id,
                'product_id': product.product_id,
                'product_name': product.product_name,
                'price': product.price,
                'image': product.image,
                'aisle_id': product.aisle_id,
                'department_id': product.department_id
            }
        })
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def staff_product_update(request, product_id):
    """Update a product (price, image, etc.)"""
    if request.method == 'PUT' or request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        product_id = int(product_id)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Product not found'}, status=404)
        
        # Update fields if provided
        if 'name' in data or 'product_name' in data:
            product.product_name = data.get('name') or data.get('product_name')
        if 'price' in data:
            product.price = float(data['price'])
        if 'image' in data:
            product.image = data['image']
        if 'aisle_id' in data:
            product.aisle_id = int(data['aisle_id'])
        if 'department_id' in data:
            product.department_id = int(data['department_id'])
        
        product.save()
        
        return JsonResponse({
            'success': True, 
            'message': 'Product updated successfully',
            'product': {
                'id': product.id,
                'product_id': product.product_id,
                'product_name': product.product_name,
                'price': product.price,
                'image': product.image,
                'aisle_id': product.aisle_id,
                'department_id': product.department_id
            }
        })
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def staff_product_delete(request, product_id):
    """Delete a product"""
    if request.method == 'DELETE' or request.method == 'POST':
        product_id = int(product_id)
        
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
        except Product.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Product not found'}, status=404)
        
        return JsonResponse({
            'success': True, 
            'message': 'Product deleted successfully'
        })
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def upload_image(request):
    """Upload product image"""
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        
        # Create media directory if it doesn't exist
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'products')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        from django.utils import timezone
        import uuid
        ext = os.path.splitext(image.name)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(upload_dir, filename)
        
        # Save file
        with open(filepath, 'wb+') as dest:
            for chunk in image.chunks():
                dest.write(chunk)
        
        # Return the full URL for the frontend
        image_url = f"http://127.0.0.1:8000/media/products/{filename}"
        return JsonResponse({
            'success': True,
            'image_url': image_url
        })
    
    return JsonResponse({'success': False, 'message': 'No image provided'}, status=400)
