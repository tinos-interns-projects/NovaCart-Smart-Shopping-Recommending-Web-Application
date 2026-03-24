import os
import sys
import django

# Setup Django
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
project_root = os.path.dirname(backend_dir)
sys.path.insert(0, backend_dir)
sys.path.insert(0, project_root)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product

def add_sample_products():
    # Clear existing products
    Product.objects.all().delete()
    print("Cleared existing products...")
    
    # Define products with categories
    products_data = [
        # Fruits (department_id=1, aisle_id=1)
        {"product_name": "Fresh Apple", "aisle_id": 1, "department_id": 1, "price": 2.99, "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300"},
        {"product_name": "Banana", "aisle_id": 1, "department_id": 1, "price": 1.29, "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300"},
        {"product_name": "Orange", "aisle_id": 1, "department_id": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1547514701-42782101795e?w=300"},
        {"product_name": "Strawberries", "aisle_id": 1, "department_id": 1, "price": 4.99, "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300"},
        {"product_name": "Blueberries", "aisle_id": 1, "department_id": 1, "price": 5.99, "image": "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300"},
        {"product_name": "Grapes", "aisle_id": 1, "department_id": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300"},
        {"product_name": "Watermelon", "aisle_id": 1, "department_id": 1, "price": 6.99, "image": "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=300"},
        {"product_name": "Mango", "aisle_id": 1, "department_id": 1, "price": 2.49, "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300"},
        {"product_name": "Pineapple", "aisle_id": 1, "department_id": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300"},
        {"product_name": "Peach", "aisle_id": 1, "department_id": 1, "price": 2.99, "image": "https://images.unsplash.com/photo-1595126487223-e99a4b5a8c28?w=300"},
        
        # Vegetables (department_id=1, aisle_id=2)
        {"product_name": "Fresh Carrot", "aisle_id": 2, "department_id": 1, "price": 1.49, "image": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300"},
        {"product_name": "Broccoli", "aisle_id": 2, "department_id": 1, "price": 2.99, "image": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300"},
        {"product_name": "Spinach", "aisle_id": 2, "department_id": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300"},
        {"product_name": "Tomato", "aisle_id": 2, "department_id": 1, "price": 2.29, "image": "https://images.unsplash.com/photo-1546470427-227c7b3f8fc2?w=300"},
        {"product_name": "Potato", "aisle_id": 2, "department_id": 1, "price": 1.99, "image": "https://images.unsplash.com/photo-1518977676601-b53f82ber2a?w=300"},
        {"product_name": "Onion", "aisle_id": 2, "department_id": 1, "price": 1.49, "image": "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300"},
        {"product_name": "Garlic", "aisle_id": 2, "department_id": 1, "price": 0.99, "image": "https://images.unsplash.com/photo-1540148426945-6cf22a6b2f85?w=300"},
        {"product_name": "Cucumber", "aisle_id": 2, "department_id": 1, "price": 1.29, "image": "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300"},
        {"product_name": "Bell Pepper", "aisle_id": 2, "department_id": 1, "price": 1.99, "image": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300"},
        {"product_name": "Lettuce", "aisle_id": 2, "department_id": 1, "price": 2.49, "image": "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300"},
        
        # Electronics - Mobiles (department_id=2, aisle_id=10)
        {"product_name": "iPhone 15 Pro", "aisle_id": 10, "department_id": 2, "price": 999.99, "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300"},
        {"product_name": "Samsung Galaxy S24", "aisle_id": 10, "department_id": 2, "price": 899.99, "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300"},
        {"product_name": "Google Pixel 8", "aisle_id": 10, "department_id": 2, "price": 699.99, "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"},
        {"product_name": "OnePlus 12", "aisle_id": 10, "department_id": 2, "price": 799.99, "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"},
        {"product_name": "iPhone 15", "aisle_id": 10, "department_id": 2, "price": 799.99, "image": "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=300"},
        {"product_name": "Samsung Galaxy A54", "aisle_id": 10, "department_id": 2, "price": 449.99, "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300"},
        {"product_name": "Redmi Note 12", "aisle_id": 10, "department_id": 2, "price": 299.99, "image": "https://images.unsplash.com/photo-1592478411213-61535fdd861d?w=300"},
        {"product_name": "Nothing Phone 2", "aisle_id": 10, "department_id": 2, "price": 549.99, "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"},
        {"product_name": "iPhone SE", "aisle_id": 10, "department_id": 2, "price": 429.99, "image": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300"},
        {"product_name": "Motorola Edge 40", "aisle_id": 10, "department_id": 2, "price": 599.99, "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"},
        
        # Electronics - Laptops (department_id=2, aisle_id=11)
        {"product_name": "MacBook Pro 16", "aisle_id": 11, "department_id": 2, "price": 2499.99, "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300"},
        {"product_name": "MacBook Air M3", "aisle_id": 11, "department_id": 2, "price": 1299.99, "image": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300"},
        {"product_name": "Dell XPS 15", "aisle_id": 11, "department_id": 2, "price": 1799.99, "image": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300"},
        {"product_name": "HP Spectre x360", "aisle_id": 11, "department_id": 2, "price": 1499.99, "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300"},
        {"product_name": "Lenovo ThinkPad X1", "aisle_id": 11, "department_id": 2, "price": 1699.99, "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300"},
        {"product_name": "ASUS ROG Laptop", "aisle_id": 11, "department_id": 2, "price": 1999.99, "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300"},
        {"product_name": "Microsoft Surface Laptop", "aisle_id": 11, "department_id": 2, "price": 1299.99, "image": "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300"},
        {"product_name": "Acer Aspire 5", "aisle_id": 11, "department_id": 2, "price": 599.99, "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"},
        {"product_name": "HP Pavilion", "aisle_id": 11, "department_id": 2, "price": 799.99, "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"},
        {"product_name": "Lenovo IdeaPad", "aisle_id": 11, "department_id": 2, "price": 549.99, "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300"},
        
        # Electronics - Tablets (department_id=2, aisle_id=12)
        {"product_name": "iPad Pro 12.9", "aisle_id": 12, "department_id": 2, "price": 1099.99, "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300"},
        {"product_name": "iPad Air", "aisle_id": 12, "department_id": 2, "price": 599.99, "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300"},
        {"product_name": "Samsung Galaxy Tab S9", "aisle_id": 12, "department_id": 2, "price": 849.99, "image": "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=300"},
        {"product_name": "iPad Mini", "aisle_id": 12, "department_id": 2, "price": 499.99, "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300"},
        {"product_name": "Amazon Fire HD 10", "aisle_id": 12, "department_id": 2, "price": 149.99, "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300"},
        
        # Electronics - Headphones (department_id=2, aisle_id=13)
        {"product_name": "AirPods Pro 2", "aisle_id": 13, "department_id": 2, "price": 249.99, "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300"},
        {"product_name": "Sony WH-1000XM5", "aisle_id": 13, "department_id": 2, "price": 349.99, "image": "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300"},
        {"product_name": "Samsung Galaxy Buds2", "aisle_id": 13, "department_id": 2, "price": 149.99, "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300"},
        {"product_name": "Apple AirPods Max", "aisle_id": 13, "department_id": 2, "price": 549.99, "image": "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=300"},
        {"product_name": "Bose QC45", "aisle_id": 13, "department_id": 2, "price": 329.99, "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300"},
        
        # Electronics - Cameras (department_id=2, aisle_id=14)
        {"product_name": "Canon EOS R50", "aisle_id": 14, "department_id": 2, "price": 679.99, "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300"},
        {"product_name": "Sony Alpha A7 IV", "aisle_id": 14, "department_id": 2, "price": 2499.99, "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300"},
        {"product_name": "Nikon Z50", "aisle_id": 14, "department_id": 2, "price": 859.99, "image": "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=300"},
        {"product_name": "GoPro Hero 12", "aisle_id": 14, "department_id": 2, "price": 399.99, "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300"},
        {"product_name": "DJI Pocket 3", "aisle_id": 14, "department_id": 2, "price": 519.99, "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300"},
        
        # Toys (department_id=3, aisle_id=20)
        {"product_name": "LEGO Classic Set", "aisle_id": 20, "department_id": 3, "price": 29.99, "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300"},
        {"product_name": "Barbie Dreamhouse", "aisle_id": 20, "department_id": 3, "price": 149.99, "image": "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300"},
        {"product_name": "Hot Wheels Car Set", "aisle_id": 20, "department_id": 3, "price": 19.99, "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"},
        {"product_name": "Nerf Blaster", "aisle_id": 20, "department_id": 3, "price": 24.99, "image": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300"},
        {"product_name": "Play-Doh Set", "aisle_id": 20, "department_id": 3, "price": 14.99, "image": "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300"},
        {"product_name": "Remote Control Car", "aisle_id": 20, "department_id": 3, "price": 49.99, "image": "https://images.unsplash.com/photo-1583267318073-795748127e8f?w=300"},
        {"product_name": "Building Blocks", "aisle_id": 20, "department_id": 3, "price": 34.99, "image": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300"},
        {"product_name": "Action Figure Pack", "aisle_id": 20, "department_id": 3, "price": 19.99, "image": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300"},
        {"product_name": "Board Game Monopoly", "aisle_id": 20, "department_id": 3, "price": 29.99, "image": "https://images.unsplash.com/photo-1606503479572-7a849886363c?w=300"},
        {"product_name": "Puzzle 1000 Pieces", "aisle_id": 20, "department_id": 3, "price": 15.99, "image": "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=300"},
        
        # Gaming (department_id=3, aisle_id=21)
        {"product_name": "PlayStation 5", "aisle_id": 21, "department_id": 3, "price": 499.99, "image": "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300"},
        {"product_name": "Xbox Series X", "aisle_id": 21, "department_id": 3, "price": 499.99, "image": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300"},
        {"product_name": "Nintendo Switch", "aisle_id": 21, "department_id": 3, "price": 299.99, "image": "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300"},
        {"product_name": "PS5 Controller", "aisle_id": 21, "department_id": 3, "price": 69.99, "image": "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300"},
        {"product_name": "Xbox Controller", "aisle_id": 21, "department_id": 3, "price": 59.99, "image": "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300"},
        
        # Beverages (department_id=1, aisle_id=5)
        {"product_name": "Coca Cola 12 Pack", "aisle_id": 5, "department_id": 1, "price": 5.99, "image": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300"},
        {"product_name": "Pepsi 12 Pack", "aisle_id": 5, "department_id": 1, "price": 5.49, "image": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300"},
        {"product_name": "Orange Juice 1L", "aisle_id": 5, "department_id": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1600271886742-f138f0e5c1b4?w=300"},
        {"product_name": "Coffee Beans 1kg", "aisle_id": 5, "department_id": 1, "price": 19.99, "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300"},
        {"product_name": "Green Tea 50 Bags", "aisle_id": 5, "department_id": 1, "price": 7.99, "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300"},
        
        # Dairy (department_id=1, aisle_id=3)
        {"product_name": "Milk 1 Gallon", "aisle_id": 3, "department_id": 1, "price": 4.49, "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300"},
        {"product_name": "Greek Yogurt", "aisle_id": 3, "department_id": 1, "price": 5.99, "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300"},
        {"product_name": "Cheddar Cheese Block", "aisle_id": 3, "department_id": 1, "price": 6.99, "image": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300"},
        {"product_name": "Butter 1lb", "aisle_id": 3, "department_id": 1, "price": 4.99, "image": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300"},
        {"product_name": "Eggs Dozen", "aisle_id": 3, "department_id": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300"},
        
        # Bakery (department_id=1, aisle_id=4)
        {"product_name": "White Bread Loaf", "aisle_id": 4, "department_id": 1, "price": 2.99, "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"},
        {"product_name": "Croissants 4 Pack", "aisle_id": 4, "department_id": 1, "price": 4.99, "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300"},
        {"product_name": "Bagels 6 Pack", "aisle_id": 4, "department_id": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1585445490387-f47934b73b54?w=300"},
        {"product_name": "Chocolate Muffins", "aisle_id": 4, "department_id": 1, "price": 5.99, "image": "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300"},
        {"product_name": "Whole Wheat Bread", "aisle_id": 4, "department_id": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"},
        
        # Meat (department_id=1, aisle_id=6)
        {"product_name": "Chicken Breast 1lb", "aisle_id": 6, "department_id": 1, "price": 7.99, "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300"},
        {"product_name": "Ground Beef 1lb", "aisle_id": 6, "department_id": 1, "price": 6.99, "image": "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300"},
        {"product_name": "Salmon Fillet", "aisle_id": 6, "department_id": 1, "price": 12.99, "image": "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300"},
        {"product_name": "Pork Chops 1lb", "aisle_id": 6, "department_id": 1, "price": 5.99, "image": "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300"},
        {"product_name": "Bacon 12oz", "aisle_id": 6, "department_id": 1, "price": 7.49, "image": "https://images.unsplash.com/photo-1606851181064-d6a567a5f8d1?w=300"},
        
        # Snacks (department_id=1, aisle_id=7)
        {"product_name": "Potato Chips", "aisle_id": 7, "department_id": 1, "price": 3.99, "image": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300"},
        {"product_name": "Chocolate Bar", "aisle_id": 7, "department_id": 1, "price": 1.99, "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300"},
        {"product_name": "Trail Mix", "aisle_id": 7, "department_id": 1, "price": 6.99, "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300"},
        {"product_name": "Cookies Oreo", "aisle_id": 7, "department_id": 1, "price": 3.49, "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300"},
        {"product_name": "Pretzels", "aisle_id": 7, "department_id": 1, "price": 2.99, "image": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300"},
        
        # Household (department_id=4, aisle_id=30)
        {"product_name": "Paper Towels 6 Roll", "aisle_id": 30, "department_id": 4, "price": 12.99, "image": "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300"},
        {"product_name": "Dish Soap", "aisle_id": 30, "department_id": 4, "price": 3.99, "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300"},
        {"product_name": "Laundry Detergent", "aisle_id": 30, "department_id": 4, "price": 14.99, "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300"},
        {"product_name": "Trash Bags 50ct", "aisle_id": 30, "department_id": 4, "price": 9.99, "image": "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300"},
        {"product_name": "All-Purpose Cleaner", "aisle_id": 30, "department_id": 4, "price": 4.99, "image": "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300"},
        
        # Personal Care (department_id=4, aisle_id=31)
        {"product_name": "Toothpaste", "aisle_id": 31, "department_id": 4, "price": 5.99, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"},
        {"product_name": "Shampoo", "aisle_id": 31, "department_id": 4, "price": 7.99, "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300"},
        {"product_name": "Body Wash", "aisle_id": 31, "department_id": 4, "price": 6.99, "image": "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=300"},
        {"product_name": "Deodorant", "aisle_id": 31, "department_id": 4, "price": 4.99, "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300"},
        {"product_name": "Face Wash", "aisle_id": 31, "department_id": 4, "price": 8.99, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"},
    ]
    
    # Create products
    products_to_create = []
    for i, product_data in enumerate(products_data):
        products_to_create.append(Product(
            product_id=i + 1,
            product_name=product_data["product_name"],
            aisle_id=product_data["aisle_id"],
            department_id=product_data["department_id"],
            price=product_data["price"],
            image=product_data["image"]
        ))
    
    # Bulk create
    Product.objects.bulk_create(products_to_create)
    print(f"Successfully created {len(products_to_create)} products!")

if __name__ == '__main__':
    add_sample_products()
