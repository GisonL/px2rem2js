import { BASE_FONT_SIZE, DESIGN_WIDTH } from './constans';
import { debounce } from 'lodash-es';

interface ClassPropsType {
  baseFontSize?: number;
  designWidth?: number;
  context?: any;
  suffix?: boolean;
}

interface GetRemOptions {
  suffix?: boolean;
}

/**
 * TODO:
 * 1. 当前页跳转第三方时，会保留rem处理事件，可能造成不可预测的后果。考虑返回或提供一个事件卸载方法
 * 2. 跳转第三方再返回业务页面后，应该支持开发者重新挂载事件，涉及多实例还是单实例模式的选择，可能会采用全局变量缓存方案
 */

class PX2REM2JS {
  BASE_FONT_SIZE: number = BASE_FONT_SIZE;
  DESIGN_WIDTH: number = DESIGN_WIDTH;
  WINDOW_CONTEXT: any = window;
  SUFFIX: boolean = true;
  private UNIT = 'rem';

  constructor(props?: ClassPropsType) {
    if (!props) return;
    if (
      props.context &&
      Object.prototype.toString.call(props.context) === '[object Object]'
    ) {
      this.WINDOW_CONTEXT = props.context;
    } else {
      console.error('The context must be a [object Object]');
    }
    this.BASE_FONT_SIZE = props.baseFontSize || BASE_FONT_SIZE;
    this.DESIGN_WIDTH = props.designWidth || DESIGN_WIDTH;
    this.SUFFIX = props.suffix || true;
    if (!!this.SUFFIX) this.UNIT = '';
  }

  // compute rem
  _compute = (px: number | undefined = this.BASE_FONT_SIZE): number => {
    const scale = document.documentElement.clientWidth / this.DESIGN_WIDTH;
    let size: string | number =
      document.documentElement.style.fontSize || this.BASE_FONT_SIZE + 'px';
    size = Number(size.replace('px', ''));
    return (px / size) * scale;
  };

  // 通过px获取rem大小
  getRem = (
    px: number | undefined = this.BASE_FONT_SIZE,
    options?: GetRemOptions,
  ): string => {
    let unit = this.UNIT;
    if (options && !options.suffix) unit = '';
    return this._compute(px) + unit;
  };

  // 初始化rem与动态适配，调用一次即可，配合postcss使用
  initRem = () => {
    const resizeEvt =
      'orientationchange' in this.WINDOW_CONTEXT
        ? 'orientationchange'
        : 'resize';
    const docEl: HTMLElement = document.documentElement;
    const initFontSize = () => {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      // docEl.style.fontSize = `${BASE_FONT_SIZE * (clientWidth / DESIGN_WIDTH)}px`;
      if (clientWidth >= this.DESIGN_WIDTH) {
        docEl.style.fontSize = `${this.BASE_FONT_SIZE}px`;
      } else {
        docEl.style.fontSize = `${
          this._compute(undefined) * this.BASE_FONT_SIZE
        }px`;
      }
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
