import React from 'react';
import { Page, Panel, Table, TableHead, TableBody, TableRow, } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { Client } from 'discord.js';

export class Welcome extends React.Component {

  render() {
    return (
      <Page title='MediaButler'>
        <Row>
          <Col padding={5} basis='40%'>
            <Panel title='News'>
              <Table>
                <TableBody>
                  <TableRow>
                    <td>News Item One</td>
                  </TableRow>
                  <TableRow>
                    <td>News Item Two</td>
                  </TableRow>
                  <TableRow>
                    <td>News Item Three</td>
                  </TableRow>
                  <TableRow>
                    <td>News Item Four</td>
                  </TableRow>
                  <TableRow>
                    <td>News Item Five</td>
                  </TableRow>
                </TableBody>
              </Table>
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Discord Statistics'>
              This is a paragraph
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Bot Statistics'>
              <div className='red-text'>
                This is a red paragraph
              </div>
            </Panel>
          </Col>
        </Row>

        <h2>More Panels</h2>
        <Row>
          <Col padding={5}>
            <Panel>
              This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Yellow paragraph'>
              <div className='yellow-text'>
                This is a paragraph
              </div>
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Blue paragraph'>
              <div className='blue-text'>
                This is a paragraph
              </div>
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}
