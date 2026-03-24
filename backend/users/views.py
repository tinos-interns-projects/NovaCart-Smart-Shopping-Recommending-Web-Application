from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        username = data.get('username')
        email = data.get('email', '')
        password = data.get('password')
        phone = data.get('phone', '')
        
        if not username or not password:
            return JsonResponse({'success': False, 'message': 'Username and password are required'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': 'Username already exists'}, status=400)
        
        # Validate password
        try:
            validate_password(password)
        except ValidationError as e:
            return JsonResponse({'success': False, 'message': str(e.messages[0])}, status=400)
        
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error creating user: {str(e)}'}, status=400)
        
        return JsonResponse({'success': True, 'message': 'Registration successful', 'username': user.username}, status=200)
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'success': False, 'message': 'Username and password are required'}, status=400)
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            return JsonResponse({
                'success': True, 
                'message': 'Login successful',
                'username': user.username,
                'email': user.email
            }, status=200)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def staff_login(request):
    """Staff login endpoint - only allows users with is_staff=True"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except:
            data = request.POST
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'success': False, 'message': 'Username and password are required'}, status=400)
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            if user.is_staff:
                return JsonResponse({
                    'success': True, 
                    'message': 'Staff login successful',
                    'username': user.username,
                    'email': user.email
                }, status=200)
            else:
                return JsonResponse({'success': False, 'message': 'Access denied. Staff credentials required.'}, status=403)
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def logout_view(request):
    """Logout endpoint - destroys the session"""
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': True, 'message': 'Logout successful'}, status=200)
    return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)
