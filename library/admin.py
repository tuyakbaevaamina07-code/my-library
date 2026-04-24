from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'year', 'available', 'created_at']
    list_filter = ['available', 'author', 'genre']
    search_fields = ['title', 'author']