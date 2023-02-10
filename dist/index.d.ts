interface ClassPropsType {
    baseFontSize: number;
    designWidth: number;
    context: any;
}
declare class PX2REM2JS {
    BASE_FONT_SIZE: number;
    DESIGN_WIDTH: number;
    WINDOW_CONTEXT: any;
    constructor(props: ClassPropsType);
    getRemFromPx: (px?: number | undefined, isInit?: boolean) => number;
    initRem: () => void;
}

export { PX2REM2JS as default };
