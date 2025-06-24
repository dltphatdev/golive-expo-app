export interface UpdateStepReqBody {
	start_time: string;
	last_time: string;
	steps: number;
}

export interface ChartStep {
	date: string;
	steps: number;
	isCompleted: boolean;
	chartValue: number;
}

export interface GetStepRes {
	stepLogToday: {
		steps: number;
		spoint_earned: number;
	};
	chartData: ChartStep[];
	lastStreakCount: number;
}
