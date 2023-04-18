from datetime import datetime
from unicodedata import category, name
from wsgiref import validate
from django.shortcuts import render
from .models import Brand, Category, Color, Product, Slider, User, Order, OrderItem, ShippingAddress, Review, ProductListByUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import BrandSerializer, CategorySerializer, ColorSerializer, ProductSerializer, SliderSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer, ProductListByUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.hashers import make_password


# from backend.base import serializers

# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'پیغام خطا'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(
        users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(
        user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.username = data['username']
    user.email = data['email']
    user.first_name = data['first_name']
    user.last_name = data['last_name']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
def getProductsSearch(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')[0:5]

    page = request.query_params.get('page')
    paginator = Paginator(products, 2)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = ProductSerializer(
        products, many=True)
    print(query)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    filterList = []
    brand = request.GET.getlist("brand")
    for i in brand:
        filterList.append(i)

    color = request.GET.getlist("color")
    for i in color:
        filterList.append(i)

    sortFromUrl = request.query_params.get('sort')

    catId = request.query_params.get('cat')

    if catId == None:
        catId = 'products'

    if sortFromUrl == 'topSelling':
        sort = '-totalSale'
    elif sortFromUrl == 'mostVisited':
        sort = '-visitCount'
    elif sortFromUrl == 'biggestDiscount':
        sort = '-discountPrice'
    elif sortFromUrl == 'mostExpensive':
        sort = '-price'
    elif sortFromUrl == 'mostCheapest':
        sort = 'price'
    else:
        sort = '-createdAt'

    minPrice = request.query_params.get('min')
    maxPrice = request.query_params.get('max')

    if ((minPrice == None) & (maxPrice == None)):
        minPrice = 0
        maxPrice = 0

    # if (len(brand) !=0 )| (len(color) !=0) & ((minPrice ==0) & (maxPrice==0)):
    #     products = Product.objects.myFilter(brand, color, minPrice, maxPrice, catId).order_by(sort)

    # elif (len(brand) !=0 )| (len(color) !=0) & (minPrice !=0) & (maxPrice!=0):
    #     products = Product.objects.myFilter(brand, color, minPrice, maxPrice, catId).order_by(sort)

    # elif ((len(brand) ==0 )& (len(color) ==0)) & ((minPrice !=0) & (maxPrice!=0)):
    #     products = Product.objects.myFilter(brand, color, minPrice, maxPrice, catId).order_by(sort)

    # elif catId !='products':
    #     products = Product.objects.myFilter(brand, color, minPrice, maxPrice, catId).order_by(sort)

    # else:
    # try:
    #     products = Product.objects.myFilter(brand).order_by(sort)
    # except len(brand) != 0:
        # products = Product.objects.myFilter(brand).order_by(sort)
    # except catId != 'products':
    #     products = Product.objects.myFilter(catId).order_by(sort)

    if (len(filterList) != 0) | (catId != 'products'):
        products = Product.objects.myFilter(
            catId, brand, color, minPrice, maxPrice).order_by(sort)

    else:
        products = Product.objects.get_active_products(
            minPrice, maxPrice).order_by(sort)

    maxProduct = products.order_by('-price').first()
    minProduct = products.order_by('price').first()

    if maxProduct != None:
        maxPriceProducts = maxProduct.price
    else:
        maxPriceProducts = 0

    if minProduct != None:
        minPriceProducts = minProduct.price
    else:
        minPriceProducts = 0

    totalProductsLen = len(products)

    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(
        products, many=True)
    return Response({'products': serializer.data,
                     'page': page, 'pages': paginator.num_pages,
                     'maxPriceProducts': maxPriceProducts,
                     'minPriceProducts': minPriceProducts,
                     'totalProductsLen': totalProductsLen,
                    #  'catRoute':catSerializer.data
                     })


@api_view(['GET'])
def getCatRoute(request):
    catName = request.query_params.get('catName')

    print(catName)
    if catName is None:
        catName = 'products'
    print(catName)

    catId = 12

    category = Category.objects.filter(slug__icontains=catName).first()
    # category = Category.objects.filter(title__icontains=catName).first()
    print(category)
    full_path = [category]
    k = category.parent
    while k is not None:
        full_path.append(k)
        k = k.parent
        

    catSerializer = CategorySerializer(full_path[::-1], many=True)

    return Response(catSerializer.data)


@api_view(['GET'])
def getProductsBySeller(request):
    user = request.user
    products = Product.objects.get(user=user)
    serializer = ProductSerializer(
        products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductsSearchPreShow(request):
    query = request.query_params.get('keyword')
    products = ''
    if query == None:
        query = ''
    if query != '':
        products = Product.objects.filter(
            name__icontains=query).order_by('-createdAt')[0:4]
    serializer = ProductSerializer(
        products, many=True)

    print(products)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4, is_active=True).order_by('-rating')[0:10]
    serializer = ProductSerializer(
        products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getLastProducts(request):
    products = Product.objects.filter(is_active=True).order_by('-createdAt')[0:10]
    serializer = ProductSerializer(
        products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    convertedDate = product.jCreatedAt
    user=request.user
    
    product.visitCount += 1
    product.save()
    productSerializer = ProductSerializer(product, many=False)
    return Response({
        'product': productSerializer.data,
        'convertedDate': convertedDate
    })


@api_view(['GET'])
def getMainCategories(request):
    categories = Category.objects.get_main_categories()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBrands(request):
    brands = Brand.objects.get_active_brands()
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getColors(request):
    colors = Color.objects.get_active_colors()
    serializer = ColorSerializer(colors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSliders(request):
    sliders = Slider.objects.get_active_sliders()
    serializer = SliderSerializer(sliders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'مجصولی در سبد خرید شما وجود ندارد!'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode']
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        convertedDate = order.jCreatedAt
        print(convertedDate)
        if user.is_staff or order.user == user:
            orderSerializer = OrderSerializer(order, many=False)
            return Response({
                'order': orderSerializer.data,
                'convertedDate': convertedDate
            })
        else:
            Response({'detail': 'دسترسی مجاز نیست'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'سفارش یافت نشد'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.username = data['username']
    user.email = data['email']
    user.is_staff = data['isStaff']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    if user.get_full_name():
        name = user.get_full_name()
    else:
        name = user.username

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'شما یک دیدگاه ثبت شده دارید'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'لطفا یکی از گزینه های امتیاز را انتخاب کنید'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')


@api_view(['GET'])
def productListByUser(request):
    page = request.query_params.get('page')
    user = request.user
    favorite_products = ProductListByUser.objects.get_fav_products().filter(user=user,
                                                                            active=True)
    compare_products = ProductListByUser.objects.get_compare_products().filter(
        user=user, active=True)
    favorite_products_serializer = ProductListByUserSerializer(
        favorite_products, many=True)
    compare_products_serializer = ProductListByUserSerializer(
        compare_products, many=True)
    
    paginator = Paginator(favorite_products, 2)
    page = request.query_params.get('page')
    try:
        favorite_products = paginator.page(page)
    except PageNotAnInteger:
        favorite_products = paginator.page(1)
    except EmptyPage:
        favorite_products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)
    return Response({'favorite_products': favorite_products_serializer.data, 'compare_products': compare_products_serializer.data, 'page':page, 'pages':paginator.num_pages})


@api_view(['GET'])
def addTOFavorite(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    product_exist = ProductListByUser.objects.get_fav_products().filter(user=user)
    if product_exist:
        fav_products = ProductListByUser.objects.filter(
            listName='fav', product___id=pk, user=user).first()
        if fav_products:
            if fav_products.active:
                fav_products.active = False
                fav_products.save()
                message = 'محصول از لیست شما پاک شد'
                return Response({'message': message, 'remove': True, 'add':False})

            else:
                fav_products.active = True
                fav_products.save()
                message = 'محصول با موفقیت به لیست اضافه شد'
                return Response({'message': message, 'remove': False, 'add':True})
        else:
            favorite_product = ProductListByUser.objects.create(
                user=user,
                product=product,
                listName='fav',
                active=True,
            )
        message = 'محصول با موفقیت به لیست اضافه شد'

        # print(fav_products)
    else:
        favorite_product = ProductListByUser.objects.create(
            user=user,
            product=product,
            listName='fav',
            active=True,
        )
        message = 'محصول با موفقیت به لیست اضافه شد'

    serializer = ProductSerializer(
        product, many=False)
    return Response({'message': message})


@api_view(['GET'])
def addToCompare(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    max_product_number_list = ProductListByUser.objects.filter(
        product=product, active=True)
    product_exist = ProductListByUser.objects.get_compare_products().filter(user=user)
    if len(max_product_number_list) <= 4:
        # max_product_number_list not work
        if len(product_exist) > 0:
            compare_products = ProductListByUser.objects.filter(
                listName='com', product___id=pk, user=user).first()
            if compare_products:
                if compare_products.active:
                    compare_products.active = False
                    compare_products.save()
                    message = 'محصول از لیست شما پاک شد'
                    return Response({'message': message, 'remove': True})

                else:
                    compare_products.active = True
                    compare_products.save()
                    message = 'محصول با موفقیت به لیست اضافه شد'
                    return Response({'message': message})
            else:
                compare_product = ProductListByUser.objects.create(
                    user=user,
                    product=product,
                    listName='com',
                    active=True,
                )
                message = 'محصول با موفقیت به لیست اضافه شد'

        else:
            compare_product = ProductListByUser.objects.create(
                user=user,
                product=product,
                listName='com',
                active=True,
            )
            message = 'محصول با موفقیت به لیست اضافه شد'
    else:
        message = {'detail': 'سقف تعداد محصول پر شده است.'}
        return Response({'message': message, status: status.HTTP_400_BAD_REQUEST})

    return Response({'message': message})
