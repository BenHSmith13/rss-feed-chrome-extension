import React from 'react';
import _ from 'lodash';
import { Row } from 'antd';

import FilterSet from './FilterSet';
import { setItem } from 'Utils/storage';

const filterCount = 2;
const span = 24 / filterCount;

export default function Filters({
  filters,
}) {
  const { include, exclude } = filters || {};

  const toggleActive = (name, checked) => {
    const newFilters = _.cloneDeep(filters) || {};
    if (!newFilters[name]) { newFilters[name] = {}; }
    newFilters[name].active = checked;
    setItem('filters', newFilters);
  }

  const addRule = (name, rule) => {
    if (!rule) { return; }

    const newFilters = _.cloneDeep(filters) || {};
    if (!newFilters[name]) { newFilters[name] = {}; }
    if (!newFilters[name].rules) { newFilters[name].rules = []; }
    newFilters[name].rules = _.compact(_.uniq(_.concat(newFilters[name].rules, rule)));
    setItem('filters', newFilters);
  }

  const removeRule = (name, rule) => {
    const newFilters = _.cloneDeep(filters) || {};
    if (!newFilters[name] || !newFilters[name].rules) { return; }
    newFilters[name].rules = _.filter(newFilters[name].rules, r => r !== rule);
    setItem('filters', newFilters);
  }

  return (
    <>
      <Row gutter={16}>
        <FilterSet
          name='Include'
          filter={include}
          span={span}
          toggleActive={checked => toggleActive('include', checked)}
          addRule={rule => addRule('include', rule)}
          removeRule={rule => removeRule('include', rule)}
        />
        <FilterSet
          name='Exclude'
          filter={exclude}
          span={span}
          toggleActive={checked => toggleActive('exclude', checked)}
          addRule={rule => addRule('exclude', rule)}
          removeRule={rule => removeRule('exclude', rule)}
        />
      </Row>
    </>
  )
}
