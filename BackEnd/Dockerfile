# استخدم صورة PHP الرسمية
FROM php:8.2-cli

# تثبيت المكتبات الأساسية للاتصال بالإنترنت وشهادات الأمان
RUN apt-get update && apt-get install -y \
    git unzip zip libpq-dev libzip-dev \
    libssl-dev ca-certificates \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && update-ca-certificates

# نسخ Composer من صورة رسمية
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# تعيين مجلد العمل
WORKDIR /app

# نسخ المشروع
COPY . .

# تثبيت الـ dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts

# توليد Swagger docs
RUN php artisan l5-swagger:generate || true

# تشغيل التطبيق
CMD php artisan migrate --force \
    && php artisan db:seed --class=TermSeeder --force \
    && php artisan serve --host=0.0.0.0 --port=$PORT
