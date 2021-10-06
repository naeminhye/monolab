import React from 'react'

import 'monolab/dist/index.css'
import { Tree, DatePicker } from 'monolab'
import TableExample from './TableExample'

// Sample Tree dataSource
const x = 3
const y = 2
const z = 1
const gData: Array<any> = []

const generateData = (_level: number, _preKey?: string, _tns?: any): any => {
  const preKey = _preKey || '0'
  const tns = _tns || gData

  const children = []
  for (let i = 0; i < x; i++) {
    const value = `${preKey}-${i}`
    tns.push({ title: value, value })
    if (i < y) {
      children.push(value)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const App = () => {
  const [date] = React.useState(new Date())
  return (
    <div>
      <Tree
        dataSource={gData}
        defaultExpandedKeys={[]}
        defaultSelectedKeys={[]}
        selectable
        multiple
        checkable
      />
      <TableExample />
      <DatePicker
        bordered
        style={{ width: 100 }}
        format='M/D/YY'
        onChange={() => {}}
        value={date}
      />
    </div>
  )
}

export default App
