import { Tabs, Title } from '@mantine/core'

export default function Panel({ title, value, children }: Panel) {
  return (
    <Tabs.Panel value={value} style={{ padding: "10px" }}>
      {typeof title != "undefined" ? <Title>{title}</Title> : ""}
      <div className='page-content'>
        {children}
      </div>
    </Tabs.Panel>
  )
}


interface Panel { title?: string, value: string, children: any }
