from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from response import ShipmentSuccessResponse
from pagination import ShipmentPagination
from custom_exception import CustomApiException, get_custom_error_message
from apps.accounts.models import User, Shipments
from apps.accounts.serializers import (UserSerializer, ShipmentsGetSerializer,
                                       ShipmentsCreateSerializer, SignupSerializer, LoginSerializer)

class SignUp(APIView):
    """
        Signup view where user provides basic information and should be able to signup
    """
    def post(self, request, *args, **kwargs):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_obj = serializer.save()
        user_obj.set_password(serializer.validated_data.get('password'))
        user_obj.save()
        token,created = Token.objects.get_or_create(user=user_obj)
        serializer = UserSerializer(user_obj)
        data = serializer.data
        data.update({"token":token.key})
        return ShipmentSuccessResponse(data)

class Login(APIView):
    """
        Login view to let user login into the App
    """
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token, created = Token.objects.get_or_create(user=serializer.validated_data.get('user'))
        serializer = UserSerializer(serializer.validated_data.get('user'))
        data = serializer.data
        data.update({"token":token.key})
        return ShipmentSuccessResponse(data)

class ShipmentManagement(viewsets.ModelViewSet):
    """
        We have used ModelViewSet for shipment management. ModelViewSet provides
        5 methods to us 
            1. List
            2. Retrieve
            3. Create
            4. Update
            5. Destroy
    """

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return ShipmentsCreateSerializer
        return ShipmentsGetSerializer
    pagination_class = ShipmentPagination
    permission_classes = (IsAuthenticated,)
    queryset = Shipments.objects.order_by('-created_at')

    def get_queryset(self):
        queryset = self.queryset.filter(user=self.request.user).all()
        return queryset
    
    def create(self, request):
        if not request.data:
            return Response(get_custom_error_message(message="Invalid data", 
                            error_location='Create Shipment', status=400),status=400)
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save(user=request.user)
        obj.arriving_at = (datetime.utcnow() + timedelta(days=5)).date()
        obj.save()
        serializer = ShipmentsGetSerializer(obj)
        return ShipmentSuccessResponse(serializer.data)
    
    def update(self, request, pk=None):
        shipment_obj = Shipments.objects.filter(id=pk,user=request.user).first()
        if not shipment_obj:
            return Response(get_custom_error_message(status=400, message="Invalid Shipment ID",
                                                     error_location="Update Shipment"),status=400)
        serializer = ShipmentsCreateSerializer(instance=shipment_obj,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ShipmentSuccessResponse(serializer.data)        
    
    def destroy(self, request, pk=None):
        shipment_obj = Shipments.objects.filter(id=pk,user=request.user).first()
        if not shipment_obj:
            return Response(get_custom_error_message(status=400, message="Invalid Shipment ID",
                                                     error_location="Delete Shipment"),status=400)
        shipment_obj.delete()
        return ShipmentSuccessResponse({"message":"Shipment deleted successfully"})