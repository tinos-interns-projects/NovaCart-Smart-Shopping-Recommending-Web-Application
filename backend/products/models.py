from django.db import models

class Product(models.Model):
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    aisle_id = models.IntegerField()
    department_id = models.IntegerField()
    price = models.FloatField(default=100)
    image = models.CharField(max_length=500, blank=True, default="")

    def __str__(self):
        return self.product_name