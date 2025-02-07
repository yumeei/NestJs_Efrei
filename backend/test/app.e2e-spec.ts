import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  it('/reservations (GET) retourne la liste des réservations', async () => {
    const response = await request(app.getHttpServer()).get('/reservations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/reservations (POST) crée une réservation', async () => {
    const response = await request(app.getHttpServer())
      .post('/reservations')
      .send({
        "userId": 1,
        "movieId": 1255788,
        "startTime": "2025-09-08T20:00:00"
      });
    console.log('response.body', response.body);

    expect(response.status).toBe(201);
  });
});
