import { Pipe, PipeTransform } from '@angular/core';

export interface TimeSpan {
  start: Date;
  end: Date;
}

@Pipe({
  name: 'timeSpan',
})
export class TimeSpanPipe implements PipeTransform {
  transform(value: TimeSpan, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return this.calculateTimeSpan(value);
  }

  private calculateTimeSpan(value: TimeSpan): string {
    const diffMilliseconds = value.end.getTime() - value.start.getTime();
    const diffDays = diffMilliseconds / (24 * 60 * 60 * 1000);
    const days = Math.floor(diffDays);
    const remainingHours = (diffDays % 1) * 24;
    const hours = Math.floor(remainingHours);
    return `${days}d ${hours}h `;
  }
}
