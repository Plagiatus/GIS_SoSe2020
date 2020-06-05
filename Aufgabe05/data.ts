namespace A05 {
  export interface Product {
    name: string;
    description: string;
    img: string;
    price: number;
    category: string;
  }
  export let data: Product[] = [
    {
      description: "Truck in Front of a house",
      img: "https://i.picsum.photos/id/514/200/200.jpg",
      name: "Truck",
      price: 2000,
      category: "things"
    },
    {
      description: "Yes, you can actually buy this brige. And then... idk collect tolls or something.",
      img: "https://i.picsum.photos/id/84/200/200.jpg",
      name: "Big Bridge",
      price: 30000000,
      category: "things"
    },
    {
      description: "Just some Raindrops",
      img: "https://i.picsum.photos/id/123/200/200.jpg",
      name: "Raindrops",
      price: 12.99,
      category: "things"
    },
    {
      description: "One Day Trip, Great View",
      img: "https://i.picsum.photos/id/829/200/200.jpg",
      name: "Grand Canyon",
      price: 123,
      category: "places"
    },
    {
      description: "Just a whole lot of nothingness",
      img: "https://i.picsum.photos/id/131/200/200.jpg",
      name: "Nothingness",
      price: 0,
      category: "places"
    },
    {
      description: "Dock on a Lake",
      img: "https://i.picsum.photos/id/77/200/200.jpg",
      name: "Dock on a Lake",
      price: 899,
      category: "places"
    }
  ];
} 