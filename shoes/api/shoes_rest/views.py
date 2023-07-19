from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoe, BinVO


class ShoeEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
    ]

    def get_extra_data(self, o):
        return {"bin": o.bin.import_id}


@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_id = content["bin"]
            bin = BinVO.objects.get(import_id=bin_id)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            {"shoe": shoe},
            encoder=ShoeEncoder,
        )
    else:
        count, _ = Shoe.objects.get(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
