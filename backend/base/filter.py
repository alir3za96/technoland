# from .serializers import ProductSerializer
# from django_filters import rest_framework as filters
# from .models import Product
# from rest_framework import generics


# class ProductFilter(filters.FilterSet):
#     min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
#     max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

#     class Meta:
#         model = Product
#         fields = ['price', 'brand']


# class ProductList(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     filterset_class = ProductFilter


# # class ProductFilter(django_filters.FilterSet):
# #     # minPrice = django_filters.NumberFilter()
# #     # maxPrice = django_filters.NumberFilter()
# #     # minPrice__gt = django_filters.NumberFilter(field_name='price', lookup_expr='gt')
# #     # maxPrice__lt = django_filters.NumberFilter(field_name='price', lookup_expr='lt')

    
# #     color = django_filters.CharFilter(lookup_expr='icontains')
# #     brand = django_filters.CharFilter(lookup_expr='icontains')

# #     class Meta:
# #         model = Product
# #         fields = ['brand','color','price']