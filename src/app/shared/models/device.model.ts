export interface Device {
  _id: string;
  traffic: string;
  condition: string;
  type: string;
  model: string;
  brand: string;
  serial: string;
  rma: string;
  note: string;
  time: Date;
  user: string;
  change: string; // Added, Edit, Removed
}
