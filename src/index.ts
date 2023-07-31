import { BASE_FONT_SIZE, DESIGN_WIDTH } from './constans';
import { debounce } from 'lodash-es';

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

export const enum EvenTypes {
  'RESIZE' = 'RESIZE',
}

class PX2REM2JS {
  private BASE_FONT_SIZE: number = BASE_FONT_SIZE;
  private DESIGN_WIDTH: number = DESIGN_WIDTH;
  private WINDOW_CONTEXT: any = window;
  private SUFFIX: boolean = true;
  private MAX_WIDTH: number | false = DESIGN_WIDTH;
  private EVENS: { [key in EvenTypes]: Function[] } = {
    [EvenTypes.RESIZE]: [],
  };
  private UNIT = 'rem';

  constructor(props?: ClassPropsType) {
    if (!props) return;
    if (
      props.context &&
      Object.prototype.toString.call(props.context) !== '[object Object]'
    ) {
      throw new Error('The context must be a [object Object]');
    } else {
      this.WINDOW_CONTEXT = props.context || window;
    }
    this.BASE_FONT_SIZE = props.baseFontSize || BASE_FONT_SIZE;
    this.DESIGN_WIDTH = props.designWidth || DESIGN_WIDTH;
    if (props.maxWidth === false) {
      this.MAX_WIDTH = false;
    } else {
      this.MAX_WIDTH = props.maxWidth
        ? Number(String(props.maxWidth).match(/[0-9]+/)[0] || this.DESIGN_WIDTH)
        : this.DESIGN_WIDTH;
    }
    this.SUFFIX = props.suffix || true;
    if (!!this.SUFFIX) this.UNIT = '';
  }

  on = (type: EvenTypes, cb: Function) => {
    this.EVENS[type].push(cb);
  };

  private emit = (type: EvenTypes) => {
    if (this.EVENS[type].length >= 1) {
      this.EVENS[type].forEach((fn) => {
        fn();
      });
    }
  };

  // compute rem
  _compute = (px: number, isInit: boolean = false): number => {
    const scale =
      this.WINDOW_CONTEXT?.document?.documentElement?.clientWidth /
      this.DESIGN_WIDTH;
    // 初始化(重新计算根元素大小)时，总是取在设计稿宽度下的基准值*比例
    let size: string | number = isInit
      ? this.BASE_FONT_SIZE + 'px'
      : this.BASE_FONT_SIZE * scale + 'px';
    size = Number(size.replace('px', ''));
    return Number(((px / size) * scale).toFixed(2));
  };

  // 通过px获取rem大小
  getRem = (px: number | string, options?: GetRemOptions): string => {
    let unit = this.UNIT;
    if (options && !options.suffix) unit = '';
    return this._compute(Number(px)) + unit;
  };

  // 初始化rem与动态适配，调用一次即可，配合postcss使用
  initRem = () => {
    const resizeEvt =
      'orientationchange' in this.WINDOW_CONTEXT
        ? 'orientationchange'
        : 'resize';
    const docEl: HTMLElement = this.WINDOW_CONTEXT?.document?.documentElement;
    const initFontSize = () => {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      if (this.MAX_WIDTH === false ? false : clientWidth >= this.MAX_WIDTH) {
        docEl.style.fontSize = `${this.BASE_FONT_SIZE}px`;
      } else {
        // rem * BASE_FONT_SIZE，方便使用
        docEl.style.fontSize = `${
          this._compute(this.BASE_FONT_SIZE, true) * this.BASE_FONT_SIZE
        }px`;
      }
      this.emit(EvenTypes.RESIZE);
    };
    //根据设计稿设置HTML字体大小
    const recalc = debounce(initFontSize, 100);
    initFontSize();
    // document?.addEventListener('DOMContentLoaded', recalc, false);
    this.WINDOW_CONTEXT?.addEventListener(resizeEvt, recalc, false);
    //页面显示时计算一次
    this.WINDOW_CONTEXT?.addEventListener(
      'pageshow',
      function (e: any) {
        if (e.persisted) {
          initFontSize();
        }
      },
      false,
    );
  };
}

export default PX2REM2JS;
