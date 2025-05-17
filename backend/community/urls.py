from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentCreateView, TrendingTagsView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/', PostViewSet.as_view({'get': 'list'}), name='create-post'),
    path('posts/<int:post_id>/comment/', CommentCreateView.as_view(), name='add-comment'),
    path('trending/', TrendingTagsView.as_view(), name='trending-tags'),
]
