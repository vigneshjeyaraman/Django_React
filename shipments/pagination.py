from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict

class ShipmentPagination(PageNumberPagination):
    """
    """
    def paginate_queryset(self, queryset, request, view=None):
        self.page_size_query_param = 'page_size'
        return super(ShipmentPagination, self).paginate_queryset(queryset, request, view)