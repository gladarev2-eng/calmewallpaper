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
    <div className="p-6 md:p-8 space-y-6">
      <h3 className="font-display text-2xl">Индивидуальный расчёт</h3>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-caption block mb-2">Ширина, см</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
            className="input-field"
          />
        </div>
        <div>
          <label className="text-caption block mb-2">Высота, см</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
            className="input-field"
          />
        </div>
      </div>

      {/* Material */}
      <div>
        <label className="text-caption block mb-3">Материал</label>
        <div className="space-y-0">
          {materials.filter(m => m.id !== 'canvas').map((material) => (
            <label
              key={material.id}
              onClick={() => setSelectedMaterial(material)}
              className={`flex items-center justify-between py-3 cursor-pointer border-b border-foreground/8 transition-colors duration-500 ${
                selectedMaterial.id === material.id
                  ? 'text-foreground'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                  selectedMaterial.id === material.id ? 'bg-foreground/60' : 'bg-foreground/15'
                }`} />
                <span className="text-[13px] font-light">{material.name}</span>
              </div>
              {material.priceCoefficient > 1 && (
                <span className="text-[11px] text-foreground/30 font-light">
                  +{Math.round((material.priceCoefficient - 1) * 100)}%
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="pt-5 space-y-2">
        <div className="flex justify-between text-[13px] font-light">
          <span className="text-foreground/40">Площадь</span>
          <span className="text-foreground/60">{area.toFixed(2)} м²</span>
        </div>
        <div className="flex justify-between text-[13px] font-light">
          <span className="text-foreground/40">Материал</span>
          <span className="text-foreground/60">{selectedMaterial.name}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-foreground/40 text-[12px] font-light">Ориентировочно</span>
          <span className="font-display text-2xl">{formatPrice(totalPrice)} ₽</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="btn-primary w-full"
      >
        Запросить расчёт
      </button>

      <p className="text-[10px] text-foreground/30 text-center font-light leading-relaxed">
        Мы подготовим визуализацию и точный расчёт стоимости
      </p>
    </div>
  );
};
