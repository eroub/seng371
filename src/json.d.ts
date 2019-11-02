// Allows us to load .json files
declare module "*.json" {
  const value: any;
  export default value;
}
// Allows us to load JSON from remote URL responses
declare module "json!*" {
  const value: any;
  export default value;
}
// Code gathered from https://nono.ma/says/load-a-json-file-with-typescript
