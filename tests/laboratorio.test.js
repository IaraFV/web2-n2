const request = require('supertest');
const app = require('../api/server'); 

let token;

beforeAll(async () => {
  await request(app).post('/create/user').send({
    nome: 'Usuário Teste',
    email: 'teste@teste.com',
    senha: '123456'
  });

  const response = await request(app).post('/logar').send({
    email: 'teste@teste.com',
    senha: '123456'
  });

  token = response.body.token; 
});

describe('POST /laboratorio/novo', () => {
  it('Deve cadastrar um novo laboratório com sucesso', async () => {
    const response = await request(app)
      .post('/laboratorio/novo')
      .set('Authorization', `Bearer ${token}`) 
      .field('nome', 'Laboratório de Fisica')
      .field('descricao', 'Laboratório equipado para experimentos Fisicos.')
      .field('capacidade', 30)
      .attach('foto', `${__dirname}/../uploads/1736641474499.png`); 

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Laboratório cadastrado com sucesso!');
  });

  it('Deve retornar erro ao enviar dados incompletos', async () => {
    const response = await request(app)
      .post('/laboratorio/novo')
      .set('Authorization', `Bearer ${token}`) 
      .field('nome', 'Laboratório Incompleto');

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});

describe('GET /laboratorio/relatorio', () => {
  it(
    'Deve retornar um relatório em formato PDF',
    async () => {
      const response = await request(app)
        .get('/laboratorio/relatorio')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('pdf');
    },
    10000 
  );

  it('Deve retornar erro ao acessar sem autenticação', async () => {
    const response = await request(app).get('/laboratorio/relatorio');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Token não fornecido ou inválido.'); 
  });
});
