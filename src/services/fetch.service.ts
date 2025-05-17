type FetchOptions = {
	baseUrl?: string;
	method?: string;
	cache?: RequestCache;
};

/**
 * Client To Server
 */
export const fetchOnClient = async ({
	path,
	options,
	headers,
	body,
}: {
	path: string;
	options?: FetchOptions;
	headers?: Record<string, string>;
	body?: Record<string, unknown> | FormData;
}) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const url = new URL(path, baseUrl);
	const response = await fetch(url, {
		...options,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.statusText}`);
	}

	const data = await response.json();

	return data;
};

/**
 * Server To Server
 */
export const fetchOnServer = async ({
	path,
	options,
	headers,
	body,
}: {
	path: string;
	options?: FetchOptions;
	headers?: Record<string, string>;
	body?: Record<string, unknown> | FormData;
}) => {
	const baseUrl = options?.baseUrl;
	const url = new URL(path, baseUrl);

	const response = await fetch(url, {
		...options,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
};

/**
 * Query Vault
 */
export const fetchOnQueryVault = async ({
	path,
	options,
	headers,
	body,
}: {
	path: string;
	options?: FetchOptions;
	headers?: Record<string, string>;
	body?: Record<string, unknown> | FormData;
}) => {
	const baseUrl = process.env.QUERY_VAULT_API_URL;

	return fetchOnServer({
		path,
		options: {
			...options,
			baseUrl,
		},
		headers,
		body,
	});
};
