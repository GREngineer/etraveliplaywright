  export class DateUtils {
  
  //Method that calculates a future date

  public static getDatePlusToday(numDays: number, formatPattern: string): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + numDays);
    return currentDate.toLocaleDateString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', 
        timeZone: 'UTC', formatMatcher: 'basic'
    })
}
  }