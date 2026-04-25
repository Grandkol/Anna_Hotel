can# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hotel "Anna" — a Django-based hotel booking website with a Russian-language UI. Booking requests are not stored in a database; they are delivered via Telegram bot and email (mail.ru SMTP).

## Commands

### Local Development
```bash
pip install -r hotel/requirements.txt
python hotel/manage.py migrate
python hotel/manage.py runserver
python hotel/manage.py collectstatic
```

### Docker (development)
```bash
docker-compose up --build
# Accessible at http://localhost:8000
```

### Docker (production images)
```bash
docker-compose -f docker-compose-production.yml up
# Uses pre-built images: grandkol/anna_hotel_backend, grandkol/anna_hotel_gateway
```

### Linting
```bash
python -m flake8 hotel/
```
Flake8 + flake8-isort; config in `setup.cfg`. Migrations and `settings.py` long lines are excluded.

## Architecture

### Request Flow
```
User → Nginx (gateway/) → Gunicorn → Django (hotel/)
```
Static files are served by WhiteNoise (CompressedManifestStaticFilesStorage).

### Django App Structure
- **`hotel/hotel/`** — project settings, root URL conf, wsgi/asgi
- **`hotel/core/`** — the single Django app; all views are function-based
- **`hotel/templates/`** — template inheritance rooted at `base.html`; reusable partials in `templates/includes/`
- **`hotel/static/`** — CSS/JS/images; third-party libraries vendored under `static/vendors/`; SCSS sources in `static/scss/`

### Booking Flow
The `index` view (`core/views.py`) handles the booking form POST:
1. Extracts arrival, departure, guests, name, phone from POST data
2. Sends Telegram messages to 3 hardcoded recipient IDs via pyTelegramBotAPI
3. Sends an email notification via SMTP (mail.ru)
4. No booking record is written to the database

### No Custom Models
The project uses no custom Django models. The SQLite DB exists only for Django's built-in auth/admin tables.

### URL Routes
`/` → index, `/about/`, `/galery/` (note typo in URL), `/contacts/`, `/admin/`

## CI/CD (`.github/workflows/main.yml`)
On push to `main`:
1. **tests** — runs `flake8` against `hotel/`
2. **build_and_push_to_docker_hub** — builds and pushes `grandkol/anna_hotel_backend`
3. **build_gateway_and_push_to_docker_hub** — builds and pushes `grandkol/anna_hotel_gateway`
4. **deploy** job is present but commented out (would SSH into the server and restart containers)

Required GitHub secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD`. Deploy secrets (`HOST`, `USER`, `SSH_KEY`, `SSH_PASSPHRASE`) are needed only if the deploy job is re-enabled.

## Environment Variables
Configured in `hotel/.env`; key variables:
- `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`
- `DB_ENGINE`, `DB_NAME`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DB_HOST`, `DB_PORT` (PostgreSQL in production; SQLite used when these are absent)
- Telegram bot token and recipient IDs are currently hardcoded in `core/views.py`, not in `.env`

## Dependency Notes
`requirements.txt` contains several unused packages (Flask, PyAutoGUI, pywhatkit, wikipedia). Do not add more unless actually needed.