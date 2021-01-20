import { eachDayOfInterval, subDays } from 'date-fns';

export const eachOfInterval = (period: number): Date[] =>
  eachDayOfInterval({
    start: subDays(new Date(), period),
    end: new Date(),
  });
