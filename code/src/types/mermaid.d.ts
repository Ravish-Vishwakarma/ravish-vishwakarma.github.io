declare module "mermaid/dist/mermaid.esm.min.mjs" {
    interface MermaidInstance {
        initialize(options?: Record<string, unknown>): void;
        render(id: string, text: string): Promise<{ svg: string }>;
    }

    const mermaid: MermaidInstance;
    export default mermaid;
}
