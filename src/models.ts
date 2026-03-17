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

export {
  models
}