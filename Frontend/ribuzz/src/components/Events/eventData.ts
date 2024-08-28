export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    time: string[];
  }
  
  export const events: Event[] = [
    {
      id: "1",
      title: "Noche de Pitch para Startups",
      date: "2024-09-15",
      location: "Bogotá, Colombia",
      description: "Una noche de networking y presentación para startups.",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      time: ["7:00 PM", "9:00 PM"],
    },
    {
      id: "2",
      title: "Taller de Emprendimiento 101",
      date: "2024-10-05",
      location: "Medellín, Colombia",
      description: "Un taller para nuevos y futuros emprendedores.",
      image: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
      time: ["10:30 AM", "1:00 PM"],
    },
    {
      id: "3",
      title: "Cumbre de Innovadores Tecnológicos",
      date: "2024-11-20",
      location: "Cali, Colombia",
      description: "Una cumbre para innovadores tecnológicos y emprendedores.",
      image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 3,
      time: ["2:00 PM", "5:00 PM"],
    },
  ];
  