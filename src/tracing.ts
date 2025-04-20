import { NodeSdk, type Resource } from "@effect/opentelemetry";
import {
	BatchSpanProcessor,
	ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { Context } from "effect";

export class Tracing extends Context.Tag("Tracing")<
	Tracing,
	typeof Resource.Resource
>() {
	static readonly Live = NodeSdk.layer(() => ({
		resource: {
			serviceName: "effect-app",
			attributes: {
				environment: "production",
			},
		},
		spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
	}));
	static readonly Test = NodeSdk.layer(() => ({
		resource: {
			serviceName: "effect-app",
			attributes: {
				environment: "test",
			},
		},
		spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
	}));
}
