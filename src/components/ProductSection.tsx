import ProductList from '@/components/ProductList'

interface ProductSectionProps {
  title: string
  categoryId: string
  hits?: number // ✅ hits をオプションプロパティに
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  categoryId,
  hits = 10, // ✅ デフォルトは 10 にする
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="product-grid">
        <ProductList categoryId={categoryId} hits={hits} />
      </div>
    </section>
  )
}

export default ProductSection
