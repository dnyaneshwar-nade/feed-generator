# from rest_framework import serializers
# from .models import Collection, CollectionCard

# class CollectionCardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CollectionCard
#         fields = '__all__'

# class CollectionSerializer(serializers.ModelSerializer):
#     items = CollectionCardSerializer(many=True, read_only=True)

#     class Meta:
#         model = Collection
#         fields = '__all__'
