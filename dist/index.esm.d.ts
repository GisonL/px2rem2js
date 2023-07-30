interface ClassPropsType {
    baseFontSize?: number;
    designWidth?: number;
    context?: any;
    suffix?: boolean;
    maxWidth?: number | string | false;
}
interface GetRemOptions {
    suffix?: boolean;
}
declare const enum EvenTypes {
    'RESIZE' = "RESIZE"
}
declare class PX2REM2JS {
    private BASE_FONT_SIZE;
    private DESIGN_WIDTH;
    private WINDOW_CONTEXT;
    private SUFFIX;
    private MAX_WIDTH;
    private EVENS;
    private UNIT;
    constructor(props?: ClassPropsType);
    on: (type: EvenTypes, cb: Function) => void;
    private emit;
    _compute: (px: number, isInit?: boolean) => number;
    getRem: (px: number | string, options?: GetRemOptions) => string;
    initRem: () => void;
}

export { EvenTypes, PX2REM2JS as default };
