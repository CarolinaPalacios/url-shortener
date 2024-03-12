import { INestApplication } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import * as request from 'supertest';
import { fakerEN_US } from '@faker-js/faker';
import { clearRepositories, createNestApplication } from './test-helpers';
import { Link } from '../links/link.entity';

describe('Wildcard', () => {
  let app: INestApplication;
  let connection: Connection;
  let linksRepository: Repository<Link>;

  const createLinkItem = async () => {
    const link = linksRepository.create({
      name: fakerEN_US.word.noun(),
      url: fakerEN_US.internet.url(),
    });

    return await linksRepository.save(link);
  };

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        connection = moduleRef.get(Connection);
        linksRepository = connection.getRepository(Link);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(connection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('@GET /:name', () => {
    it('should handle not found', async () => {
      const shortName = fakerEN_US.word.noun();
      const res = await request(app.getHttpServer()).get(`/${shortName}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Link not found');
    });

    it('should handle redirect', async () => {
      const link = await createLinkItem();
      const res = await request(app.getHttpServer()).get(`/${link.name}`);

      expect(res.status).toBe(301);
      expect(res.header.location).toBe(link.url);
    });
  });
});
