import { models, ModelName } from "./models";

interface CrudDelegate {
  create: (args: any) => Promise<any>,
  findMany: (args?: any) => Promise<any>,
  findUnique: (args: any) => Promise<any>,
  update: (args: any) => Promise<any>,
  delete: (args: any) => Promise<any>
}

const getDelegate = (model: ModelName): CrudDelegate => {
  return models[model];
};

const crudEngine = {
  async create(model: ModelName, data: any) {
    const delegate = getDelegate(model);
    return delegate.create({ data });
  },

  async findMany(model: ModelName) {
    const delegate = getDelegate(model);
    return delegate.findMany();
  },

  async findById(model: ModelName, id: number) {
    const delegate = getDelegate(model);
    return delegate.findUnique({ where: { id } });
  },

  async update(model: ModelName, id: number, data: any) {
    const delegate = getDelegate(model);
    return delegate.update({
      where: { id },
      data
    });
  },

  async delete(model: ModelName, id: number) {
    const delegate = getDelegate(model);
    return delegate.delete({
      where: { id }
    });
  }
};

export {
  crudEngine
}