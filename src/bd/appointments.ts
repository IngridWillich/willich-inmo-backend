export interface Appointment {
    id: number;
    date: string;
    client?: string; 
    name?: string; 
  }
  
  export const appointments: Appointment[] = [
    { id: 1, date: "2023-05-01", client: "John Doe" },
    { id: 2, date: "2023-05-02", client: "Jane Doe" },
    { id: 3, name: "Appointment 3", date: "2024-06-12" },
  ];
  