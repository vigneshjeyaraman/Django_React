import json
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, force_authenticate, RequestsClient
from rest_framework.test import APIRequestFactory
from apps.accounts.views import ShipmentManagement
from apps.accounts.models import User, Shipments


class UserTestCase(APITestCase):
    def setup(self):
        self.client = RequestsClient()
        

    def test_signup(self):
        '''
            Signup user.Positive case
        '''
        response = self.client.post('/accounts/signup', json.dumps({"email":"test@email.com","password":"test12345","phone_number":"9810503229","username":"testuser"}), content_type='application/json')
        print("Signup",response.content)
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 200)
        
    def test_login(self):
        '''
            Logging in user.Positive case
        '''
        user_obj= User.objects.create_user(username="testuser",password="test12345",email="test@email.com",phone_number="9810503229")
        response = self.client.post('/accounts/login', json.dumps({"email":"test@email.com","password":"test12345"}), content_type='application/json')
        print("Login",response.content)
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 200)

    def test_shipment(self):
        '''
            Here we are testing 5 positive test cases
            1. Creating new shipment
            2. Getting all shipment
            3. Getting particular shipment
            4. Updating particular shipment
            5. Deleting particular shipment
        '''
        user_obj= User.objects.create_user(username="testuser",password="test12345",email="test@email.com",phone_number="9810503229")
        data = {"address" :"Estonia", "item_name" : "Macbook pro","payment_choice" :1}
        request = APIRequestFactory().post('/accounts/shipment/',data=data)
        create_shipment = ShipmentManagement.as_view({'post': 'create'})
        force_authenticate(request, user=user_obj)
        response = create_shipment(request).render()
        print("Created:-",json.loads(response.content)['data'])
        print('-------------------------------------------------------------------------------------------------')
        shipment_id = json.loads(response.content)['data']['id']
        self.assertEqual(response.status_code, 200)
        
        request = APIRequestFactory().get('/accounts/shipment/')
        force_authenticate(request, user=user_obj)
        get_all_shipment = ShipmentManagement.as_view({'get': 'list'})
        response = get_all_shipment(request).render()
        print("All shipments:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 200)

        request = APIRequestFactory().get('/accounts/shipment/%d'%(shipment_id))
        force_authenticate(request, user=user_obj)
        get_shipment = ShipmentManagement.as_view({'get': 'retrieve'})
        response = get_shipment(request,pk=shipment_id).render()
        print("Particular shipment:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 200)

        data = {"item_name" : "Ipad Mini","payment_choice" :2}
        request = APIRequestFactory().put('/accounts/shipment/%d'%(shipment_id),data=data)
        force_authenticate(request, user=user_obj)
        get_shipment = ShipmentManagement.as_view({'put': 'update'})
        response = get_shipment(request,pk=shipment_id).render()
        print("Update shipment:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 200)
        
        request = APIRequestFactory().delete('/accounts/shipment/%d'%(shipment_id))
        force_authenticate(request, user=user_obj)
        delete_shipment = ShipmentManagement.as_view({'delete': 'destroy'})
        response = delete_shipment(request,pk=shipment_id).render()
        self.assertEqual(response.status_code, 200)

    # Negative cases
    def test_negative_signup(self):
        '''
            Signup user.Positive case
        '''
        response = self.client.post('/accounts/signup', json.dumps({"password":"test12345","phone_number":"9810503229","username":"testuser"}), content_type='application/json')
        print("Negative Signup",response.content)
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 400)
        
    def test_negative_login(self):
        '''
            Logging in user.Positive case
        '''
        response = self.client.post('/accounts/login', json.dumps({"email":"test@email.com","password":"test12345"}), content_type='application/json')
        print("Negative Login",response.content)
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 400)

    def test_negative_shipment(self):
        '''
            Here we are testing 5 positive test cases
            1. Creating new shipment
            2. Getting all shipment
            3. Getting particular shipment
            4. Updating particular shipment
            5. Deleting particular shipment
        '''
        user_obj= User.objects.create_user(username="testuser",password="test12345",email="test@email.com",phone_number="9810503229")
        data = {"item_name" : "Macbook pro","payment_choice" :1}
        request = APIRequestFactory().post('/accounts/shipment/',data=data)
        create_shipment = ShipmentManagement.as_view({'post': 'create'})
        force_authenticate(request, user=user_obj)
        response = create_shipment(request).render()
        print("Negative Created:-",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        # shipment_id = json.loads(response.content)['data']['id']
        self.assertEqual(response.status_code, 400)
        
        request = APIRequestFactory().get('/accounts/shipment/')
        # force_authenticate(request, user=user_obj)
        get_all_shipment = ShipmentManagement.as_view({'get': 'list'})
        response = get_all_shipment(request).render()
        print("Without user authentication All shipments:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 401)

        request = APIRequestFactory().get('/accounts/shipment/%d'%(33))
        force_authenticate(request, user=user_obj)
        get_shipment = ShipmentManagement.as_view({'get': 'retrieve'})
        response = get_shipment(request,pk=33).render()
        print("Particular shipment with invalid id:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 404)

        data = {"item_name" : "Ipad Mini","payment_choice" :2}
        request = APIRequestFactory().put('/accounts/shipment/%d'%(33),data=data)
        force_authenticate(request, user=user_obj)
        get_shipment = ShipmentManagement.as_view({'put': 'update'})
        response = get_shipment(request,pk=33).render()
        print("Update shipment with invalid id:",json.loads(response.content))
        print('-------------------------------------------------------------------------------------------------')
        self.assertEqual(response.status_code, 400)
        
        request = APIRequestFactory().delete('/accounts/shipment/%d'%(33))
        force_authenticate(request, user=user_obj)
        delete_shipment = ShipmentManagement.as_view({'delete': 'destroy'})
        response = delete_shipment(request,pk=33).render()
        self.assertEqual(response.status_code, 400)

    