export type Daterange = {
  /**
   * @description Date ISO8601 format
   */
  from: string | null;
  /**
   * @description Date ISO8601 format
   */
  to: string | null;
  prop: {
    from: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    string: string | null;
  };
};
