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

export interface Log {
	id: number;
	user_id: number;
	date: string;
	steps: number;
	spoint_earned: number;
	start_time: string;
	last_time: string;
	created_at: string;
	updated_at: string;
	user: { spoint: number };
}

export interface GetStepLog {
	logs: Log[];
}
