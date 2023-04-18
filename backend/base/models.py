from ast import Not
from email.policy import default
import os
from unittest import result
from django.db.models import Q
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
from autoslug import AutoSlugField
from extensions.utils import jalali_converter
# Create your models here.


def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    name, ext = get_filename_ext(filename)
    final_name = f"{instance.id}-{instance.title}{ext}"
    return f"sliders/{final_name}"


class CustomUserManager(BaseUserManager):
    def create_superuser(self, username, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        return self.create_user(username, password, **other_fields)

    def create_user(self, username, password, **other_fields):
        # email = self.normalize_email(email)
        user = self.model(username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser, PermissionsMixin):
    mobile = models.CharField(
        max_length=20, verbose_name='شماره موبایل', unique=True, blank=True, null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'


class ProductManager(models.Manager):
    def get_active_products(self, minPrice, maxPrice):
        if (minPrice == 0) & (maxPrice == 0):
            return self.get_queryset().filter(is_active=True).distinct()
        else:
            return self.get_queryset().filter(is_active=True, price__gte=minPrice, price__lte=maxPrice).distinct()

    def myFilter(self, catId, brand, color, minPrice, maxPrice):
        if catId != 'products':
            if (len(brand) == 0) & (len(color) == 0):
                lookup = (
                    Q(category__slug__icontains=catId)
                )
            elif (len(brand) != 0) & (len(color) == 0):
                lookup = (
                    Q(category__slug__icontains=catId) &
                    Q(brand__englishName__in=brand)
                )
            elif (len(brand) == 0) & (len(color) != 0):
                lookup = (
                    Q(category__slug__icontains=catId) &
                    Q(color__englishName__in=color)
                )
            else:
                lookup = (
                    Q(category__slug__icontains=catId) &
                    Q(brand__englishName__in=brand) &
                    Q(color__englishName__in=color)
                )
        else:
            if (len(brand) != 0) & (len(color) == 0):
                lookup = (
                    Q(brand__englishName__in=brand)
                )
            elif (len(brand) == 0) & (len(color) != 0):
                lookup = (
                    Q(color__englishName__in=color)
                )
            else:
                lookup = (
                    Q(brand__englishName__in=brand) &
                    Q(color__englishName__in=color)
                )

        if (minPrice == 0) & (maxPrice == 0):
            return self.get_queryset().filter(lookup, is_active=True).distinct()
        else:
            if ((len(color) == 0) & (len(brand) == 0)):
                return self.get_queryset().filter(is_active=True, price__gte=minPrice, price__lte=maxPrice).distinct()
            else:
                return self.get_queryset().filter(lookup, is_active=True, price__gte=minPrice, price__lte=maxPrice).distinct()

    # def myFilter(self, brand, color, minPrice, maxPrice):
    #     if (len(color) != 0) & (len(brand) == 0):
    #         lookup = (
    #             Q(color__englishName__in=color)
    #         )
    #     elif (len(color) == 0) & (len(brand) != 0):
    #         lookup = (
    #             Q(brand__englishName__in=brand)
    #         )
    #     elif (len(color) != 0) & (len(brand) != 0):
    #         lookup = (
    #             Q(color__englishName__in=color) &
    #             Q(brand__englishName__in=brand)
    #         )

    # def getByCategory(self, catId):


class CategoryManager(models.Manager):
    def get_active_categories(self):
        return self.get_queryset().filter(active=True)

    def get_main_categories(self):
        return self.get_queryset().filter(isManeCat=True)

    # def get_by_id(self, invention_unique_id):
    #     qs = self.get_queryset().filter(id=invention_unique_id)
    #     if qs.count() == 1:
    #         return qs.first()
    #     else:
    #         return None

    # def search(self, query):
    #     lookup = (
    #             Q(title__icontains=query) |
    #             Q(descriptions__icontains=query) |
    #             Q(category__icontains=query)
    #     )
    #     return self.get_active_inventions().filter(lookup).distinct()


class SliderManager(models.Manager):
    def get_active_sliders(self):
        return self.get_queryset().filter(active=True)


class BrandManager(models.Manager):
    def get_active_brands(self):
        return self.get_queryset().filter(active=True)


class ColorManager(models.Manager):
    def get_active_colors(self):
        return self.get_queryset().filter(active=True)


class ProductListManager(models.Manager):

    def get_fav_products(self):
        return self.get_queryset().filter(listName='fav')

    def get_compare_products(self):
        return self.get_queryset().filter(listName='com')


class Slider(models.Model):
    title = models.CharField(max_length=150, verbose_name='عنوان')
    subtitle = models.TextField(verbose_name='توضیحات')
    url = models.CharField(max_length=100, verbose_name='آدرس')
    image = models.ImageField(upload_to=upload_image_path,
                              null=True, blank=True, verbose_name='تصویر ۴۵۰ در ۱۵۰۰')
    active = models.BooleanField(default=False, verbose_name='فعال')

    class Meta:
        verbose_name = 'اسلایدر'
        verbose_name_plural = 'اسلایدرها'

    def __str__(self):
        return self.title

    objects = SliderManager()


class Brand(models.Model):
    persianName = models.CharField(max_length=100, verbose_name='نام فارسی')
    englishName = models.CharField(max_length=100, verbose_name='نام انگلیسی')
    slug = AutoSlugField(populate_from='englishName',
                         unique=True, null=False, editable=False)
    active = models.BooleanField(default=True, verbose_name='فعال')

    def __str__(self):
        return self.persianName

    class Meta:
        verbose_name = 'برند'
        verbose_name_plural = 'برندها'
    
    objects = BrandManager()


class Color(models.Model):
    persianName = models.CharField(max_length=100, verbose_name='نام فارسی')
    englishName = models.CharField(max_length=100, verbose_name='نام انگلیسی')
    slug = AutoSlugField(populate_from='englishName',
                         unique=True, null=False, editable=False)
    active = models.BooleanField(default=True, verbose_name='فعال')

    def __str__(self):
        return self.persianName

    class Meta:
        verbose_name = 'رنگ'
        verbose_name_plural = 'رنگ‌ها'

    objects = ColorManager()


class Category(models.Model):
    parent = models.ForeignKey(
        'self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100)
    # name = models
    english_name = models.CharField(max_length=100, null=True)
    isManeCat = models.BooleanField(
        default=False, verbose_name='نمایش در دسته بندی اصلی')
    slug = AutoSlugField(populate_from='english_name',
                         unique=True, null=False, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True, verbose_name='فعال')
    getRoute = models.CharField(
        null=True, blank=True, max_length=300, verbose_name='مسیر دسته بندی')

    def __str__(self):
        return self.title

    class Meta:
        unique_together = ('slug', 'parent',)
        verbose_name_plural = "دسته‌بندی‌ها"

    def save(self, *args, **kwargs):
        full_path = [self.title]
        k = self.parent
        while k is not None:
            full_path.append(k.title)
            k = k.parent
        result = ' / '.join(full_path[::-1])
        self.getRoute = result
        super(Category, self).save(*args, **kwargs)

    objects = CategoryManager()


def get_filename_main_image_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_main_image_path(instance, filename):
    name, ext = get_filename_main_image_ext(filename)
    final_name = f"{instance.name}-main{ext}"
    return f"products/{final_name}"


def get_filename_gallery_images_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext 

def upload_gallery_images_path(instance, filename):
    name, ext = get_filename_gallery_images_ext(filename)
    final_name = f"{instance.name}{ext}"
    return f"products/gallery/{final_name}"


class GalleryProduct(models.Model):
    name = models.CharField(max_length=200, null=True,
                            blank=True, verbose_name="نام محصول")
    image = models.ImageField(upload_to=upload_gallery_images_path, null=True, blank=True,
                              default='/placeholder.png', verbose_name="تصویر")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'تصویر'
        verbose_name_plural = 'گالری تصاویر'
    
class Product(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="کاربر")
    name = models.CharField(max_length=200, null=True,
                            blank=True, verbose_name="نام محصول")
    english_name = models.CharField(
        max_length=200, null=True, blank=True, verbose_name="نام انگلیسی محصول")
    image = models.ImageField( null=True, blank=True,
                              default='/placeholder.png', verbose_name="تصویر")

    gallery_images = models.ManyToManyField(GalleryProduct, null=True,
                                       blank=True, verbose_name="تصاویر گالری")

    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True,
                              blank=True, verbose_name="برند")
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, verbose_name="دسته بندی")
    color = models.ForeignKey(
        Color, on_delete=models.SET_NULL, null=True, verbose_name="رنگ")
    shortDescription = models.TextField(
        null=True, blank=True, verbose_name="توضیجات کوتاه")
    description = models.TextField(
        null=True, blank=True, verbose_name="توضیجات")
    rating = models.DecimalField(
        max_digits=50, decimal_places=2, null=True, blank=True, verbose_name="امتیاز")
    numReviews = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="تعداد دیدگاه")
    discountless_price = models.IntegerField(
        null=True, blank=True, verbose_name="قیمت خط خورده")
    price = models.IntegerField(
        null=True, verbose_name="قیمت")
    discountPrice = models.IntegerField(
        null=True, blank=True, verbose_name="درصد تخفیف")
    countInStock = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="موجودی انبار")
    maxSale = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="سقف فروش در هر سفارش (صفر برای نداشتن سقف)")
    totalSale = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="جمع تعداد فروش")
    visitCount = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="تعداد بازدید")
    is_active = models.BooleanField(default=False, verbose_name="فعال")
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name="ایجاد شده در")
    _id = models.AutoField(primary_key=True, editable=False)
            
    @property
    def jCreatedAt(self):
        return jalali_converter(self.createdAt)

    def __str__(self):
        return self.name

    @property
    def discounted_price(self):
        if self.discountless_price is not None:
            result = (self.discountless_price - self.price) / \
                (self.discountless_price) * 100
            return "{:.2f}".format(result)
        else:
            return 0

    def save(self, *args, **kwargs):
        if self.discountless_price is not None:
            result = (self.discountless_price - self.price) / \
                (self.discountless_price) * 100
            self.discountPrice = result
        else:
            self.discountPrice = 0

        if self.countInStock == 0:
            print('hello')
            self.is_active = False
        
        super(Product, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'محصول'
        verbose_name_plural = 'محصولات'
        
    objects = ProductManager()


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, verbose_name="محصول")
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="کابر")
    name = models.CharField(max_length=200, null=True,
                            blank=True, verbose_name="نام")
    rating = models.IntegerField(
        null=True, blank=True, default=0, verbose_name="امتیاز")
    comment = models.TextField(null=True, blank=True, verbose_name="دیدگاه")
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name="ایجاد شده در")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

    class Meta:
        verbose_name = 'دیدگاه'
        verbose_name_plural = 'دیدگاه‌ها'
        
        
class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="کابر")
    paymentMethod = models.CharField(
        max_length=200, null=True, blank=True, verbose_name="روش پرداخت")
    # taxPrice = models.DecimalField(
    #     null=True, blank=True, verbose_name="مالیات")
    shippingPrice = models.IntegerField(
        null=True, blank=True, verbose_name="هزینه حمل و نقل")
    totalPrice = models.IntegerField(
        null=True, blank=True, verbose_name="قبمت کل")
    isPaid = models.BooleanField(default=False, verbose_name="پرداخت شده")
    paidAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True, verbose_name="پرداخت شده در")
    isDelivered = models.BooleanField(default=False, verbose_name="تحویل شده")
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True, verbose_name="تحویل شده در")
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name="ایجاد شده در")
    _id = models.AutoField(primary_key=True, editable=False)

    isCanceled = models.BooleanField(default=False, verbose_name='کنسل شده')

    @property
    def jCreatedAt(self):
        return jalali_converter(self.createdAt)

    def __str__(self):
        return str(self.createdAt)
    class Meta:
            verbose_name = 'سفارش'
            verbose_name_plural = 'سفارش‌ها'
        
        

class OrderItem(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, verbose_name="محصول")
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, null=True, verbose_name="سفارش")
    name = models.CharField(max_length=200, null=True,
                            blank=True, verbose_name="نام")
    qty = models.IntegerField(null=True, blank=True,
                              default=0, verbose_name="qty")
    price = models.IntegerField(
        null=True, blank=True, verbose_name="قیمت")
    image = models.CharField(max_length=200, null=True,
                             blank=True, verbose_name="تصویر")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

    

class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True, verbose_name="سفارش")
    address = models.CharField(
        max_length=200, null=True, blank=True, verbose_name="آدرس")
    city = models.CharField(max_length=200, null=True,
                            blank=True, verbose_name="شهر")
    postalCode = models.CharField(
        max_length=200, null=True, blank=True, verbose_name="کدپستی")
    shippingPrice = models.IntegerField(
        null=True, blank=True, verbose_name="هزینه حمل و نقل")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
    class Meta:
        verbose_name = 'آدرس'
        verbose_name_plural = 'آدرس‌ها'

class ProductListByUser(models.Model):
    LIST_NAME = [
        ('fav', 'علاقه‌مندی‌ها'),
        ('com', 'مقایسه'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, verbose_name="کابر")

    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, verbose_name="محصول")

    listName = models.CharField(max_length=100, choices=LIST_NAME)

    active = models.BooleanField(default=False)

    def __str__(self):
        return str(f'{self.user} ----- {self.product.name}')

    class Meta:
        verbose_name = 'لیست'
        verbose_name_plural = 'لیست های کاربران'

    objects = ProductListManager()
