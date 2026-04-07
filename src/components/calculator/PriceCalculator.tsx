import { useState, useEffect } from 'react';
import { materials, Material, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface PriceCalculatorProps {
  product: Product;
}

export const PriceCalculator = ({ product }: PriceCalculatorProps) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(260);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const { addItem } = useCart();

  const area = (width * height) / 10000; // Convert to m²
  const basePrice = product.pricePerSqm * area;
  const totalPrice = Math.round(basePrice * selectedMaterial.priceCoefficient);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleAddToCart = () => {
    addItem({
      product,
      material: selectedMaterial,
      width,
      height,
      area,
      price: totalPrice,
      quantity: 1,
    });
    toast.success('Добавлено в корзину', {
      description: `${product.name} • ${width}×${height} см`,
    });
  };

  return (
    <div className="bg-card p-6 md:p-8 space-y-6">
      <h3 className="font-display text-2xl">Калькулятор стоимости</h3>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-caption block mb-2">Ширина, см</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
            className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-caption block mb-2">Высота, см</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
            className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Material */}
      <div>
        <label className="text-caption block mb-3">Материал</label>
        <div className="space-y-2">
          {materials.filter(m => m.id !== 'canvas').map((material) => (
            <label
              key={material.id}
              className={`flex items-start gap-3 p-4 cursor-pointer border transition-colors ${
                selectedMaterial.id === material.id
                  ? 'border-foreground bg-muted/50'
                  : 'border-border hover:border-foreground/50'
              }`}
            >
              <div className="mt-0.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedMaterial.id === material.id
                    ? 'border-foreground'
                    : 'border-muted-foreground'
                }`}>
                  {selectedMaterial.id === material.id && (
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{material.name}</span>
                  {material.priceCoefficient > 1 && (
                    <span className="text-xs text-muted-foreground">
                      +{Math.round((material.priceCoefficient - 1) * 100)}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{material.description}</p>
                {material.forHoreca && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs">
                    Для HoReCa
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Margin */}
      <div>
        <label className="text-caption block mb-3">Запас на подрезку</label>
        <div className="flex gap-3">
          {[5, 10].map((m) => (
            <button
              key={m}
              onClick={() => setMargin(m)}
              className={`flex-1 py-2 text-sm border transition-colors ${
                margin === m
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border hover:border-foreground'
              }`}
            >
              +{m}%
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Площадь</span>
          <span>{areaWithMargin.toFixed(2)} м²</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Материал</span>
          <span>{selectedMaterial.name}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-muted-foreground">Итого</span>
          <span className="font-display text-3xl">{formatPrice(totalPrice)} ₽</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="btn-primary w-full"
      >
        Добавить в корзину
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Финальная стоимость уточняется после согласования макета
      </p>
    </div>
  );
};
