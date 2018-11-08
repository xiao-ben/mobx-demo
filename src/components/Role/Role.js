import React, {Component} from 'react'
import { Table, Divider, Tag } from 'antd';

const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '权限',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
      </span>
    ),
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    ),
  }];

  const data = [{
    key: '1',
    roleName: 'John Brown',
    tags: ['nice', 'developer'],
  }];

class Role extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default Role