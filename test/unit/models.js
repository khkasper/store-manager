const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');

const ProductModel = require('../../models/productModel');
const SaleModel = require('../../models/saleModel');

describe('Testando Product Model', () => {
  describe('Testando função create', () => {
    const payloadProduct = {
      name: 'product',
      quantity: 1
    };

    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct);
      expect(response).to.be.a('object');
    });

    it('retorna um objeto com a propriedade "id" referente ao filme', async () => {
      const response = await ProductModel.create(payloadProduct);
      expect(response).to.have.a.property('id');
    });

  });

  describe('Testando função getByName', () => {
    const payloadProduct = 'produto';

    before(async () => {
      const execute = [[
        {
          id: 1,
          name: 'produto',
          quantity: 1
        },
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.getByName(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await ProductModel.getByName(payloadProduct);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Testando função getById', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [[
        {
          id: 1,
          name: 'produto',
          quantity: 1
        },
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.getById(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await ProductModel.getById(payloadId);
      expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Testando função getAll', () => {
    before(async () => {
      const execute = [[
        {
          id: 1,
          name: 'produtoUm',
          quantity: 1
        },
        {
          id: 2,
          name: 'produtoDois',
          quantity: 1
        },
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.an('array');
    });

    it('retorna um array com objetos com as chaves "id", "name" e "quantity"', async () => {
      const [response] = await ProductModel.getAll();
      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });

  describe('Testando função update', () => {
    const payloadId = 1;
    const payloadProduct = 'produto';
    const payloadQuantity = 1;

    before(async () => {
      const execute = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.update(payloadId, payloadProduct, payloadQuantity);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja atualizado', async () => {
      const { affectedRows } = await ProductModel.update(payloadId, payloadProduct, payloadQuantity);
      expect(affectedRows).to.be.equal(1);
    });
  });

  describe('Testando função remove', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.remove(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja removido', async () => {
      const { affectedRows } = await ProductModel.remove(payloadId);
      expect(affectedRows).to.be.equal(1);
    });
  });
});

describe('Testando Sale Model', () => {
  describe('Testando função createSaleDate', () => {
    const payloadDate = '1988-04-02T23:30:00.000Z';

    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.createSaleDate(payloadDate);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a chave "id"', async () => {
      const response = await SaleModel.createSaleDate(payloadDate);
      expect(response).to.have.a.key('id');
    });
  });

  describe('Testando função create', () => {
    const payloadId = 1;
    const payloadProductId = 1;
    const payloadQuantity = 1;

    before(async () => {
      const execute = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.create(payloadId, payloadProductId, payloadQuantity);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a chave "id"', async () => {
      const response = await SaleModel.create(payloadId, payloadProductId, payloadQuantity);
      expect(response).to.have.a.key('id');
    });
  });

  describe('Testando função getAll', () => {
    before(async () => {
      const execute = [[
        {
          saleId: 1,
          date: '1988-04-02T23:30:00.000Z',
          product_id: 1,
          quantity: 1
        },
        {
          saleId: 2,
          date: '1988-04-02T23:31:00.000Z',
          product_id: 2,
          quantity: 1
        },
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await SaleModel.getAll();
      expect(response).to.be.an('array');
    });

    it('retorna um array com objetos com as chaves "saleId", "date", "product_id" e "quantity"', async () => {
      const [response] = await SaleModel.getAll();
      expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });

  describe('Testando função getById', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [[
        {
          saleId: 1,
          date: '1988-04-02T23:30:00.000Z',
          product_id: 1,
          quantity: 1
        },
        {
          saleId: 2,
          date: '1988-04-02T23:31:00.000Z',
          product_id: 2,
          quantity: 1
        },
      ]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await SaleModel.getById(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um array com objetos com as chaves "saleId", "date", "product_id" e "quantity"', async () => {
      const [response] = await SaleModel.getById(payloadId);
      expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });

  describe('Testando função update', () => {
    const payloadId = 1;
    const payloadProductId = 1;
    const payloadQuantity = 1;

    before(async () => {
      const execute = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.update(payloadId, payloadProductId, payloadQuantity);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja atualizado', async () => {
      const { affectedRows } = await SaleModel.update(payloadId, payloadProductId, payloadQuantity);
      expect(affectedRows).to.be.equal(1);
    });
  });

  describe('Testando função remove', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleModel.remove(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja atualizado', async () => {
      const { affectedRows } = await SaleModel.remove(payloadId);
      expect(affectedRows).to.be.equal(1);
    });
  });
});
