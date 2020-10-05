// export { default } from 'clsx';

export function getOriginalBodyPadding() {
  const style = window?.getComputedStyle(document.body, null);

  return parseInt(style?.getPropertyValue('padding-right') ?? '0', 10);
}

export function getScrollbarWidth() {
  let scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export function setScrollbarWidth(padding: number) {
  document.body.style.paddingRight = padding > 0 ? `${padding}px` : null;
}

export function isBodyOverflowing() {
  return window ? document.body.clientWidth < window.innerWidth : false;
}

export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

export function conditionallyUpdateScrollbar() {
  const scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433
  const fixedContent = document.querySelector(
    '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
  ) as HTMLElement;
  const bodyPadding = fixedContent
    ? parseInt(fixedContent?.style?.paddingRight ?? '0', 10)
    : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

export function getColumnSizeClass(isXs: boolean, colWidth: number, colSize: string | boolean) {
  if (colSize === true || colSize === '') {
    return isXs ? 'col' : `col-${colWidth}`;
  } else if (colSize === 'auto') {
    return isXs ? 'col-auto' : `col-${colWidth}-auto`;
  }

  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
}

export function browserEvent<K extends keyof HTMLElementEventMap>(target: HTMLElement, ...args: [K, (this: HTMLElement, ev: HTMLElementEventMap[K]) => any]) {
  target.addEventListener(...args);

  return () => target.removeEventListener(...args);
}

export function getNewCarouselActiveIndex(direction: 'prev' | 'next', items: any[], activeIndex: number) {
  if (direction === 'prev') {
    return activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  } else if (direction === 'next') {
    return activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  }
}

function toClassName(value: any) {
  let result = '';

  if (typeof value === 'string' || typeof value === 'number') {
    result += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(' ');
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += ' ');
          result += key;
        }
      }
    }
  }

  return result;
}

export default function classnames(...args: any[]) {
  return args.map(toClassName).filter(Boolean).join(' ');
}