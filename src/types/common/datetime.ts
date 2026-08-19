/**
 * Local time
 */
export type LocalTime = `${number}${number}:${number}${number}:${number}${number}`;

/**
 * A date without a time-zone in the ISO-8601 calendar system
 */
export type LocalDate =
    `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

/**
 * A date-time without a time-zone in the ISO-8601 calendar system.
 * Equivalent to `LocalDateTime` in `java.time.LocalDateTime`
 */
export type LocalDateTime = `${LocalDate}T${LocalTime}`;

/**
 * A date-time with a time-zone in the ISO-8601 calendar system.
 */
export type Instant = `${LocalDateTime}Z`;
