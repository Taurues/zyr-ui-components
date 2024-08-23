// 命令解析 npm run create Button
/**
 * 1.判断Button文件是不是已经存在。存在：提示文件夹已经存在，return；不存在 - 校验是不是大驼峰命名 ？ next : 提示/自动转换
 * 2.创建一个名为Button文件夹
 * 3.创建index.tsx文件
 * 4.创建index.less文件
 * 5.创建index.stories.tsx文件
 * 6.创建各个文件模版的内容
 * */

const fs = require('fs');
//控制台颜色输出
const chalk = require('chalk');
// 加载动画
const ora = require('ora');

// index.tsx 模版
const createTsx = (name) => {
  return `
    import "./index.less";
    import React from "react";
    import cn from "classnames";
    import { createNamespace } from "../../utils/craeteBEM";\n
    export interface ${name}Props {}\n
    const bem = createNamespace("${name.toLowerCase()}");
    const ${name} = ({}: ${name}Props) => { return <div></div>}\n
    export default ${name};
  `
}

// index.stories.tsx 模版
const createStories = (name) => {
  return `
  import type { Meta, StoryObj } from "@storybook/react";
  import React from "react";
  import ${name} from "./index";\n
  const meta: Meta<typeof ${name}> = {
    title: "Example/${name}",
    component: ${name},
    tags: ["autodocs"],
  };
  export default meta;
  type Story = StoryObj<typeof meta>;\n
  export const Default: Story = {
    args: {},
  };
`}
// index.less 模版
const createLess = (name) => {
  return `.zyr-${name.toLowerCase()} {}`
}

const spinner = ora('创建文件中...')
const create = () => {
  const name = process.argv[2];
  const path = `./src/packages/${name}`;
  if (fs.existsSync(path)) {
    console.log(chalk.red('❌~~~文件夹已经存在~~~'));
    return;
  }
  if (!/^[A-Z][a-zA-Z]*$/.test(name)) {
    console.log(chalk.red('❌~~~文件夹名称不符合大驼峰命名规范~~~'));
    return;
  }
  spinner.start();
  try {
    fs.mkdirSync(path);
    fs.writeFileSync(`${path}/index.tsx`, createTsx(name));
    fs.writeFileSync(`${path}/index.stories.tsx`, createStories(name))
    fs.writeFileSync(`${path}/index.less`, createLess(name))
    spinner.succeed(`${name}创建成功~~~`);
    spinner.stop()
  } catch (error) {
    spinner.fail(`${name}创建失败~~~`);
  }

}
create();




