from .models import Hat, LocationVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]

class HatsDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
        "id",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }

class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "id",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}

@require_http_methods({"GET", "POST"})
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hat = Hat.objects.filter(location=location_vo_id)
        else:
            hat = Hat.objects.all()
        return JsonResponse(
            {"hats": hat},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )

@require_http_methods({"GET", "PUT", "DELETE"})
def api_show_hat(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
            return JsonResponse(
                hat,
                encoder=HatsDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid hat id"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else:
        content = json.loads(request.body)
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatsDetailEncoder,
            safe=False,
        )
