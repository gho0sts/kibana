/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import styled from 'styled-components';
import TooltipOverlay from '../../../shared/TooltipOverlay';
import { RelativeLink, legacyEncodeURIComponent } from '../../../../utils/url';
import {
  asMillisWithDefault,
  asDecimal,
  tpmUnit
} from '../../../../utils/formatters';
import { ImpactBar } from '../../../shared/ImpactBar';

import { fontFamilyCode, truncate } from '../../../../style/variables';
import { ManagedTable } from '../../../shared/ManagedTable';

function tpmLabel(type) {
  return type === 'request' ? 'Req. per minute' : 'Trans. per minute';
}

function avgLabel(agentName) {
  return agentName === 'js-base' ? 'Page load time' : 'Avg. resp. time';
}

const TransactionNameLink = styled(RelativeLink)`
  ${truncate('100%')};
  font-family: ${fontFamilyCode};
`;

function getColumns({ agentName, serviceName, type }) {
  return [
    {
      field: 'name',
      name: 'Name',
      width: '50%',
      sortable: true,
      render: transactionName => {
        const transactionUrl = `${serviceName}/transactions/${legacyEncodeURIComponent(
          type
        )}/${legacyEncodeURIComponent(transactionName)}`;

        return (
          <TooltipOverlay content={transactionName || 'N/A'}>
            <TransactionNameLink path={`/${transactionUrl}`}>
              {transactionName || 'N/A'}
            </TransactionNameLink>
          </TooltipOverlay>
        );
      }
    },
    {
      field: 'avg',
      name: avgLabel(agentName),
      sortable: true,
      dataType: 'number',
      render: value => asMillisWithDefault(value)
    },
    {
      field: 'p95',
      name: '95th percentile',
      sortable: true,
      dataType: 'number',
      render: value => asMillisWithDefault(value)
    },
    {
      field: 'tpm',
      name: tpmLabel(type),
      sortable: true,
      dataType: 'number',
      render: value => `${asDecimal(value)} ${tpmUnit(type)}`
    },
    {
      field: 'impactRelative',
      name: 'Impact',
      sortable: true,
      dataType: 'number',
      render: value => <ImpactBar value={value} />
    }
  ];
}

export default function TransactionList({
  items,
  agentName,
  serviceName,
  type,
  ...rest
}) {
  return (
    <ManagedTable
      columns={getColumns({ agentName, serviceName, type })}
      items={items}
      initialSort={{ field: 'impactRelative', direction: 'desc' }}
      initialPageSize={25}
      {...rest}
    />
  );
}
