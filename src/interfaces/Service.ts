export interface Service<T, R>{
    execute(param: T): Promise<R>;
}

