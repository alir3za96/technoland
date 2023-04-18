from django.contrib import admin
from .models import Brand, Category, Color, Product, Review, Order, OrderItem, ShippingAddress, Slider, User, ProductListByUser, GalleryProduct
from django.contrib.auth.admin import UserAdmin

# Register your models here.


UserAdmin.fieldsets[1][1]['fields'] = (
    'first_name',
    'last_name',
    'email',
    'mobile'
)


class UserAdminConfig(UserAdmin):
    pass


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['getRoute', 'title', 'isManeCat', 'active']
    list_editable = ['isManeCat', 'active']
    search_fields = ['title', 'english_name', 'slug']
    ordering = ['parent', 'english_name', 'title']

    class Meta:
        model = Category


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'createdAt', 'jCreatedAt', 'category',
                    'brand', 'color', 'rating', 'numReviews', 'countInStock', 'is_active', ]
    list_editable = ['is_active']
    search_fields = ['name', 'category', 'color']

    class Meta:
        model = Product


class ProductListByUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'listName', 'active']
    list_editable = ['active']

    class Meta:
        model = ProductListByUser


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
# admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(User, UserAdminConfig)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Slider)
admin.site.register(Brand)
admin.site.register(Color)
admin.site.register(GalleryProduct)
admin.site.register(ProductListByUser, ProductListByUserAdmin)
