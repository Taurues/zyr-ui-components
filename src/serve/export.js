const fs = require("fs-extra")
const ora = require('ora');
/**
 * readdir: 读取目录下的文件名和文件夹名称
 * writeFile: 写入文件
*/

fs.readdir('./src/packages', (err, files) => {
  if (err) {
    console.log(err);
    return
  }
  if (Array.isArray(files)) {
    // 默认内容
    let exportStr = `import "antd/dist/antd.css";`
    files.forEach(e => {
      // 检查是否为文件夹
      const isPackage = fs.lstatSync(`./src/packages/${e}`).isDirectory()
      // 文件夹名称符合大驼峰命名规范
      const isMatch = /^[A-Z][a-zA-Z]*$/.test(e)
      // 包含index.tsx文件
      const existIndex = fs.existsSync(`./src/packages/${e}/index.tsx`)
      if (isPackage && isMatch && existIndex) {
        exportStr = `${exportStr}\n export type { ${e}Props } from "./packages/${e}";\n export { default as ${e} } from "./packages/${e}";`
      }
    });
    const spinner = ora('正在写入文件...')
    spinner.start()
    fs.writeFile('./src/index.ts', exportStr).then(res => {
      spinner.succeed(`写入成功~~~`);
    }).catch(err => {
      spinner.fail(`写入失败~~~`);
      console.log('err :>> ', err)
    }).finally(() => {
      spinner.stop()
    });
  }
}, err => { console.log('err :>> ', err); })