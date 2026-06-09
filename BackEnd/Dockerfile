FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libzip-dev \
    libssl-dev \
    ca-certificates \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && update-ca-certificates

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app

# نسخ ملفات Composer أولاً
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# نسخ باقي المشروع
COPY . .

# لا تشغلي l5-swagger أثناء الـ Build إذا كان يسبب تعليقاً
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
