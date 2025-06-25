import { SuccessResponseApi } from "@/app/+types/common";
import { GetStepLog, GetStepRes, UpdateStepReqBody } from "@/app/+types/step";
import http from "@/app/+utils/http";

const stepApi = {
	updateStep(body: UpdateStepReqBody) {
		return http.instance.put<SuccessResponseApi<{ totalSpoint: number }>>(
			"/step/update",
			body
		);
	},
	getStep() {
		return http.instance.get<SuccessResponseApi<GetStepRes>>("/step");
	},
	getStepLog() {
		return http.instance.get<SuccessResponseApi<GetStepLog>>("/step/history");
	},
};

export default stepApi;
