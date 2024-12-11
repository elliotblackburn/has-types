declare function hasTypes(
    specifier: string,
    options?: {
        before?: string;
    },
): Promise<`@types/${string}` | boolean>;

export default hasTypes;
