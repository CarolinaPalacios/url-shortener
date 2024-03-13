import { INestApplication } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import * as request from 'supertest';
import { fakerEN_US } from '@faker-js/faker';
import { clearRepositories, createNestApplication } from './test-helpers';
import { Link } from '../links/link.entity';

describe('Links', () => {
  let app: INestApplication;
  let connection: Connection;
  let linksRepository: Repository<Link>;

  const createLinkBody = () => {
    return {
      name: fakerEN_US.word.noun(),
      url: fakerEN_US.internet.url(),
    };
  };

  const createInvalidLinkBodies = () => {
    const validLink = createLinkBody();

    return [
      undefined,
      {},

      { name: undefined, url: validLink.url },
      { name: null, url: validLink.url },
      { name: fakerEN_US.datatype.boolean(), url: validLink.url },
      { name: fakerEN_US.number.int(), url: validLink.url },
      { name: '', url: validLink.url },

      { name: validLink.name, url: undefined },
      { name: validLink.name, url: null },
      { name: validLink.name, url: fakerEN_US.datatype.boolean() },
      { name: validLink.name, url: fakerEN_US.number.int() },
      { name: validLink.name, url: '' },
      { name: validLink.name, url: fakerEN_US.word.noun() },
    ];
  };

  const createLinkItem = async () => {
    const linkBody = createLinkBody();
    const link = linksRepository.create(linkBody);

    return await linksRepository.save(link);
  };

  const createInvalidLinkIds = () => {
    return [fakerEN_US.number.int(), fakerEN_US.word.noun()];
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

  describe('@GET /links', () => {
    it('should handle without data', async () => {
      const res = await request(app.getHttpServer()).get('/links');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should handle with data', async () => {
      const promises: Array<Promise<Link>> = [];
      const count = 5;

      for (let i = 0; i < count; i++) {
        promises.push(createLinkItem());
      }

      const links = await Promise.all(promises);
      const res = await request(app.getHttpServer()).get('/links');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining(links));
      expect(res.body).toHaveLength(count);
    });
  });

  describe('@POST /links', () => {
    it('should not accept invalid data', async () => {
      const invalidData = createInvalidLinkBodies();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((data) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer())
              .post('/links')
              .send(data);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should accept valid data', async () => {
      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .post('/links')
        .send(linkBody);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        ...linkBody,
        id: expect.any(String),
      });

      const id = res.body.id;
      const link = await linksRepository.findOneBy({ id });

      expect(link).toEqual(res.body);
    });

    it('should handle already existing name', async () => {
      const existing = await createLinkItem();
      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer()).post('/links').send({
        name: existing.name,
        url: linkBody.url,
      });

      expect(res.status).toBe(409);
      expect(res.body.error).toBe('Conflict');
      expect(res.body.message).toBe('Short name already in use');
    });

    it('should handle unexpected error', async () => {
      const linkRepoSaveMock = jest
        .spyOn(linksRepository, 'save')
        .mockRejectedValue(new Error());

      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .post('/links')
        .send(linkBody);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal Server Error');

      linkRepoSaveMock.mockRestore();
    });
  });

  describe('@DELETE /links/:id', () => {
    it('should not accept invalid id', async () => {
      const invalidData = createInvalidLinkIds();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((id) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer()).delete(
              `/links/${id}`,
            );

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should handle not found', async () => {
      const id = fakerEN_US.string.uuid();
      const res = await request(app.getHttpServer()).delete(`/links/${id}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Not Found');
      expect(res.body.message).toBe(`Link with ID: "${id}" not found`);
    });

    it('should handle delete', async () => {
      const link = await createLinkItem();
      const id = link.id;
      const res = await request(app.getHttpServer()).delete(`/links/${id}`);

      expect(res.status).toBe(200);

      const deletedLink = await linksRepository.findOneBy({ id });

      expect(deletedLink).toBeNull();
    });
  });

  describe('@PATCH /links/:id', () => {
    it('should not accept invalid id', async () => {
      const invalidData = createInvalidLinkIds();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((id) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer()).patch(
              `/links/${id}`,
            );
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should not accept invalid data', async () => {
      const id = fakerEN_US.string.uuid();
      const invalidData = createInvalidLinkBodies();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((data) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer())
              .patch(`/links/${id}`)
              .send(data);

            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Bad Request');
            expect(res.body.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should handle not found', async () => {
      const id = fakerEN_US.string.uuid();
      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .patch(`/links/${id}`)
        .send(linkBody);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Not Found');
      expect(res.body.message).toBe(`Link not found`);
    });

    it('should handle update', async () => {
      const link = await createLinkItem();
      const id = link.id;
      const newLinkBody = createLinkBody();
      const res = await request(app.getHttpServer())
        .patch(`/links/${id}`)
        .send(newLinkBody);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        ...newLinkBody,
        id,
      });

      const updatedLink = await linksRepository.findOneBy({ id });

      expect(updatedLink).toEqual(res.body);
    });
  });
});
