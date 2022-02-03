const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../models/productModel');
const ProductService = require('../../services/productService');

const SaleModel = require('../../models/saleModel');
const SaleService = require('../../services/saleService');

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

    it('retorna um objeto com a propriedades "id", "name" e "quantity"', async () => {
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

    it('retorna um objeto com a propriedade "id"', async () => {
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

    it('retorna um objeto com a propriedade "id", "name" e "quantity"', async () => {
      const [[response]] = await ProductService.remove(payloadId);
      expect(response).to.includes.all.keys('id', 'name', 'quantity');
    });
  });
});


describe('Testando Sale Service', () => {
  describe('Testando função create', () => {
    const payloadSale = [
      {
        productId: 1,
        quantity: 2
      },
    ];

    before(async () => {
      sinon.stub(SaleModel, 'create').resolves({ id: 1 });
      sinon.stub(SaleModel, 'createSaleDate').resolves({ id: 1 });
    });

    after(async () => {
      SaleModel.create.restore();
      SaleModel.createSaleDate.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SaleService.create(payloadSale);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com a propriedade "id"', async () => {
      const response = await SaleService.create(payloadSale);
      expect(response).to.have.a.key('id');
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
      sinon.stub(SaleModel, 'getById').resolves(execute);
    });

    after(async () => {
      SaleModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const [[response]] = await SaleService.getById(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com as propriedades "saleId", "date", "product_id" e "quantity"', async () => {
      const [[response]] = await SaleService.getById(payloadId);
      expect(response).to.includes.all.keys('saleId', 'date', 'product_id', 'quantity');
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
      ]];
      sinon.stub(SaleModel, 'getAll').resolves(execute);
    });

    after(async () => {
      SaleModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const [response] = await SaleService.getAll();
      expect(response).to.be.an('array');
    });

    it('retorna um objeto com as propriedades "saleId", "date", "product_id" e "quantity"', async () => {
      const [[response]] = await SaleService.getAll();
      expect(response).to.includes.all.keys('saleId', 'date', 'product_id', 'quantity');
    });
  });

  describe('Testando função update', () => {
    const payloadSale = [
      {
        productId: 1,
        quantity: 2
      },
    ];

    before(async () => {
      sinon.stub(SaleModel, 'update').resolves([{ affectedRows: 1 }]);
    });

    after(async () => {
      SaleModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await SaleService.update(payloadSale);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja atualizado', async () => {
      const [{ affectedRows }] = await SaleService.update(payloadSale);
      expect(affectedRows).to.be.equal(1);
    });
  });

  describe('Testando função remove', () => {
    const payloadId = 1;

    before(async () => {
      sinon.stub(SaleModel, 'remove').resolves([{ affectedRows: 1 }]);
    });

    after(async () => {
      SaleModel.remove.restore();
    });

    it('retorna um objeto', async () => {
      const [response] = await SaleService.remove(payloadId);
      expect(response).to.be.an('object');
    });

    it('retorna um objeto com valor caso seja removido', async () => {
      const [{ affectedRows }] = await SaleService.remove(payloadId);
      expect(affectedRows).to.be.equal(1);
    });
  });
});