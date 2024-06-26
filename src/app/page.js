import Features from "@/components/features/features";
import Master from "@/components/master/Master";
import Brands from "@/components/product/brands";
import Categories from "@/components/product/categories";
import Slider from "@/components/product/slider";
import BrandsSkeleton from "@/skeleton/brands-skeleton";
import CategoriesSkeleton from "@/skeleton/categories-skeleton";
import FeaturesSkeleton from "@/skeleton/features-skeleton";
import ProductsSkeleton from "@/skeleton/products-skeleton";
import SliderSkeleton from "@/skeleton/slider-skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <Master>
      <Slider />
      <Suspense fallback={<FeaturesSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<BrandsSkeleton />}>
        <Brands />
      </Suspense>
    </Master>
  );
}
