---
title: REST API
sidebar_position: 1
description: Описание REST API системы обработки публикаций
---
# REST API
## OpenAPI-спецификация

Ниже представлена полная OpenAPI-спецификация REST API системы

<details>
<summary>Показать OpenAPI YAML</summary>

```yaml
openapi: 3.0.0
info:
  title: Catalyst Processing API
  description: API for publications processing results, uploads, processing catalyst
    cards and synthesis properties
  version: 1.0.0
servers:
- url: https://catalysts.processing.com
security:
- BearerAuth: []
tags:
- name: Publication
- name: Catalyst
- name: Synthesis
paths:
  /api/publications:
    get:
      tags:
      - Publication
      summary: Get publications list
      parameters:
      - $ref: '#/components/parameters/PublicationSearch'
      - $ref: '#/components/parameters/Page'
      - $ref: '#/components/parameters/PageSize'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicationListResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
    post:
      tags:
      - Publication
      summary: Upload a publication for processing
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/UploadPublication'
      responses:
        '201':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Publication'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /api/publications/{id}:
    get:
      tags:
      - Publication
      summary: get a publication by id
      parameters:
      - $ref: '#/components/parameters/PublicationId'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Publication'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
    patch:
      tags:
      - Publication
      summary: Update publication metadata
      parameters:
      - $ref: '#/components/parameters/PublicationId'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdatePublication'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Publication'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /api/publications/{id}/result:
    get:
      tags:
      - Publication
      summary: get the result of publication processing
      parameters:
      - $ref: '#/components/parameters/PublicationId'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicationResult'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /api/catalysts:
    get:
      tags:
      - Catalyst
      summary: Get a catalyst list
      parameters:
      - $ref: '#/components/parameters/CatalystSearch'
      - $ref: '#/components/parameters/Page'
      - $ref: '#/components/parameters/PageSize'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CatalystListResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
    post:
      tags:
      - Catalyst
      summary: Create a new catalyst card
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateCatalyst'
      responses:
        '201':
          description: successfully created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Catalyst'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /api/catalysts/{id}:
    get:
      tags:
      - Catalyst
      summary: get catalyst by id
      parameters:
      - $ref: '#/components/parameters/CatalystId'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Catalyst'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
    patch:
      tags:
      - Catalyst
      summary: Update the catalyst card
      parameters:
      - $ref: '#/components/parameters/CatalystId'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateCatalyst'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Catalyst'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /api/syntheses/{id}:
    get:
      tags:
      - Synthesis
      summary: Get a synthesis card by id
      parameters:
      - $ref: '#/components/parameters/SynthesisId'
      responses:
        '200':
          description: successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Synthesis'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '404':
          $ref: '#/components/responses/ResourceNotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  parameters:
    CatalystId:
      name: id
      in: path
      required: true
      description: id of the catalyst card
      schema:
        type: string
        example: '19023'
    PublicationId:
      name: id
      in: path
      required: true
      description: id of the publication
      schema:
        type: string
        example: '39501'
    CatalystSearch:
      name: search
      in: query
      required: false
      description: search by name or formula of the catalyst
      schema:
        type: string
        example: ZrO2*TiO2
    PublicationSearch:
      name: search
      in: query
      required: false
      description: search by publication name
      schema:
        type: string
        example: peng2022
    Page:
      name: page
      in: query
      required: false
      description: page number (1-based)
      schema:
        type: integer
        minimum: 1
        default: 1
        example: 1
    PageSize:
      name: page_size
      in: query
      required: false
      description: number of items per page
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20
        example: 20
    SynthesisId:
      name: id
      in: path
      required: true
      description: id of the synthesis card
      schema:
        type: string
        example: '58201'
  schemas:
    Pagination:
      type: object
      required:
      - page
      - page_size
      - total
      properties:
        page:
          type: integer
          example: 1
        page_size:
          type: integer
          example: 20
        total:
          type: integer
          description: total number of items matching the query
          example: 142
    CatalystListResponse:
      type: object
      required:
      - items
      - pagination
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/CatalystPreview'
        pagination:
          $ref: '#/components/schemas/Pagination'
    CatalystPreview:
      type: object
      required:
      - id
      - name
      - formula
      properties:
        id:
          type: string
          example: '12324'
        name:
          type: string
          example: Catalyst 1
        formula:
          type: string
          example: ZrO2*TiO2
    Catalyst:
      type: object
      required:
      - id
      - name
      - formula
      - structure_image
      - synthesis_parameters
      - synthesis_text
      - source_publication_ids
      - created_date
      properties:
        id:
          type: string
          example: '1943'
        name:
          type: string
          example: Catalyst 1
        formula:
          type: string
          example: ZrO2*TiO2
        structure_image:
          type: string
          format: uri
          example: https://catalysts.processing.com/files/catalyst-1.png
        synthesis_parameters:
          $ref: '#/components/schemas/SynthesisParameters'
        synthesis_text:
          type: string
          example: Add 50 ml methanol to a round-bottomed flask..
        source_publication_ids:
          type: array
          description: IDs of publications this catalyst was extracted from
          items:
            type: string
          example:
          - '29443'
          - '29444'
        created_date:
          type: string
          format: date
          example: '2026-04-15'
    SynthesisParameters:
      type: object
      required:
        - temperature
        - solvent
        - pressure
        - time
      properties:
        temperature:
          type: object
          required:
            - value
            - unit
          properties:
            value:
              type: number
              example: 90
            unit:
              type: string
              enum:
                - °C
                - K
              example: °C
        solvent:
          type: string
          example: methanol
        pressure:
          type: object
          required:
            - value
            - unit
          properties:
            value:
              type: number
              example: 15
            unit:
              type: string
              enum:
                - atm
                - bar
                - mmHg
                - Pa
              example: mmHg
        time:
          type: object
          required:
            - value
            - unit
          properties:
            value:
              type: number
              example: 8
            unit:
              type: string
              enum:
                - s
                - min
                - h
              example: h
    UpdateCatalyst:
      type: object
      required:
      - name
      - formula
      - structure_image
      - synthesis_parameters
      - synthesis_text
      - source_publication_ids
      properties:
        name:
          type: string
          example: Catalyst 1
        formula:
          type: string
          example: ZrO2*TiO2
        structure_image:
          type: string
          example: https://catalysts.processing.com/files/catalyst-1.png
        synthesis_parameters:
          $ref: '#/components/schemas/SynthesisParameters'
        synthesis_text:
          type: string
          example: Add 50 ml methanol to a round-bottomed flask...
        source_publication_ids:
          type: array
          description: IDs of publications this catalyst was extracted from
          items:
            type: string
          example:
          - '34646'
    Synthesis:
      type: object
      required:
      - id
      - name
      - synthesis_parameters
      - synthesis_text
      - source_publication_id
      properties:
        id:
          type: string
          example: '58201'
        name:
          type: string
          example: Synthesis 1
        synthesis_parameters:
          $ref: '#/components/schemas/SynthesisParameters'
        synthesis_text:
          type: string
          example: Add 50 ml methanol to a round-bottomed flask...
        source_publication_id:
          type: string
          description: ID of the publication this synthesis was extracted from
          example: '23561'
    UploadPublication:
      type: object
      required:
      - file
      properties:
        file:
          type: string
          format: binary
        comment:
          type: string
          example: publication for processing
    PublicationPreview:
      type: object
      required:
      - id
      - name
      - status
      - uploaded_date
      properties:
        id:
          type: string
          example: '23561'
        name:
          type: string
          example: peng2022.pdf
        status:
          $ref: '#/components/schemas/PublicationStatus'
        uploaded_date:
          type: string
          format: date
          example: '2026-04-15'
    PublicationListResponse:
      type: object
      required:
      - items
      - pagination
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/PublicationPreview'
        pagination:
          $ref: '#/components/schemas/Pagination'
    Publication:
      type: object
      required:
      - id
      - name
      - status
      - uploaded_date
      - message
      properties:
        id:
          type: string
          example: '23561'
        name:
          type: string
          example: peng2022.pdf
        status:
          $ref: '#/components/schemas/PublicationStatus'
        uploaded_date:
          type: string
          format: date
          example: '2026-04-15'
        message:
          type: string
          example: The file successfully uploaded and sent for processing
        related_catalysts:
          type: array
          items:
            $ref: '#/components/schemas/RelatedCatalyst'
        related_syntheses:
          type: array
          items:
            $ref: '#/components/schemas/RelatedSynthesis'
    PublicationStatus:
      type: string
      description: publication status
      enum:
      - uploaded
      - processing
      - done
      - failed
    PublicationResult:
      type: object
      required:
      - publication_id
      - status
      - message
      properties:
        publication_id:
          type: string
          example: '239502'
        status:
          type: string
          enum:
          - done
          - failed
          example: done
        message:
          type: string
          example: publication was successfully processed
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
        related_syntheses:
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
          example: '1'
        name:
          type: string
          example: Catalyst 1
    RelatedSynthesis:
      type: object
      required:
      - id
      - name
      properties:
        id:
          type: string
          example: '1'
        name:
          type: string
          example: Synthesis 1
    ErrorResponse:
      type: object
      required:
      - error_code
      - message
      properties:
        error_code:
          type: string
          example: NOT_FOUND
        message:
          type: string
          example: Resource not found
    UpdatePublication:
      type: object
      properties:
        name:
          type: string
          example: peng2022.pdf
        message:
          type: string
          example: Publication metadata updated
        status:
          $ref: '#/components/schemas/PublicationStatus'
      additionalProperties: false
  responses:
    BadRequest:
      description: bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    Unauthorized:
      description: The user is unauthorized
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ResourceNotFound:
      description: resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
```
</details>

...