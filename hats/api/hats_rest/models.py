from django.db import models

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=50)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.closet_name

class Hat(models.Model):
    fabric = models.CharField(max_length=50)
    style_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    picture_URL = models.URLField(null=True, blank=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="locations",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.style_name
