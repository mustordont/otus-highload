## Установка

Требования для установки NodeJS@18, Dockerdocker

```sh
$ npm ci
```

### Запуск в dev режиме

Потребуется postgres

```bash
docker-compose -f ./tools/docker-compose.yml up
```

Сам запуск

```bash
npm run start:dev
```

### Конфигурация

Конфигурация приложения задается через config.yaml, который должен располагаться в корне приложения ([пример файла](config.yaml)).

Валидируется и применяется при старте.

### SWAGGER

Генерируется автоматически с помощью [@nestjs/swagger plugin](https://docs.nestjs.com/openapi/introduction).

Этот плагин автоматически добавляет ТОЛЬКО модели попадающие под условия поиска, указанные в [dtoFileNameSuffix](nest-cli.json)

Пример ссылки на swagger ui [http://localhost:8000/swagger](http://localhost:8000/swagger)

## Docker

### Сборка образа

```bash
$ docker build -t otus-highload -f ./tools/Dockerfile .
```

### Запуск контейнера

Конфигурация по умолчанию не применяется, нужно монтировать в контейнер при старте.

```bash
$ docker run -d --rm -v "$(pwd)"/config.yaml:/app/config.yaml --net=host otus-highload
```
