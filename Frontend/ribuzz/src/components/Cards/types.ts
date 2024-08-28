export interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    rating: number;
    description: string;
    stock: number;
}

export interface Service {
id: string;
name: string;
price: number;
images: string[];
rating: number;
description: string;
}

export interface Event {
    id: string;
    name: string;
    price: number;
    date: string;
    location: string;
    description: string;
    images: string[];
    rating: number;
    time: string[];
    stock: number;
}