from django.db import models

class Collection(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    display_author_type = models.CharField(max_length=255, default="HOSTNAME")
    position = models.CharField(max_length=10)

    def __str__(self):
        return self.title

class CollectionCard(models.Model):
    collection = models.ForeignKey(Collection, related_name='items', on_delete=models.CASCADE)
    url = models.URLField()
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    author = models.CharField(max_length=255)
    original_author = models.CharField(max_length=255)
    position = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
