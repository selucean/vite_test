import API from "@/lib/API";
import type { GetContextEffect } from "redux-saga/effects";

declare module "typed-redux-saga" {
	interface SagaContext {
		API: API
	}
	export function getContext<T extends keyof SagaContext>(prop: T): SagaGenerator<SagaContext[T], GetContextEffect>
}
