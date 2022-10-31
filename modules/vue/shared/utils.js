const regStringFn = /(.+?)\((.+?)\)/
const regString = /\'(.+?)\'/

/**
 * 找到第一个子元素
 * @param node
 * @returns {NodeListOf<ChildNode> | ActiveX.IXMLDOMNodeList}
 */
export function getFirstChildNode (node) {
  const childNodes = node.childNodes
  
  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType === 1) {
      return childNodes[i]
    }
  }
}

/**
 * 返回相关key和对应表达式的对象
 * @param data
 * @param expression
 * @returns {null|{expression: *, key: string}}
 */
export function checkExpressionHasData (data, expression) {
  for (let key in data) {
    if (expression.includes(key)) {
      return {
        key,
        expression
      }
    } else {
      return null
    }
  }
}

/**
 * 返回方法的函数名和参数
 * @param str
 * @returns {{args: string[], methodName: (*|string)}}
 */
export function checkFunctionHasArgs (str) {
  const matched = str.match(regStringFn)
  
  if (matched) {
    const argArr = matched[2].split(',')
    const args = checkIsString(matched[2])
      ? argArr
      : argArr.map(item => Number(item))
    
    return {
      methodName: matched[1],
      args
    }
  }
}

/**
 * 判断是否为字符串
 * @param str
 * @returns {void | * | RegExpMatchArray | Promise<Response | undefined>}
 */
export function checkIsString (str) {
  return str.match(regString)
}
