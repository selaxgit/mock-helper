# Mock helper

Мой велосипед для сервиса моков http-запросов

Версия NodeJS 22.16.0

### Локальный запуск

#### В одной консоли

```shell
$ cd api
$ npm ci
$ npm run migration:run
$ npm run start
```

Будет сгенерирована БД `api/db/mock-helper.sqlite`. Ее потом можно будет использовать для проброса извне в докер при старте (`-v /home/db/:/db`), чтобы данные не пропадали при отключении докер-контейнера

Посмотреть сваггер для API можно по ссылке http://localhost:3000/api/swagger

#### В другой консоли

```shell
$ cd web
$ npm ci
$ npm run start
```

Приложение откроется по ссылке http://localhost:4200

### Собрать образ рядом с Dockerfile

```sh
$ docker build -t mh-app .
```

### Образ в архив

```sh
$ docker save -o mh-app.tar mh-app:latest
```

### Удалить образ

```sh
$ docker rmi mh-app --force
```

### Убедиться, что нет доступных образов

```sh
$ docker images | grep mh-app | wc -l
```

### Загрузить образ из архива в среду Docker

```sh
$ docker load -i mh-app.tar
```

### Запуск

```sh
$ docker run --rm --name mh-app -dp 3000:3000 mh-app
```

### Зайти

```sh
$ docker exec -it mh-app sh
```
