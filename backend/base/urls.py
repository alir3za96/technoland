from django.urls import path
from . import views
urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('users/register', views.registerUser, name='register'),
    path('users/profile/', views.getUserProfile, name='user-profile'),
    path('users/profile/update', views.updateUserProfile,
         name='user-profile-update'),
    path('users/', views.getAllUsers, name='users'),

    path('users/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('users/update/<str:pk>', views.updateUser, name='user-update'),
    path('users/<str:pk>/', views.getUserById, name='user'),
    
    
    path('user/products/favorite/', views.productListByUser, name='favorite-list'),
    path('user/add-to-favorite/<str:pk>/', views.addTOFavorite, name='add-to-favorite'),
    
    path('user/add-to-compare/<str:pk>/', views.addToCompare, name='add-to-compare'),

    path('products/', views.getProducts, name='all-products'),
    path('products/search', views.getProductsSearch, name='search-products'),
    path('products/preshow-search', views.getProductsSearchPreShow, name='preshow-search-products'),
    path('products/top/', views.getTopProducts, name='top-products'),
    path('products/last/', views.getLastProducts, name='last-products'),
    path('products/<str:pk>/reviews/',
         views.createProductReview, name="create-review"),
    path('products/<str:pk>', views.getProduct, name='product'),

    # path('orders/', views.getOrders, name='orders'),
    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/myorders/', views.getMyOrders, name='my-orders'),
    path('orders/<str:pk>/', views.getOrderById, name='user-order'),
    path('orders/<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    
    path('categories/main/', views.getMainCategories, name='main-categories'),
    path('categories/route/', views.getCatRoute, name='category-route'),
    
    path('brands/', views.getBrands, name='brands'),
        
    path('sliders/', views.getSliders, name='sliders'),
    
    path('colors/', views.getColors, name='colors'),
    

]
