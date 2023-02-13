interface ClassPropsType {
    baseFontSize?: number;
    designWidth?: number;
    context?: any;
    suffix?: boolean;
}
interface GetRemOptions {
    suffix?: boolean;
}
declare const enum EvenTypes {
    'RESIZE' = "RESIZE"
}
declare class PX2REM2JS {
    BASE_FONT_SIZE: number;
    DESIGN_WIDTH: number;
    WINDOW_CONTEXT: any;
    SUFFIX: boolean;
    EVENS: {
        [key in EvenTypes]: Function[];
    };
    private UNIT;
    constructor(props?: ClassPropsType);
    on: (type: EvenTypes, cb: Function) => void;
    private emit;
    _compute: (px: number, isInit?: boolean) => number;
    getRem: (px: number | string, options?: GetRemOptions) => string;
    initRem: () => void;
}

export { EvenTypes, PX2REM2JS as default };
