from django.db import models

# Create your models here.
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    author = models.CharField(max_length=200, verbose_name="Автор")
    description = models.TextField(verbose_name="Описание")
    year = models.IntegerField(verbose_name="Год издания", null=True, blank=True)
    genre = models.CharField(max_length=100, verbose_name="Жанр", null=True, blank=True)
    available = models.BooleanField(default=True, verbose_name="В наличии")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата добавления")
    
    def __str__(self):
        return f"{self.author} - {self.title}"
    
    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"
        ordering = ['-created_at']