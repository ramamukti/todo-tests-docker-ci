import request from 'supertest';
import app from '../app.js';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.TEST_DB_NAME, process.env.TEST_DB_USER, process.env.TEST_DB_PASSWORD, {
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT
  });

const queryInterface = sequelize.getQueryInterface();

beforeAll(async () => {
    try {
        await queryInterface.createTable('todos', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
          });
        await queryInterface.bulkInsert('todos', [
            {
                title: "Create App with Express and Sequelize",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Containerize the app with Docker",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Setup CI with Github Actions",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    } catch (err) {
        throw err
    }
})

afterAll(async () => {
    try {
        await queryInterface.dropTable('todos');
    } catch(err) {
        throw err
    }
})

const baseURL = '/api/todos';

describe('listAll Todos', () => {
    test('GET /api/todos', (done) => {
        request(app)
            .get(baseURL)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const {body} = res;
                const {data} = body;
                expect(data.length).toEqual(3);
                done()
            })
            .catch(err => {
                done(err)
        })

    });
});

describe('detail Todo', () => {
    test('GET /api/todos/:id', (done) => {
        request(app)
            .get(`${baseURL}/1`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const {body} = res;
                const {id, title} = body;
                expect(id).toEqual(1);
                expect(title).toEqual('Create App with Express and Sequelize');
                done()
            })
            .catch(err => {
                done(err)
        })

    });
});

describe('create Todo', () => {
    test('POST /api/todos', (done) => {
        request(app)
            .post(baseURL)
            .send({title: 'Get 100 points'})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const {body} = res;
                const {title} = body;
                expect(title).toEqual('Get 100 points');
                done()
            })
            .catch(err => {
                done(err)
        })

    });
});

describe('delete Todo', () => {
    test('DELETE /api/todos/:id', (done) => {
        request(app)
            .delete(`${baseURL}/`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const {body} = res;
                expect(body).toEqual(1);
                done()
            })
            .catch(err => {
                done(err)
        })

    });
});
