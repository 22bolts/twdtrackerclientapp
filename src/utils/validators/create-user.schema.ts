import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

const commaSeparatedArray = (value: string | undefined) => {
  if (!value) return [];
  return value.split(',').map((item) => item.trim());
};

// form zod validation schema
export const createUserSchema = z.object({
  email: validateEmail,
  password: z.string().min(6, { message: messages.passwordMinLength }),
  phone_number: z.string().optional(),
  role: z.string().min(1, { message: messages.roleIsRequired }),
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  usertag: z.string().optional(),
  status: z.string().optional(),
  avatar: z.string().optional(),
  position: z.string().optional(), // For employees
  department: z.string().optional(), // For employees
  managerID: z.string().or(z.number()).optional(), // For employees
  skills: z.array(z.string()).optional(), // For freelancers as comma-separated strings
  portfolio_Link: z.string().optional(), // For freelancers
  availabilityStatus: z.string().optional(), // For freelancers
  hourly_Rate: z.number()
    .min(0, { message: messages.hourlyRateOutOfRange })
    .nonnegative({ message: messages.hourlyRateIsRequired })
    .optional(),
  companyName: z.string().optional(), // For clients
  address: z.string().optional(), // For clients
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Default values
export const defaultCreateUserInput: CreateUserInput = {
  email: '',
  password: '',
  phone_number: '',
  role: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  usertag: '',
  status: 'offline',
  avatar: '',
  position: '',
  department: '',
  managerID: '',
  skills: [],
  portfolio_Link: '',
  availabilityStatus: 'available',
  hourly_Rate: 0,
  companyName: '',
  address: '',
};