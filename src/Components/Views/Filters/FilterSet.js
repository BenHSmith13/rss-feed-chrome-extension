import React, { useState } from 'react';
import { Card, Col, Switch, Input, Button, List, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import RuleItem from './RuleItem';

export default function FilterSet({
  name, filter, span, toggleActive, addRule, removeRule
}) {
  const { active, rules } = filter || {};
  const [newRule, setNewRule] = useState('');

  const handleRuleAdd = () => {
    addRule(newRule);
    setNewRule('');
  }

  return (
    <Col span={span}>
      <Card
        title={
          <>
            <h2 style={{ float: 'left', marginBottom: '0'}}>
              {name}
            </h2>
            <Switch
              style={{ marginLeft: '1rem', marginTop: '0.5rem', float: 'right'}}
              checked={active}
              onChange={toggleActive}
            />
          </>
        }
      >
      <Form
        onFinish={handleRuleAdd}
      >
        <Input.Group compact>
          <Input
            value={newRule}
            onChange={e => setNewRule(e.target.value)}
            style={{ width: '60%'}}
            placeholder='New Feed Url'
          />
          <Button
            type='primary'
            htmlType='submit'
          >
            <PlusOutlined />
            Add Rule
          </Button>
        </Input.Group>
      </Form>
      <List
        dataSource={rules}
        renderItem={item => <RuleItem rule={item} removeRule={() => removeRule(item)} />}
        style={{ marginTop: '0.5rem' }}
      />
      </Card>
    </Col>
  )
}
