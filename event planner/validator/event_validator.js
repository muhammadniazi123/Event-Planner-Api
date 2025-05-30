import zod from "zod";

/** ISO‑8601 date string checker (e.g. 2025-05-16 or 2025‑05‑16T09:30:00Z) */
const isoDateString = zod
  .string({ message: "eventDate is required" })
  .nonempty({ message: "eventDate should not be empty" })
  .refine(
    (val) => !Number.isNaN(Date.parse(val)),
    { message: "eventDate must be a valid ISO‑8601 date string" }
  );

/** Common name constraints (eventName, etc.) */
const nameString = zod
  .string({ message: "should be a string" })
  .nonempty({ message: "should not be empty" })
  .trim()
  .min(3, { message: "should be at least 3 characters long" })
  .max(255, { message: "should be at most 255 characters long" });

/* ---------- 1. POST / events  →  createEvent ---------- */

export const createEventSchema = zod.object({
  eventName: nameString.refine((s) => !/\s{2,}/.test(s), {
    message: "eventName cannot contain consecutive spaces",
  }),
  eventDate: isoDateString,
  eventAttendees: zod
    .array(
      zod
        .string({ message: "attendee must be a string" })
        .trim()
        .nonempty({ message: "attendee name cannot be empty" })
        .max(255, { message: "attendee name too long" })
    )
    .min(1, { message: "eventAttendees must include at least one attendee" })
    .max(5000, { message: "eventAttendees cannot exceed 5000 entries" }),
  eventDiscription: zod
    .string({ message: "eventDiscription is required" })
    .nonempty({ message: "eventDiscription should not be empty" })
    .trim()
    .min(3, { message: "eventDiscription should be at least 3 characters long" })
    .max(1000, { message: "eventDiscription should be at most 1000 characters long" }),
});

/* ---------- 2. POST / events/find‑by‑name ---------- */

export const findEventByNameSchema = zod.object({
  eventName: nameString,
});

/* ---------- 3. POST / events/find‑by‑date ---------- */

export const findEventByDateSchema = zod.object({
  eventDate: isoDateString,
});

/* ---------- Aggregate export (like your auth validators) ---------- */
export default {
  createEventSchema,
  findEventByNameSchema,
  findEventByDateSchema,
};
