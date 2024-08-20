// BEM 规范 ： 避免命名冲突，规范命名
/**
 * B: block 代码块 z-botton
 * E：element 元素 z-botton__element
 * M：modifier 装饰 z-botton__element--disabled
 * S: status is-checked
 */
const _bem = (
  prefixName: string,
  block: string,
  element: string,
  modifier: string
) => {
  if (block) {
    prefixName = prefixName + `-${block}`;
  }
  if (element) {
    prefixName = prefixName + `__${element}`;
  }
  if (modifier) {
    prefixName = prefixName + `--${modifier}`;
  }
  return prefixName;
};

function createBEM(prefixName: string) {
  const b = () => _bem(prefixName, "", "", "");
  const e = (element: string) =>
    element ? _bem(prefixName, "", element, "") : "";
  const m = (modifier: string) =>
    modifier ? _bem(prefixName, "", "", modifier) : "";
  const be = (block: string, element: string) =>
    block && element ? _bem(prefixName, block, element, "") : "";
  const bm = (block: string, modifier: string) =>
    block && modifier ? _bem(prefixName, block, "", modifier) : "";
  const em = (element: string, modifier: string) =>
    element && modifier ? _bem(prefixName, "", element, modifier) : "";
  const bem = (block: string, element: string, modifier: string) =>
    block && element && modifier
      ? _bem(prefixName, block, element, modifier)
      : "";
  const is = (name: string, status: any) => (status ? `is-${name}` : "");
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

export function createNamespace(name: string) {
  const prefixName = `z-${name}`;
  return createBEM(prefixName);
}
