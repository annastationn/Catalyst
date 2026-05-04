---
title: Архитектура
sidebar_position: 1
description: Контекстная и контейнерная диаграммы системы обработки публикаций
hide_table_of_contents: false
---

# Архитектура

## C1 — Контекстная диаграмма

Диаграмма показывает систему обработки публикаций с участием внешних участников и сервисов 

```plantuml
@startuml

actor "Исследователь" as researcher
actor "Администратор" as admin

rectangle "Processing System" as system {
}

rectangle "Object Storage" as storage
database "PostgreSQL" as db

researcher --> system : загружает публикации,\nпросматривает карточки
admin --> system : управляет пользователями\nи проверяет корректность данных
system --> storage : сохраняет PDF\nи изображения
system --> db : хранит метаданные

@enduml
```
![Контекстная диаграмма](/img/cont_diag.png)

## C2 — Контейнерная диаграмма
Диаграмма показывает внутреннее взаимодействий компонентов системы, демонстрирует связи между ними

```plantuml
@startuml

actor "Исследователь" as researcher
actor "Администратор" as admin

rectangle "Frontend" as frontend
rectangle "API Service" as api
rectangle "Processing Service" as processing
queue "RabbitMQ" as rabbitmq
database "PostgreSQL" as db
rectangle "Object Storage" as storage

researcher --> frontend : работает с интерфейсом
admin --> frontend : управляет данными

frontend --> api : REST API
api --> db : SQL-запросы
api --> storage : сохраняет PDF и изображения
api --> rabbitmq : publication.request
rabbitmq --> processing : задача на обработку
processing --> storage : читает файл публикации
processing --> rabbitmq : publication.result
rabbitmq --> api : результат обработки
api --> db : обновляет статус и данные

@enduml
```
![Контейнерная диаграмма](/img/contn_diag.png)

## Основные компоненты

| Компонент | Назначение |
|---|---|
| Frontend | Интерфейс для загрузки публикаций, просмотра архива, поиска и взаимодействия с карточками катализаторов |
| API Service | Основной backend, который принимает REST-запросы, работает с БД и отправляет задачи на обработку |
| Processing Service | Сервис обработки публикаций и извлечения данных о катализаторах|
| RabbitMQ | Брокер сообщений для асинхронной передачи задач и результатов обработки |
| PostgreSQL | Реляционная БД для хранения метаданных|
| Object Storage | Хранилище PDF публикаций и изображений структур катализаторов |

## Внешние зависимости

| Сервис | Тип интеграции | Описание |
|---|---|---|
| Object Storage | HTTP / SDK | Хранение PDF публикаций и изображений структур|
| RabbitMQ | AMQP | Асинхронная передача задач обработки и результатов |
| PostgreSQL | SQL | Хранение публикаций, катализаторов, синтезов, пользователей |
