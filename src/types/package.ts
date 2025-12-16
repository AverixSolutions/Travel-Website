// src/types/package.ts
export type PackageCategory =
  | "international"
  | "domestic"
  | "honeymoon"
  | "adventure";

export type PackageImage = {
  id: string;
  url: string;
  publicId?: string | null;
  sortOrder: number;
};

export type Package = {
  id: string;
  slug: string;
  title: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  currency: string;
  category: PackageCategory;
  highlights: string[];
  isActive: boolean;
  coverImageUrl?: string | null;
  gallery: PackageImage[];
  createdAt: string;
  updatedAt: string;
};
