// utils/eventEmitter.ts
// import { EventEmitter } from "events";
import mitt from "mitt";

type EventTypes = {
	clearLS: void; // ✅ chỉ định là void chứ không phải hàm
};

// class TypedEventEmitter extends EventEmitter {
// 	emit<K extends keyof EventTypes>(
// 		event: K,
// 		...args: Parameters<EventTypes[K]>
// 	): boolean {
// 		return super.emit(event, ...args);
// 	}

// 	on<K extends keyof EventTypes>(event: K, listener: EventTypes[K]): this {
// 		return super.on(event, listener);
// 	}

// 	off<K extends keyof EventTypes>(event: K, listener: EventTypes[K]): this {
// 		return super.off(event, listener);
// 	}
// }

export const eventEmitter = mitt<EventTypes>();
