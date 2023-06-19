import React from 'react';
import {Col, Row} from 'react-bootstrap';

const Footer = () => <Row
  className='gx-0 p-4 shadow'>
  <Col>
    <p>
      Developed by <a href='https://nathanwick.com'>Nathan Wick</a> in 2023
    </p>
  </Col>
  <Col
    className='text-end'>
    <p>
      App Version <a href='https://github.com/nathan-wick/catmap'>1.0.0</a>
    </p>
  </Col>
</Row>;

export default Footer;
