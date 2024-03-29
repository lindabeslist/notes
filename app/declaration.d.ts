export declare global {
    declare module '*.scss' {
        const content: Record<string, string>;
        export default content;
    }
    declare module '*.jpg';
    declare module '*.svg';
    declare module '*.png';
    declare module '*.pdf';
    declare module '*.ico';
}
