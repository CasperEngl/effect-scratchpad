import { NodeSdk } from "@effect/opentelemetry";
import {
	BatchSpanProcessor,
	ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";

export const TracingLive = NodeSdk.layer(() => ({
	resource: {
		serviceName: "effect-app",
		attributes: {
			environment: "production",
		},
	},
	spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
}));

export const TracingTest = NodeSdk.layer(() => ({
	resource: {
		serviceName: "effect-app",
		attributes: {
			environment: "test",
		},
	},
	spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
}));
