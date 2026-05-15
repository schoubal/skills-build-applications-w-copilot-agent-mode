"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.http import HttpResponseRedirect
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

CODESPACE_NAME = os.environ.get('CODESPACE_NAME')
CODESPACE_HOST = f'{CODESPACE_NAME}-8000.app.github.dev' if CODESPACE_NAME else None

@api_view(['GET'])
def api_root(request, format=None):
    if CODESPACE_HOST:
        base_url = f'https://{CODESPACE_HOST}/api'
        return Response({
            'users': f'{base_url}/users/',
            'teams': f'{base_url}/teams/',
            'activities': f'{base_url}/activities/',
            'workouts': f'{base_url}/workouts/',
            'leaderboard': f'{base_url}/leaderboard/',
        })
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'teams': reverse('team-list', request=request, format=format),
        'activities': reverse('activity-list', request=request, format=format),
        'workouts': reverse('workout-list', request=request, format=format),
        'leaderboard': reverse('leaderboard-list', request=request, format=format),
    })

urlpatterns = [
    path('', lambda request: HttpResponseRedirect('/api/')),  # Redirect root to /api/
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'api'))),
    path('api-root/', api_root, name='api-root'),
]
