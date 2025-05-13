-- DropForeignKey
ALTER TABLE "orderitems" DROP CONSTRAINT "orderitems_product_id_fkey";

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
