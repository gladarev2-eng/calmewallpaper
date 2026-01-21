// Inspiration gallery data for CALMÉ

import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

export type MoodType = 'calm' | 'cozy' | 'dramatic' | 'fresh' | 'warm' | 'minimalist';
export type InspirationRoomType = 'living' | 'bedroom' | 'office' | 'horeca' | 'hallway' | 'bathroom' | 'kitchen' | 'dining';

export interface InspirationItem {
  id: string;
  image: string;
  productId: string; // Links to product artwork
  productName: string;
  mood: MoodType[];
  room: InspirationRoomType;
  location?: string;
  aspect: 'tall' | 'wide' | 'square';
}

export const moodTypes = [
  { id: 'calm' as MoodType, label: 'Спокойное' },
  { id: 'cozy' as MoodType, label: 'Уютное' },
  { id: 'dramatic' as MoodType, label: 'Драматичное' },
  { id: 'fresh' as MoodType, label: 'Свежее' },
  { id: 'warm' as MoodType, label: 'Тёплое' },
  { id: 'minimalist' as MoodType, label: 'Минимализм' },
];

export const inspirationRoomTypes = [
  { id: 'living' as InspirationRoomType, label: 'Гостиная' },
  { id: 'bedroom' as InspirationRoomType, label: 'Спальня' },
  { id: 'office' as InspirationRoomType, label: 'Офис' },
  { id: 'horeca' as InspirationRoomType, label: 'HoReCa' },
  { id: 'hallway' as InspirationRoomType, label: 'Прихожая' },
  { id: 'bathroom' as InspirationRoomType, label: 'Ванная' },
  { id: 'kitchen' as InspirationRoomType, label: 'Кухня' },
  { id: 'dining' as InspirationRoomType, label: 'Столовая' },
];

// Gallery items with product links
export const inspirationItems: InspirationItem[] = [
  {
    id: 'insp-1',
    image: mural3,
    productId: 'misty-forest',
    productName: 'Туманный лес',
    mood: ['calm', 'minimalist'],
    room: 'bedroom',
    location: 'Москва',
    aspect: 'tall',
  },
  {
    id: 'insp-2',
    image: mural5,
    productId: 'tropical-garden',
    productName: 'Тропический сад',
    mood: ['fresh', 'cozy'],
    room: 'living',
    location: 'Санкт-Петербург',
    aspect: 'wide',
  },
  {
    id: 'insp-3',
    image: heroMural,
    productId: 'mountain-dawn',
    productName: 'Рассвет в горах',
    mood: ['dramatic', 'calm'],
    room: 'horeca',
    aspect: 'square',
  },
  {
    id: 'insp-4',
    image: mural2,
    productId: 'abstract-flow',
    productName: 'Абстрактный поток',
    mood: ['minimalist', 'fresh'],
    room: 'office',
    location: 'Казань',
    aspect: 'wide',
  },
  {
    id: 'insp-5',
    image: mural4,
    productId: 'misty-forest',
    productName: 'Туманный лес',
    mood: ['calm', 'cozy'],
    room: 'bedroom',
    aspect: 'tall',
  },
  {
    id: 'insp-6',
    image: mural1,
    productId: 'tropical-garden',
    productName: 'Тропический сад',
    mood: ['warm', 'cozy'],
    room: 'dining',
    location: 'Сочи',
    aspect: 'square',
  },
  {
    id: 'insp-7',
    image: mural6,
    productId: 'mountain-dawn',
    productName: 'Рассвет в горах',
    mood: ['dramatic', 'warm'],
    room: 'living',
    aspect: 'wide',
  },
  {
    id: 'insp-8',
    image: mural3,
    productId: 'abstract-flow',
    productName: 'Абстрактный поток',
    mood: ['minimalist'],
    room: 'hallway',
    aspect: 'square',
  },
  {
    id: 'insp-9',
    image: mural5,
    productId: 'misty-forest',
    productName: 'Туманный лес',
    mood: ['calm', 'fresh'],
    room: 'bathroom',
    location: 'Екатеринбург',
    aspect: 'tall',
  },
  {
    id: 'insp-10',
    image: heroMural,
    productId: 'tropical-garden',
    productName: 'Тропический сад',
    mood: ['cozy', 'warm'],
    room: 'kitchen',
    aspect: 'wide',
  },
  {
    id: 'insp-11',
    image: mural2,
    productId: 'mountain-dawn',
    productName: 'Рассвет в горах',
    mood: ['dramatic'],
    room: 'horeca',
    location: 'Новосибирск',
    aspect: 'square',
  },
  {
    id: 'insp-12',
    image: mural4,
    productId: 'abstract-flow',
    productName: 'Абстрактный поток',
    mood: ['minimalist', 'calm'],
    room: 'office',
    aspect: 'tall',
  },
  {
    id: 'insp-13',
    image: mural1,
    productId: 'misty-forest',
    productName: 'Туманный лес',
    mood: ['calm', 'cozy'],
    room: 'bedroom',
    aspect: 'wide',
  },
  {
    id: 'insp-14',
    image: mural6,
    productId: 'tropical-garden',
    productName: 'Тропический сад',
    mood: ['fresh', 'warm'],
    room: 'living',
    location: 'Краснодар',
    aspect: 'square',
  },
  {
    id: 'insp-15',
    image: mural3,
    productId: 'mountain-dawn',
    productName: 'Рассвет в горах',
    mood: ['dramatic', 'minimalist'],
    room: 'horeca',
    aspect: 'tall',
  },
  {
    id: 'insp-16',
    image: mural5,
    productId: 'abstract-flow',
    productName: 'Абстрактный поток',
    mood: ['minimalist', 'fresh'],
    room: 'hallway',
    aspect: 'wide',
  },
];

// Featured projects (case studies)
export interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  image: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'hotel-aurora',
    title: 'Отель «Аврора»',
    location: 'Москва',
    type: 'HoReCa',
    description: 'Оформление лобби и ресторана отеля панорамными муралами',
    image: mural3,
    images: [mural3, mural5, heroMural],
  },
  {
    id: 'apartment-nevsky',
    title: 'Апартаменты на Невском',
    location: 'Санкт-Петербург',
    type: 'Частный интерьер',
    description: 'Ботанический мурал для спальни с адаптацией цветовой гаммы',
    image: mural5,
    images: [mural5, mural3, mural2],
  },
  {
    id: 'spa-resort',
    title: 'SPA-комплекс «Тишина»',
    location: 'Сочи',
    type: 'HoReCa',
    description: 'Серия муралов для зон отдыха и процедурных кабинетов',
    image: mural2,
    images: [mural2, mural6, mural4],
  },
];
