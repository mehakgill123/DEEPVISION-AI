import cv2
import torch
from torch import amp
from datetime import timedelta
from django.utils import timezone
from django.http import StreamingHttpResponse, JsonResponse, HttpResponse
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from .models import Camera, DetectionLog, Alert, AlertTracker
from django.core.mail import EmailMessage

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

danger_objects = ['knife', 'gun', 'scissors', 'fire', 'explosive', 'hammer', 'screwdriver', 'razor', 'sword', 'axe', 'pen']

from django.views.decorators.http import require_http_methods
from .models import Camera
from users.models import CustomUser
import json

import os
import uuid
from django.core.files import File
from django.conf import settings

from users.utils import jwt_encode, jwt_decode, auth_user

@csrf_exempt
@require_http_methods(["GET"])
def list_cameras(request):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)
    
    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
    
    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')
    
    try:
        user = CustomUser.objects.get(email=user_email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
    
    try:
        cameras = Camera.objects.filter(user=user)
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error fetching cameras: {str(e)}'}, status=500)
    
    camera_list = [
        {
            "id": camera.id,
            "name": camera.name,
            "ip_url": camera.ip_url,
            "is_active": camera.is_active
        }
        for camera in cameras
    ]
    return JsonResponse(
        {
            "success": True,
            "message": "Cameras fetched successfully",
            "cameras": camera_list
        },
        status=200
    )

@csrf_exempt
@require_http_methods(["GET"])
def get_camera(request, camera_id):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)
    
    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
    
    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')
    
    try:
        user = CustomUser.objects.get(email=user_email)
        camera = Camera.objects.get(id=camera_id, user=user)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
    except Camera.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Camera not found.'}, status=404)
    
    camera_data = {
        "id": camera.id,
        "name": camera.name,
        "ip_url": camera.ip_url,
        "is_active": camera.is_active
    }
    return JsonResponse(
        {
            "success": True,
            "message": "Camera fetched successfully",
            "camera": camera_data
        },
        status=200
    )

@csrf_exempt
@require_http_methods(["POST"])
def add_camera(request):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)
    
    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
    
    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')
    
    try:
        user = CustomUser.objects.get(email=user_email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON in request body.'}, status=400)
    
    try:
        camera = Camera.objects.create(
            user=user,
            name=data.get('name'),
            ip_url=data.get('ip_url'),
            is_active=data.get('is_active', True)
        )
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error creating camera: {str(e)}'}, status=500)
    
    return JsonResponse(
        {
            "success": True,
            "message": "Camera added successfully",
            "camera": {
                "id": camera.id,
                "name": camera.name,
                "ip_url": camera.ip_url,
                "is_active": camera.is_active
            }
        },
        status=201
    )

@csrf_exempt
@require_http_methods(["PUT"])
def update_camera(request, camera_id):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)
    
    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
    
    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')
    
    try:
        user = CustomUser.objects.get(email=user_email)
        camera = Camera.objects.get(id=camera_id, user=user)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
    except Camera.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Camera not found.'}, status=404)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON in request body.'}, status=400)
    
    if 'name' in data:
        camera.name = data.get('name')
    if 'ip_url' in data:
        camera.ip_url = data.get('ip_url')
    if 'is_active' in data:
        camera.is_active = data.get('is_active')
    
    camera.save()
    return JsonResponse(
        {
            "success": True,
            "message": "Camera updated successfully",
            "camera": {
                "id": camera.id,
                "name": camera.name,
                "ip_url": camera.ip_url,
                "is_active": camera.is_active
            }
        },
        status=200
    )

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_camera(request, camera_id):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)
    
    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
    
    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')
    
    try:
        user = CustomUser.objects.get(email=user_email)
        camera = Camera.objects.get(id=camera_id, user=user)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
    except Camera.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Camera not found.'}, status=404)
    
    camera.delete()
    return JsonResponse({"success": True, "message": "Camera deleted successfully"}, status=200)

ALERT_INTERVAL = timedelta(minutes=1)

def generate_frames(camera_url, user):
    cap = cv2.VideoCapture(camera_url)
    camera_obj = Camera.objects.get(ip_url=camera_url)

    while True:
        success, frame = cap.read()
        if not success:
            break

        with amp.autocast('cuda'):
            results = model(frame)

        detections = results.pandas().xyxy[0]
        now = timezone.now()

        for _, row in detections.iterrows():
            x1, y1, x2, y2 = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])
            confidence, cls = row['confidence'], row['name']

            if cls in danger_objects:
                tracker, created = AlertTracker.objects.get_or_create(
                    camera=camera_obj,
                    object_type=cls,
                    defaults={'last_alert_time': now}
                )

                if created or (now - tracker.last_alert_time > ALERT_INTERVAL):
                    img_filename = f"{uuid.uuid4()}.jpg"
                    img_path = os.path.join(settings.MEDIA_ROOT, 'detections', img_filename)
                    os.makedirs(os.path.dirname(img_path), exist_ok=True)
                    cv2.imwrite(img_path, frame)

                    with open(img_path, 'rb') as f:
                        detection_log = DetectionLog.objects.create(
                            camera=camera_obj,
                            object_type=cls,
                            confidence=confidence,
                            x_min=x1,
                            y_min=y1,
                            x_max=x2,
                            y_max=y2
                        )
                        detection_log.image.save(img_filename, File(f), save=True)

                    alert = Alert.objects.create(
                        camera=camera_obj,
                        detection_log=detection_log,
                        message=f"Danger: {cls} {confidence:.2f}"
                    )

                    email = EmailMessage(
                        subject=f"Danger Detected: {cls}",
                        body=f"Dangerous object detected: {cls}\n"
                                f"Confidence: {confidence:.2f}\n"
                                f"Location: ({x1}, {y1}) to ({x2}, {y2})\n"
                                f"Camera: {detection_log.camera.name}\n"
                                f"Time: {detection_log.detected_at}\n"
                                f"Alert ID: {alert.id}",
                        from_email=settings.EMAIL_HOST_USER,
                        to=['mehakgill2628@gmail.com', user.email]
                    )
                    
                    with open(img_path, 'rb') as f:
                        email.attach(img_filename, f.read(), 'image/jpeg')
                    
                    email.send()

                    Alert.objects.create(
                        camera=camera_obj,
                        detection_log=detection_log,
                        message=f"Danger: {cls} {confidence:.2f}"
                    )

                    tracker.last_alert_time = now
                    tracker.save()

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
                cv2.putText(frame, f"Danger: {cls} {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            else:
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f"{cls} {confidence:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@csrf_exempt
def video_stream(request):
    camera_id = request.GET.get('camera_id')
    try:        
        token = request.GET.get('token')
        if not auth_user(token):
            return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)
        
        decoded_token = jwt_decode(token)
        user_email = decoded_token.get('email')
        
        try:
            user = CustomUser.objects.get(email=user_email)
            camera = Camera.objects.get(id=camera_id, user=user)
        except CustomUser.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)
        except Camera.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Camera not found.'}, status=404)
        return StreamingHttpResponse(
            generate_frames(camera.ip_url, user), 
            content_type='multipart/x-mixed-replace; boundary=frame'
        )
    except Camera.DoesNotExist:
        return HttpResponse("Camera not found", status=404)

# @csrf_exempt
# def video_stream(request):
#     cameras = Camera.objects.all()
#     frames = (frame for camera in cameras for frame in generate_frames(camera.ip_url))
#     return StreamingHttpResponse(frames, content_type='multipart/x-mixed-replace; boundary=frame')