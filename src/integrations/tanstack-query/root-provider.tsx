import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	type PersistedClient,
	type Persister,
	persistQueryClient,
} from "@tanstack/react-query-persist-client";
import { del, get, set } from "idb-keyval";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

export function getContext() {
	return {
		queryClient,
	};
}

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function createIDBPersister(idbValidKey: IDBValidKey = "reactQuery") {
	return {
		persistClient: async (client: PersistedClient) => {
			console.log("persisting client");
			await set(idbValidKey, client);
		},
		restoreClient: async () => {
			return await get<PersistedClient>(idbValidKey);
		},
		removeClient: async () => {
			await del(idbValidKey);
		},
	} satisfies Persister;
}

const persister = createIDBPersister("load-order-library");

// const persister = createSyncStoragePersister({
// 	storage: window.localStorage,
// });

persistQueryClient({
	queryClient,
	persister,
});

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
