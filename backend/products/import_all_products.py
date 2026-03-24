import os
import sys
import django
import csv
import random

# Setup Django - go up from products to backend, then to project root
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
project_root = os.path.dirname(backend_dir)
sys.path.insert(0, backend_dir)
sys.path.insert(0, project_root)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Product

def import_products():
    # Clear existing products
    Product.objects.all().delete()
    print("Cleared existing products...")
    
    count = 0
    csv_path = os.path.join(backend_dir, 'data', 'products.csv')
    
    print(f"Reading from: {csv_path}")
    
    # Read all products into memory first
    products_to_create = []
    
    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            # Generate a realistic price between 50 and 500
            price = round(random.uniform(50, 500), 2)
            
            products_to_create.append(Product(
                product_id=int(row['product_id']),
                product_name=row['product_name'],
                aisle_id=int(row['aisle_id']),
                department_id=int(row['department_id']),
                price=price
            ))
            
            count += 1
            if count % 10000 == 0:
                print(f"Processed {count} products...")
    
    print(f"Creating {count} products in database...")
    
    # Bulk create for faster import
    Product.objects.bulk_create(products_to_create)
    
    print(f"Successfully imported {count} products from Instacart dataset!")

if __name__ == '__main__':
    import_products()
