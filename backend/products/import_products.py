import csv
from products.models import Product

count = 0

with open('products/products.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        Product.objects.create(
            product_id=int(row['product_id']),
            product_name=row['product_name'],
            aisle_id=int(row['aisle_id']),
            department_id=int(row['department_id']),
            price=100
        )

        count += 1
        if count >= 50:
            break

print("50 products imported successfully!")