import {
  checkExpressionHasData,
  checkFunctionHasArgs
} from './shared/utils'
import { vEvent } from './shared/propTypes'

export const eventPool = new Map()
export const expPool = new Map()

const regExp = /\{\{(.+?)\}\}/

export default function (vm, methods) {
  const { $nodes } = vm
  
  const allNodes = $nodes.querySelectorAll('*')
  const { vClick } = vEvent
  
  allNodes.forEach(node => {
    const vExpression = node.textContent
    const expMatched = vExpression.match(regExp)
    const vClickVal = node.getAttribute(`@${vClick}`)
    
    if (expMatched) {
      const poolInfo = checkExpressionHasData(vm.$data, expMatched[1].trim())
      if (poolInfo) {
        expPool.set(node, poolInfo)
      }
    }
    
    if (vClickVal) {
      const fnInfo = checkFunctionHasArgs(vClickVal)
      
      const handler = fnInfo ?
        methods[fnInfo.methodName].bind(vm, ...fnInfo.args) :
        methods[vClickVal].bind(vm)
      
      eventPool.set(node, {
        type: vClick,
        handler
      })
      node.removeAttribute(`@${vClick}`)
    }
  })
}