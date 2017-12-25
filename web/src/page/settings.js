import React from 'react';
import { Page, Tabs, Tab, Panel, Input, Button } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';

import settings from '../../../config/379374148436230144.json';

export class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: settings,
        };
    }

    render() {
        return (
            <Page title='Settings'>
                <Tabs align='top'>

                    <Tab title='Plex'>
                        <Panel title='Plex Settings'>
                            <Row Padding={5}>
                                <Input
                                    label='Plex URL'
                                    placeholder='https://127.0.0.1:31200'
                                    onChange={e => this.onTextChange('plexUrl', e)}
                                    value={this.state.settings.plex.url} />
                            </Row>
                            <Row>
                                <Input
                                    label='Username'
                                    placeholder='username'
                                    onChange={e => this.onTextChange('username', e)}
                                    value={this.state.plexUsername} />

                                <Input
                                    label='password'
                                    placeholder='password'
                                    onChange={e => this.onTextChange('password', e)}
                                    value={this.state.plexPassword} />
                            </Row>
                            <Row align='right'>
                                <Button type='info' size='lg' name="Save" />
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title=''></Tab>
                    <Tab title='Sonarr'>
                        <h2>The Tab Component</h2>
                        <p>Takes one prop <code>title</code>, which is a <code>String</code></p>
                        <p>Then takes children elements</p>
                        <p>It should sit inside of the <code>Tabs</code> Component</p>
                    </Tab>
                    <Tab title='Radarr'>
                        <h2>The Tab Component</h2>
                        <p>Takes one prop <code>title</code>, which is a <code>String</code></p>
                        <p>Then takes children elements</p>
                        <p>It should sit inside of the <code>Tabs</code> Component</p>
                    </Tab>
                    <Tab title='Lidarr'>
                        <h2>The Tab Component</h2>
                        <p>Takes one prop <code>title</code>, which is a <code>String</code></p>
                        <p>Then takes children elements</p>
                        <p>It should sit inside of the <code>Tabs</code> Component</p>
                    </Tab>
                    <Tab title=''></Tab>
                    <Tab title='Tautulli'>
                        <h2>The Tab Component</h2>
                        <p>Takes one prop <code>title</code>, which is a <code>String</code></p>
                        <p>Then takes children elements</p>
                        <p>It should sit inside of the <code>Tabs</code> Component</p>
                    </Tab>
                </Tabs>
            </Page>
        );
    };
};