type RequestType = 'GET' | 'FETCH' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export function devLog(type: RequestType, url: string, data: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${type}]: ${url}`, data);
  }
}

export function applyPrefix(api: any, props: any): void {
  const { prefix } = props;
  const { model } = api;

  if (prefix) {
    api.model = `${prefix}/${model}`;
  }
}
