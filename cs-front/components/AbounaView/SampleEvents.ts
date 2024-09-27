export interface Event {
    allDay?: boolean | undefined;
    title?: React.ReactNode | undefined;
    start?: Date | undefined;
    end?: Date | undefined;
    resource?: any;
}

export function generateSampleEvents(): Event[] {
    const events: Event[] = [];
    const startDate = new Date(2024, 7, 1); // August 1, 2023
    const endDate = new Date(2024, 9, 31); // October 31, 2023

    const eventTitles = [
        "Confession",
        "Mass",  
        "Baptism",
        "Wedding",
        "Funeral",
    ];

    // Durations in minutes
    const durations = [30, 60, 90, 120, 150, 180, 210, 240];
    // Weights for durations (shorter durations are more common)
    const durationWeights = [40, 30, 10, 8, 5, 4, 2, 1];
    const totalWeight = durationWeights.reduce((a, b) => a + b, 0);

    // Helper function to select a random date and time
    function randomDate(start: Date, end: Date): Date {
        const date = new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        date.setHours(Math.floor(Math.random() * 24));
        // Set minutes to either :00 or :30
        date.setMinutes(Math.random() < 0.5 ? 0 : 30);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }

    // Helper function to select a duration based on weights
    function getRandomDuration(): number {
        const rand = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        for (let i = 0; i < durations.length; i++) {
            cumulativeWeight += durationWeights[i];
            if (rand < cumulativeWeight) {
                return durations[i];
            }
        }
        return durations[durations.length - 1];
    }

    // Generate a specified number of events
    const numberOfEvents = 100;
    for (let i = 0; i < numberOfEvents; i++) {
        const isAllDay = Math.random() < 0.1; // 10% chance for all-day event
        const event: Event = {
            title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        };

        if (isAllDay) {
            event.allDay = true;
            event.start = randomDate(startDate, endDate);
            event.start.setHours(0, 0, 0, 0);
            event.end = new Date(event.start);
            event.end.setDate(event.end.getDate() + 1);
        } else {
            event.allDay = false;
            event.start = randomDate(startDate, endDate);
            const durationMinutes = getRandomDuration();
            event.end = new Date(event.start.getTime() + durationMinutes * 60000);
        }

        events.push(event);
    }

    return events;
}