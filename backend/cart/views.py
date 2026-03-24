from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

from .models import CartItem
from products.models import Product
from django.contrib.auth.models import User

@csrf_exempt
def get_cart(request, username):
    """Get cart items for a user"""
    try:
        user = User.objects.get(username=username)
        cart_items = CartItem.objects.filter(user=user).select_related('product')
        
        data = []
        for item in cart_items:
            # Get image - if product has no image, use placeholder
            product_image = item.product.image
            if not product_image:
                image_url = "https://via.placeholder.com/150x150?text=No+Image"
            elif product_image.startswith('http'):
                image_url = product_image
            else:
                image_url = f"http://127.0.0.1:8000{product_image}"
            
            data.append({
                "id": item.id,
                "product_id": item.product.product_id,
                "product_name": item.product.product_name,
                "price": item.product.price,
                "quantity": item.quantity,
                "image": image_url,
                "aisle_id": item.product.aisle_id,
                "department_id": item.product.department_id
            })
        
        return JsonResponse(data, safe=False)
    except User.DoesNotExist:
        return JsonResponse([], safe=False)

@csrf_exempt
def add_to_cart(request):
    """Add item to cart"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        username = data.get("username")
        product_id = data.get("product_id")
        quantity = int(data.get("quantity", 1))
        product_name = data.get("product_name", "Unknown Product")
        price = float(data.get("price", 0))
        
        if not username or not product_id:
            return JsonResponse({"success": False, "message": "Username and product_id required"}, status=400)
        
        try:
            user = User.objects.get(username=username)
            
            # Try to find existing product in database first
            product = Product.objects.filter(product_id=product_id).first()
            
            if not product:
                # Determine category based on product name
                product_name_lower = product_name.lower()
                
                # Default category
                aisle_id = 1
                department_id = 1
                
                # Electronics categories
                if any(keyword in product_name_lower for keyword in ['laptop', 'macbook', 'dell', 'hp', 'lenovo', 'asus', 'acer', 'microsoft surface', 'notebook']):
                    aisle_id = 11  # Laptops
                    department_id = 2  # Electronics
                elif any(keyword in product_name_lower for keyword in ['phone', 'iphone', 'samsung galaxy', 'pixel', 'oneplus', 'redmi', 'nothing phone', 'motorola', 'mobile', 'smartphone']):
                    aisle_id = 10  # Mobiles
                    department_id = 2  # Electronics
                elif any(keyword in product_name_lower for keyword in ['tablet', 'ipad', 'galaxy tab', 'fire hd']):
                    aisle_id = 12  # Tablets
                    department_id = 2  # Electronics
                elif any(keyword in product_name_lower for keyword in ['airpods', 'headphone', 'earphone', 'earbuds', 'buds', 'bose', 'sony wh']):
                    aisle_id = 13  # Headphones
                    department_id = 2  # Electronics
                elif any(keyword in product_name_lower for keyword in ['camera', 'canon', 'nikon', 'sony alpha', 'gopro', 'dji']):
                    aisle_id = 14  # Cameras
                    department_id = 2  # Electronics
                elif any(keyword in product_name_lower for keyword in ['playstation', 'ps5', 'xbox', 'nintendo', 'switch', 'controller', 'gaming']):
                    aisle_id = 21  # Gaming
                    department_id = 3  # Toys & Gaming
                elif any(keyword in product_name_lower for keyword in ['lego', 'barbie', 'toy', 'nerf', 'play-doh', 'hot wheels', 'puzzle', 'board game']):
                    aisle_id = 20  # Toys
                    department_id = 3  # Toys & Gaming
                elif any(keyword in product_name_lower for keyword in ['juice', 'coca cola', 'pepsi', 'drink', 'beverage', 'soda', 'coffee', 'tea', 'green tea']):
                    aisle_id = 5  # Beverages
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['milk', 'yogurt', 'cheese', 'butter', 'egg', 'dairy']):
                    aisle_id = 3  # Dairy
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['bread', 'croissant', 'bagel', 'muffin', 'bakery', 'bun']):
                    aisle_id = 4  # Bakery
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['chicken', 'beef', 'pork', 'fish', 'salmon', 'meat', 'bacon']):
                    aisle_id = 6  # Meat
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['chips', 'chocolate', 'cookie', 'pretzel', 'snack', 'oreo', 'trail mix']):
                    aisle_id = 7  # Snacks
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['apple', 'banana', 'orange', 'strawberry', 'grape', 'mango', 'pineapple', 'fruit', 'watermelon', 'blueberry', 'peach']):
                    aisle_id = 1  # Fruits
                    department_id = 1
                elif any(keyword in product_name_lower for keyword in ['carrot', 'broccoli', 'spinach', 'tomato', 'potato', 'onion', 'garlic', 'cucumber', 'pepper', 'lettuce', 'vegetable']):
                    aisle_id = 2  # Vegetables
                    department_id = 1
                
                product = Product.objects.create(
                    product_id=product_id,
                    product_name=product_name,
                    price=price,
                    aisle_id=aisle_id,
                    department_id=department_id,
                    image=data.get("image", "")
                )
            
            # Check if item already in cart
            existing_item = CartItem.objects.filter(user=user, product=product).first()
            if existing_item:
                existing_item.quantity += quantity
                existing_item.save()
            else:
                CartItem.objects.create(user=user, product=product, quantity=quantity)
            
            return JsonResponse({"success": True, "message": "Product added to cart"})
        except User.DoesNotExist:
            return JsonResponse({"success": False, "message": "User not found"}, status=404)
    
    return JsonResponse({"success": False, "message": "POST request required"}, status=400)

@csrf_exempt
def remove_from_cart(request):
    """Remove item from cart"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        cart_item_id = data.get("cart_item_id")
        
        if cart_item_id:
            try:
                cart_item = CartItem.objects.get(id=cart_item_id)
                cart_item.delete()
                return JsonResponse({"success": True, "message": "Item removed from cart"})
            except CartItem.DoesNotExist:
                return JsonResponse({"success": False, "message": "Item not found"}, status=404)
        
        # Also support removing by username and product_id
        username = data.get("username")
        product_id = data.get("product_id")
        
        if username and product_id:
            try:
                user = User.objects.get(username=username)
                product = Product.objects.get(product_id=product_id)
                CartItem.objects.filter(user=user, product=product).delete()
                return JsonResponse({"success": True, "message": "Item removed from cart"})
            except:
                return JsonResponse({"success": False, "message": "Item not found"}, status=404)
        
        return JsonResponse({"success": False, "message": "cart_item_id or username/product_id required"}, status=400)
    
    return JsonResponse({"success": False, "message": "POST request required"}, status=400)

@csrf_exempt
def update_cart_quantity(request):
    """Update cart item quantity"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        cart_item_id = data.get("cart_item_id")
        quantity = int(data.get("quantity", 1))
        
        if cart_item_id and quantity > 0:
            try:
                cart_item = CartItem.objects.get(id=cart_item_id)
                cart_item.quantity = quantity
                cart_item.save()
                return JsonResponse({"success": True, "message": "Quantity updated"})
            except CartItem.DoesNotExist:
                return JsonResponse({"success": False, "message": "Item not found"}, status=404)
        
        return JsonResponse({"success": False, "message": "cart_item_id and quantity required"}, status=400)
    
    return JsonResponse({"success": False, "message": "POST request required"}, status=400)