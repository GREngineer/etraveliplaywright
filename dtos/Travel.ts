// Date and location variables

export class Travel {
    public fromCity: string = "New York";
    public toCity: string = "London";
    public fromDate: string = "Mon Apr 01 2024";
    public toDate: string = "Mon Apr 08 2024";
    public month: string = "April 2024";

    //Method that calculates a future date

    public static getDatePlusToday(numDays: number, formatPattern: string): string {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + numDays);
        return currentDate.toLocaleDateString('en-US', { 
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', 
            timeZone: 'UTC', formatMatcher: 'basic'
        });
    }
}