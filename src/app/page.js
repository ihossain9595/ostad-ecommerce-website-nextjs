import Master from "@/components/master/Master";
import BrandsSkeleton from "@/skeleton/brands-skeleton";
import CategoriesSkeleton from "@/skeleton/categories-skeleton";
import FeaturesSkeleton from "@/skeleton/features-skeleton";
import ProductsSkeleton from "@/skeleton/products-skeleton";
import SliderSkeleton from "@/skeleton/slider-skeleton";
import Image from "next/image";

export default function Home() {
  return (
    <Master>
      <SliderSkeleton />
      <FeaturesSkeleton />
      <BrandsSkeleton />
      <ProductsSkeleton />
      <CategoriesSkeleton />
    </Master>
  );
}
