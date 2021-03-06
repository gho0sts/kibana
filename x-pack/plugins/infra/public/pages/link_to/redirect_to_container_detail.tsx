/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

export const RedirectToContainerDetail = ({ match }: RouteComponentProps<{ name: string }>) => (
  <Redirect to={`/metrics/container/${match.params.name}`} />
);

export const getContainerDetailUrl = ({ name }: { name: string }) =>
  `#/link-to/container-detail/${name}`;
