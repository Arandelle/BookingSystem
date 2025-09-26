export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'time' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface Appointment {
  id: string;
  data: Record<string, string>;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface BookingConfig {
  fields: FormField[];
  title: string;
  description: string;
}