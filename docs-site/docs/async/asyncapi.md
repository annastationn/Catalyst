# Асинхронное взаимодействие 
## Выбор технологии
В данной системе для асинхронного процесса рассмотрен анализ загруженных файлов, поскольку после загрузки файла в систему ее обработка занимает какое-то время и не требует немедленного продолжения пользовательского сценария. Более того, каждая публикация независима, следовательно результат ее обработки не влияет на другие. Таким образом, мы можем выполнять обработку в произвольном порядке, не требуя строгой последовательности. В качестве брокера сообщений я выбрала - RabbitQM

## AsyncAPI

asyncapi: 3.1.0
info:
  title: Catalyst Publication Processing
  version: 1.0.0
  description: Async interaction for scientific article processing
defaultContentType: application/json
servers:
  rabbitmq:
    host: 'rabbitmq:5672'
    protocol: amqp
    description: RabbitMQ broker shared by API service and Processing service
    tags:
      - name: api-service
        description: API service - producer for requests, consumer for results
      - name: processing-service
        description: Processing service - consumer for requests, producer for results
channels:
  publication.request:
    address: publication.request
    messages:
      sendPublicationProcessingFiles.message:
        $ref: '#/components/messages/PublicationProcessingRequested'
    description: Queue for publication files
    bindings: 
      amqp:
        is: routingKey
        exchange: 
          name: publication.exchange
          type: direct

  publication.result:
    address: publication.result
    messages:
      receivePublicationProcessingResult.message:
        $ref: '#/components/messages/PublicationProcessingCompleted'
    description: Queue for publication processing result
    bindings:
      amqp:
        is: routingKey
        exchange: 
          name: publication.exchange
          type: direct
operations:
  sendPublicationProcessingFiles:
    action: send
    channel:
      $ref: '#/channels/publication.request'
    summary: API service sends a new publication task
    tags:
      - name: api-service
    bindings:
      amqp:
        deliveryMode: 2
        priority: 0
        bindingVersion: 0.3.0
    messages:
      - $ref: '#/channels/publication.request/messages/sendPublicationProcessingFiles.message'
  receivePublicationProcessingFiles:
    action: receive
    channel:
      $ref: '#/channels/publication.request'
    summary: Processing service consumes a publication task
    tags:
      - name: processing-service
    messages:
      - $ref: '#/channels/publication.request/messages/sendPublicationProcessingFiles.message'
  sendPublicationProcessingResult:
    action: send
    channel:
      $ref: '#/channels/publication.result'
    summary: Processing service sends the processing result
    tags:
      - name: processing-service
    bindings:
      amqp:
        deliveryMode: 2
        priority: 0
        bindingVersion: 0.3.0
    messages:
      - $ref: '#/channels/publication.result/messages/receivePublicationProcessingResult.message'
  receivePublicationProcessingResult:
    action: receive
    channel:
      $ref: '#/channels/publication.result'
    summary: API service receives publication processing result
    tags:
      - name: api-service
    messages:
      - $ref: '#/channels/publication.result/messages/receivePublicationProcessingResult.message'
components:
  messages:
    PublicationProcessingRequested:
      name: PublicationProcessingRequested
      payload:
        $ref: '#/components/schemas/PublicationProcessingRequestedPayload'
      bindings:
        amqp:
          contentEncoding: application/json
          messageType: PublicationProcessingRequested
          bindingVersion: 0.3.0
    PublicationProcessingCompleted:
      name: PublicationProcessingCompleted
      payload:
        $ref: '#/components/schemas/PublicationProcessingCompletedPayload'
      bindings:
        amqp:
          contentEncoding: application/json
          messageType: PublicationProcessingCompleted
          bindingVersion: 0.3.0
  schemas:
    PublicationProcessingRequestedPayload:
      type: object
      required:
        - file_id
        - publication_id
        - file_url
        - uploaded_user
        - uploaded_date
      properties:
        file_id:
          type: string
          example: file1
        publication_id:
          type: string
          example: publication1
        file_url:
          type: string
          format: uri
          example: 'https://storage.example.com/peng2022.pdf'
        uploaded_user:
          type: string
          example: user1
        uploaded_date:
          type: string
          format: date
          example: 2026-04-21
        comment:
          type: string
          example: publication for processing
    PublicationProcessingCompletedPayload:
      type: object
      required:
        - file_id
        - publication_id
        - status
        - message
      properties:
        file_id:
          type: string
          example: file1
        publication_id:
          type: string
          example: publication1
        status:
          type: string
          enum:
            - done
            - failed
          example: done
        message:
          type: string
          example: Publication processed successfully
        synthesis_count:
          type: integer
          example: 1
        catalyst_count:
          type: integer
          example: 5
        related_catalysts:
          type: array
          items:
            $ref: '#/components/schemas/RelatedCatalyst'
        related_synthesis:
          type: array
          items:
            $ref: '#/components/schemas/RelatedSynthesis'
    RelatedCatalyst:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: string
          example: 1
        name:
          type: string
          example: "Catalyst 1"
    RelatedSynthesis:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: string
          example: 1
        name:
          type: string
          example: "Synthesis 1"