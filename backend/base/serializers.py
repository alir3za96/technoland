from unicodedata import category
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Brand, Category, Color, Product, Review, Slider, User, Order, OrderItem, ShippingAddress, ProductListByUser,GalleryProduct


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email','first_name',
                  'last_name', 'is_staff', 'get_full_name', 'name']
        
    def get_name(self, obj):
        name = obj.get_full_name()
        if name == '':
            name = obj.username
        return name
    
   
            

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name',
                  'last_name', 'is_staff', 'token', 'get_full_name', 'name' ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'
        
class SliderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Slider
        fields = '__all__'
        
    
class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = '__all__'
        
    
class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'
        
class GalleryProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = GalleryProduct
        fields = '__all__'
        
    

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    category = serializers.SerializerMethodField(read_only=True)
    brand = serializers.SerializerMethodField(read_only=True)
    color = serializers.SerializerMethodField(read_only=True)
    gallery_images = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'


    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

        
    def get_category(self, obj):
        category = obj.category
        serializer = CategorySerializer(category, many=False)
        return serializer.data

    def get_brand(self, obj):
        brand = obj.brand
        serializer = BrandSerializer(brand, many=False)
        return serializer.data

    def get_color(self, obj):
        color = obj.color
        serializer = ColorSerializer(color, many=False)
        return serializer.data

    def get_gallery_images(self, obj):
        gallery_images = obj.gallery_images.all()
        serializer = GalleryProductSerializer(gallery_images, many=True)
        return serializer.data

        
    


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class ProductListByUserSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = ProductListByUser
        fields = '__all__'


    def get_product(self, obj):
        product = obj.product
        serializer = ProductSerializer(product, many=False)
        return serializer.data

    