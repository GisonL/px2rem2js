import { BASE_FONT_SIZE, DESIGN_WIDTH } from './constans';
import { debounce } from 'lodash';

interface ClassPropsType {
  baseFontSize: number;
  designWidth: number;
  context: any;
}

class PX2REM2JS {
  BASE_FONT_SIZE: number = BASE_FONT_SIZE;
  DESIGN_WIDTH: number = DESIGN_WIDTH;
  WINDOW_CONTEXT: any = window;

  constructor(props: ClassPropsType) {
    if (!props) return;
    this.BASE_FONT_SIZE = props.baseFontSize || BASE_FONT_SIZE;
    this.DESIGN_WIDTH = props.designWidth || DESIGN_WIDTH;
    if (
      props.context &&
      Object.prototype.toString.call(props.context) === '[object Object]'
    ) {
      this.WINDOW_CONTEXT = props.context;
    } else {
      console.error('The context must be a [object Object]');
    }
  }

  // 通过px获取rem大小
  getRemFromPx = (
    px: number | undefined = this.BASE_FONT_SIZE,
    isInit = false,
  ) => {
    const scale = document.documentElement.clientWidth / this.DESIGN_WIDTH;
    let size: string | number = isInit
      ? this.BASE_FONT_SIZE + 'px'
      : document.documentElement.style.fontSize || this.BASE_FONT_SIZE + 'px';
    size = Number(size.replace('px', ''));
    return (px / size) * scale;
  };

  // 初始化rem与动态适配，调用一次即可，配合postcss使用
  initRem = () => {
    const resizeEvt =
      'orientationchange' in this.WINDOW_CONTEXT
        ? 'orientationchange'
        : 'resize';
    const docEl: HTMLElement = document.documentElement;

    //根据设计稿设置HTML字体大小
    const recalc = debounce(() => {
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      // docEl.style.fontSize = `${BASE_FONT_SIZE * (clientWidth / DESIGN_WIDTH)}px`;
      if (clientWidth >= this.DESIGN_WIDTH) {
        docEl.style.fontSize = `${this.BASE_FONT_SIZE}px`;
      } else {
        docEl.style.fontSize = `${
          this.getRemFromPx(undefined, true) * this.BASE_FONT_SIZE
        }px`;
      }
    }, 100);
    recalc();
    // document?.addEventListener('DOMContentLoaded', recalc, false);
    this.WINDOW_CONTEXT?.addEventListener(resizeEvt, recalc, false);
    //页面显示时计算一次
    this.WINDOW_CONTEXT?.addEventListener(
      'pageshow',
      function (e: any) {
        if (e.persisted) {
          recalc();
        }
      },
      false,
    );
  };
}

export default PX2REM2JS;
