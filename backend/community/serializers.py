from rest_framework import serializers
from .models import Post, Comment, Tag

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'author_username', 'content', 'timestamp']

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    tags = serializers.SlugRelatedField(slug_field='name', many=True, queryset=Tag.objects.all(), required=False)

    class Meta:
        model = Post
        fields = ['id', 'author_username', 'content', 'timestamp', 'likes_count', 'tags', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()
