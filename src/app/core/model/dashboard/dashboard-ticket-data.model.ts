export interface DashBoardTicketModel {
    opened: string;
    resolved: string;
    pending: string;
    all: string;
}

export interface AverageTimeModel {
    timeAll: string;
    timeResolved: string;
}

export interface Chart2Data {
    timeAll: string;
    timeResolved: string;
}

export interface TicketUser {
    user: string;
    team: string;
    tasks: string;
    tasks_resolved: string;
}



