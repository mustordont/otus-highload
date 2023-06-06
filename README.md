## Установка

В зависимостях идет [@trend-dev/core](https://github.com/trend-dev/core), который публикуется в private github-packages, поэтому нужен [Personal access token](https://github.com/settings/tokens)

[Working with a github packages registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

Personal Access Token с нужным уровнем доступа можно получить у себя [в профиле](https://github.com/settings/tokens)

Твой токен (в дальнейшем NPM_TOKEN) должен быть с правами на `repo` и `read:packages`.

```sh
$ npm login --scope=@trend-dev --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: NPM_TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

## Использование nestjs schematics

Создание модуля

```bash
nest g module example
```

Создание контроллера

```bash
nest g controller example/example
```

Создание сервиса

```bash
nest g service example/example
```

## Конфигурация

Конфигурация приложения задается через config.yaml, который должен располагаться в корне приложения ([пример файла](config.yaml)).

Валидируется и применяется при старте.

## Работа с кодом

Общие правила работы с ветками соответствуют стандартному GitFlow и описаны [здесь](https://www.notion.so/trendtech/Flow-efe38a59ef454285bbf3d02d88fa096e)

### Prettier

В проекте подключен [prettier](.prettierrc)

Для продуктов Jetbrains можно явно указать его использование:
https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_install

### Commits

Перед коммитом автоматически прогоняется Prettier, ESLint и [Commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

### Release

Генерацию [сhangelog](CHANGELOG.md) (требуется наличие предыдущего git tag) и проставление версии можно делать через команды:

```bash
npm run release
npm run release:major
npm run release:minor
npm run release:patch
```

## SWAGGER

Генерируется автоматически с помощью [@nestjs/swagger plugin](https://docs.nestjs.com/openapi/introduction).

Этот плагин автоматически добавляет ТОЛЬКО модели попадающие под условия поиска, указанные в [dtoFileNameSuffix](nest-cli.json)

Пример ссылки на swagger ui на деве [https://cabinets.trend-team-04.tech/swagger](https://cabinets.trend-team-04.tech/swagger)

## Docker

### Сборка образа

Пример, с использованием NPM_TOKEN:

```bash
$ docker build -t cabinets --build-arg "NPM_TOKEN=${NPM_TOKEN}" -f ./tools/Dockerfile .
```

### Запуск контейнера

Конфигурация по умолчанию не применяется, нужно монтировать в контейнер при старте.

```bash
-v "$(pwd)"/config.yaml:/app/config.yaml
```

### Запуск контейнера на mac

Если нужен доступ из контейнера до хост машины через localhost, то его нужно заменять на специальную директиву host.docker.internal

Пример проброса как переменной окружения:

```bash
$ docker run -d -e "HOST=host.docker.internal" -v "$(pwd)"/config.yaml:/app/config.yaml -p 8000:8000 image-tag
```

Или заменить в config.yaml

### Обновление

Обновление всех модулей содержащих nestjs в названии:

```bash
npx npm-check-updates "/nestjs*/" -u
```

Установка новых версий

Надо только посмотреть что получается с версией этого nestjs-swagger-api-exception-decorator модуля
Они версию у себя слишком строго зафиксировали
https://github.com/nanogiants/nestjs-swagger-api-exception-decorator/blob/develop/package.json#L32

```bash
npm install
```
