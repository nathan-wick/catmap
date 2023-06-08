import React from 'react';
import {Col, Row} from 'react-bootstrap';

const Footer = () => <Row
  className='gx-0 p-4 shadow'>
  <Col>
    <p>
      Developed by Nathan Wick 2023
    </p>
  </Col>
  <Col
    className='text-end'>
    <p>
      App Version 1.0.0
    </p>
  </Col>
</Row>;

export default Footer;
