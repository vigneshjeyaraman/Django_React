from django.contrib.gis.db import models
from django.contrib.auth.models import(AbstractUser)

class BaseModel(models.Model):
    """
    Core models to save the common properties such as:
        created_at,
        updated_at,
        last_modified_by.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Last Updated At')

    class Meta:
        abstract = True
        verbose_name = 'BaseModel'


class User(AbstractUser, BaseModel):
    """
    MyUser models used for the authentication process and it contains basic
     fields.
     Inherit : AbstractUser, CoreModels
    """
    email = models.EmailField('Email', max_length=70, unique=True, blank=False)
    phone_number = models.CharField('Phone Number', max_length=19, unique=True, blank=True, null=True)
    username = models.CharField('UserName', max_length=50, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    def __str__(self):
        """
        :return: email
        """
        return self.email

    def get_short_name(self):
        return self.email
    
    class Meta:
        verbose_name = 'Users   '
        ordering = ['id']

class Shipments(BaseModel):
    """
        Model to map all the users shipments
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='user_shipments')
    address = models.CharField(max_length=200)
    item_name = models.CharField(max_length=40) # in future we can have product table and make it as item a foreign key
    arriving_at = models.DateField(null=True, blank=True)
    CARD = 1
    CASH = 2
    PAYMENT_CHOICE = (
        (CARD, 'Card'),
        (CASH,'Cash')
    )
    payment_choice = models.IntegerField(choices=PAYMENT_CHOICE,default=CASH)