from django.contrib.auth import authenticate
from rest_framework import serializers
from apps.accounts.models import User, Shipments

class SignupSerializer(serializers.ModelSerializer):
    """
        SignupSerializer class .
    """
    email = serializers.EmailField(required=True, min_length=3, max_length=70)
    password = serializers.CharField(required=True, write_only=True, min_length=8, max_length=15)
    phone_number = serializers.CharField(required=True, max_length=19)
    username = serializers.CharField(max_length=50)
    
    def validate_email(self, email):
        """
            method used to check email already exist in database.
        :param email:
        :return: email
        """
        email = email.lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email already registered.')
        return email
    
    def validate_phone_number(self, phone_number):
        """
            method used to check email already exist in database.
        :param email:
        :return: email
        """
        if User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError('Phone Number already registered.')
        return phone_number

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'id','phone_number')
    
    def create(self,validated_data):
        """
            We have overridden the create method of the modelserializer. 
        """
        user_obj =  User.objects.create(**validated_data)
        return user_obj

class LoginSerializer(serializers.ModelSerializer):
    """
        Login Serializer to validate user credentials.
    """
    email = serializers.EmailField(required=True, min_length=3, max_length=70)
    password = serializers.CharField(required=True, write_only=True, min_length=8, max_length=20)
    
    class Meta:
        model = User
        fields = ('email','password')
    def validate(self, attrs):
        user = authenticate(email=attrs['email'].lower(), password=attrs['password'])
        if user is not None:
            # add user in attrs
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Incorrect email address or Password')
        return attrs

class ShipmentsGetSerializer(serializers.ModelSerializer):
    """
        Serializer to serialize shipments object
    """
    class Meta:
        model = Shipments
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    user_shipments = ShipmentsGetSerializer(many=True)
    class Meta:
        model = User
        fields = ('id','username',"email","phone_number","user_shipments")
    

class ShipmentsCreateSerializer(serializers.ModelSerializer):
    """
        Serializer to validate shipments
    """ 
    address = serializers.CharField(required=True)
    item_name = serializers.CharField(required=True)
    CARD = 1
    CASH = 2
    PAYMENT_CHOICE = (
        (CARD,'Card'),
        (CASH,'Cash')
    )
    payment_choice = serializers.ChoiceField(choices=PAYMENT_CHOICE)

    class Meta:
        model = Shipments
        exclude = ('user',)