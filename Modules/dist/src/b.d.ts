declare module 'cube' {
    function cube(): string;
}
declare global {
    interface JQuery {
        debug(): JQuery;
    }
}
export {};
