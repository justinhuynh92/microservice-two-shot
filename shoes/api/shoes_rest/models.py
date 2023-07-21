from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_id = models.PositiveSmallIntegerField()
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.PROTECT,
    )

    def get_href(self):
        return reverse("api_list_shoes", kwargs={"pk": self.pk})
