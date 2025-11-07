
// List the days
export const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
] as const;

// Make a type from the list
export type DayName = (typeof DAYS)[number];

// Define what a Recipe looks like
export interface Recipe {
    id: string,
    name: string;
}

// Define what a week looks like
export type WeekPlan = Record<DayName, Recipe[]>;
