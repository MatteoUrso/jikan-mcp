export type Broadcast = {
  /**
   * @description Day of the week
   */
  day: string | null;
  /**
   * @description Time in 24 hour format
   */
  time: string | null;
  /**
   * @description Timezone (Tz Database format https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
   */
  timezone: string | null;
  /**
   * @description Raw parsed broadcast string
   */
  string: string | null;
};
