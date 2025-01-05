# Utiliser une image PHP avec extensions nécessaires
FROM php:8.2-fpm

# Installer des dépendances
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libmcrypt-dev \
    && docker-php-ext-install zip pdo_mysql mbstring gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR ./var/www

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances PHP
RUN composer install

# Définir les permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
