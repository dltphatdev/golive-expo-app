import mitt from "mitt";

export const eventEmitter = mitt<{ clearLS: void }>();
