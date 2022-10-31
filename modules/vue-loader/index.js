const regEnter = /[\r\n]/g
const regTemplate = /\<template\>(.+?)\<\/template\>/
const regScript = /\<script\>(.+?)\<\/script\>/
const regFirstSign = /({)/

module.exports = function (source) {
  const _source = source.replace(regEnter, '') // 去掉换行符
  const template = _source.match(regTemplate)[1] // 匹配template标签中的内容
  const script = _source.match(regScript)[1] // 匹配script标签中的内容
  const finalScript = script.replace(regFirstSign, '$1 template:`' + template + '`,')
  
  return finalScript
}