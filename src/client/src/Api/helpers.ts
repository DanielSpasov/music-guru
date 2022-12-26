export function applyPrefix(api: any, props: any): void {
  if (props?.prefix) {
    api.model = `${props.prefix}/${api.model}`;
  }
}
