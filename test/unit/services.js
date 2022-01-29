const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../models/productModel');
const ProductService = require('../../services/productService');

// const SaleModel = require('../../models/saleModel');
// const SaleService = require('../../services/saleService');

describe('Testando Product Service', () => {
  describe('Testando função create', () => {
    const payloadProduct = {
      name: 'produto',
      quantity: 1
    };

    before(async () => {
      const execute = {
        id: 1,
        name: 'produto',
        quantity: 1
      };
      sinon.stub(ProductModel, 'getByName').resolves(undefined);
      sinon.stub(ProductModel, 'create').resolves(execute);
    });

    after(async () => {
      ProductModel.getByName.restore();
      ProductModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.create(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a propriedade "id" e valor', async () => {
      const { id } = await ProductService.create(payloadProduct);
      expect(id).to.be.equal(1);
    });
  });

  describe('Testando função getById', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [
        {
          id: 1,
          name: 'product',
          quantity: 1
        },
      ];
      sinon.stub(ProductModel, 'getById').resolves(execute);
    });

    after(async () => {
      ProductModel.getById.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductService.getById(payloadId);
      expect(response).to.be.an('array');
    });

    it('retorna um array com objetos com as propriedades "id", "name" e "quantity"', async () => {
      const [response] = await ProductService.getById(payloadId);
      expect(response).to.includes.all.keys('id', 'name', 'quantity')
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
        }
      ]];
      sinon.stub(ProductModel, 'getAll').resolves(execute);
    });

    after(async () => {
      ProductModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductService.getAll();
      expect(response).to.be.an('array');
    });

    it('retorna um objeto com as propriedades "id", "name" e "quantity"', async () => {
      const [[response]] = await ProductService.getAll();
      expect(response).to.includes.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Testando função update', () => {
    const payloadId = 1;
    const payloadName = 'produto';
    const payloadQuantity = 1;

    before(async () => {
      const execute = { id: 1 };
      sinon.stub(ProductModel, 'update').resolves(execute);
    });

    after(async () => {
      ProductModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com as propriedade "id"', async () => {
      const response = await ProductService.update(payloadId, payloadName, payloadQuantity);
      expect(response).to.includes.a.key('id');
    });
  });

  describe('Testando função remove', () => {
    const payloadId = 1;

    before(async () => {
      const execute = [[
          {
          id: 1,
          name: 'produto',
          quantity: 1
        },
      ]];
      sinon.stub(ProductModel, 'getById').resolves(execute);
      sinon.stub(ProductModel, 'remove').resolves(execute);
    });

    after(async () => {
      ProductModel.getById.restore();
      ProductModel.remove.restore();
    });

    it('retorna um objeto', async () => {
      const [[response]] = await ProductService.remove(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com as propriedade "id"', async () => {
      const [[response]] = await ProductService.remove(payloadId);
      expect(response).to.includes.all.keys('id', 'name', 'quantity');
    });
  });
});


/* describe('Testando Sale Service', () => {
  describe('Testando função create', () => {
    before(async () => {

    });

    after(async () => {

    });

    it('', async () => {
      
    });
  });

  describe('Testando função getById', () => {
    before(async () => {

    });

    after(async () => {

    });

    it('', async () => {
      
    });
  });

  describe('Testando função getAll', () => {
    before(async () => {

    });

    after(async () => {

    });

    it('', async () => {
      
    });
  });

  describe('Testando função update', () => {
    before(async () => {

    });

    after(async () => {

    });

    it('', async () => {
      
    });
  });
}); */