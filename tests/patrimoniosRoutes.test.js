const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('Testar rotas de patrimônios', () => {
    it('Deve listar todos os patrimônios', (done) => {
        chai.request(server)
            .get('/api/patrimonios')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
});
