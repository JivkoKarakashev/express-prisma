import prisma from "./lib/prisma";

const models = {
  user: prisma.user,
  order: prisma.order,
  category: prisma.category,
  product: prisma.product,
  orderProduct: prisma.orderProduct,
  stockManagement: prisma.stockManagement,
  promotionEvent: prisma.promotionEvent,
  productPromotionEvent: prisma.productPromotionEvent
};

type ModelName = keyof typeof models;

const isValidModelName = (name: string | string[]): name is ModelName => {
  if (typeof name === 'object') {
    return name.every(n => n in models);
  }
  return name in models;
};

export {
  type ModelName,
  models,
  isValidModelName
}