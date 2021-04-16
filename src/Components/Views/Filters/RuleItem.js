import React from 'react';
import { Button, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function RuleItem({ rule, removeRule }) {
  return (
    <List.Item>
      {rule}
      <Button
        onClick={removeRule}
        type='text'
        style={{ float: 'right' }}
      >
        <DeleteOutlined />
      </Button>
    </List.Item>
  )
}
