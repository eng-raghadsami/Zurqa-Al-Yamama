FROM php:8.2-cli
RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y \
    git unzip zip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

# توليد Swagger docs أثناء الـ build
RUN php artisan migrate --force || true \
    && php artisan l5-swagger:generate || true

CMD php artisan serve --host=0.0.0.0 --port=$PORT
