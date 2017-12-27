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
                                <Col padding={5}>
                                    <Input
                                        label='Plex URL'
                                        placeholder='https://127.0.0.1:31200'
                                        onChange={e => this.onTextChange('plexUrl', e)}
                                        value={this.state.settings.plex.url} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Username'
                                        placeholder='username'
                                        onChange={e => this.onTextChange('username', e)}
                                        value={this.state.plexUsername} />
                                </Col>
                                <Col padding={5}>
                                    <Input
                                        label='password'
                                        placeholder='password'
                                        onChange={e => this.onTextChange('password', e)}
                                        value={this.state.plexPassword} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title=''></Tab>
                    <Tab title='Sonarr'>
                        <Panel title='Sonarr Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Sonarr URL'
                                        placeholder='http://127.0.0.1:8686/sonarr'
                                        onChange={e => this.onTextChange('sonarrUrl', e)}
                                        value={this.state.settings.sonarr.url} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='API Key'
                                        placeholder='9e13a7a0169f4bf1891292c14ee756b'
                                        onChange={e => this.onTextChange('sonarrApikey', e)}
                                        value={this.state.settings.sonarr.apikey} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Default Profile'
                                        placeholder='HDTV-720p'
                                        onChange={e => this.onTextChange('sonarrDefaultProfile', e)}
                                        value={this.state.settings.sonarr.defaultProfile} />

                                    <Input
                                        label='Default Root Path'
                                        placeholder='/mnt/media/TV'
                                        onChange={e => this.onTextChange('sonarrDefaultRoot', e)}
                                        value={this.state.settings.sonarr.defaultRootPath} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title='Radarr'>
                        <Panel title='Radarr Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Sonarr URL'
                                        placeholder='http://127.0.0.1:7878/radarr'
                                        onChange={e => this.onTextChange('radarrUrl', e)}
                                        value={this.state.settings.radarr.url} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='API Key'
                                        placeholder='29ad92751c8a4debba7f61e9fb098775'
                                        onChange={e => this.onTextChange('radarrApikey', e)}
                                        value={this.state.settings.radarr.apikey} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Default Profile'
                                        placeholder='Bluray-1080p'
                                        onChange={e => this.onTextChange('radarrDefaultProfile', e)}
                                        value={this.state.settings.radarr.defaultProfile} />

                                    <Input
                                        label='Default Root Path'
                                        placeholder='/mnt/media/FILM'
                                        onChange={e => this.onTextChange('radarrDefaultRoot', e)}
                                        value={this.state.settings.radarr.defaultRootPath} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title='Lidarr'>
                        <Panel title='Lidarr Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Lidarr URL'
                                        placeholder='http://127.0.0.1:7878/lidarr'
                                        onChange={e => this.onTextChange('lidarrUrl', e)}
                                        value={this.state.settings.lidarr.url} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='API Key'
                                        placeholder='29ad92751c8a4debba7f61e9fb098775'
                                        onChange={e => this.onTextChange('lidarrApikey', e)}
                                        value={this.state.settings.lidarr.apikey} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Default Profile'
                                        placeholder='Lossless'
                                        onChange={e => this.onTextChange('lidarrDefaultProfile', e)}
                                        value={this.state.settings.lidarr.defaultProfile} />

                                    <Input
                                        label='Default Root Path'
                                        placeholder='/mnt/media/MUSiC'
                                        onChange={e => this.onTextChange('lidarrDefaultRoot', e)}
                                        value={this.state.settings.lidarr.defaultRootPath} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title=''></Tab>
                    <Tab title='Tautulli'>
                        <Panel title='Tautulli Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Tautulli URL'
                                        placeholder='http://127.0.0.1:8181/tautulli'
                                        onChange={e => this.onTextChange('tautulliUrl', e)}
                                        value={this.state.settings.tautulli.url} />

                                    <Input
                                        label='API Key'
                                        placeholder='f1249c9ecba548d01aee6a32734364d7'
                                        onChange={e => this.onTextChange('tautulliApikey', e)}
                                        value={this.state.settings.tautulli.apikey} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title='SyncLounge'>
                        <Panel title='SyncLounge Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Server URL'
                                        placeholder='https://eu1.synclounge.tv'
                                        onChange={e => this.onTextChange('syncloungeServerUrl', e)}
                                        value={this.state.settings.synclounge.serverurl} />

                                    <Input
                                        label='App URL'
                                        placeholder='https://app.synclounge.tv/ptweb'
                                        onChange={e => this.onTextChange('syncloungeAppUrl', e)}
                                        value={this.state.settings.synclounge.appurl} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                    <Tab title=''></Tab>
                    <Tab title='Bot'>
                        <Panel title='Internal Bot Settings'>
                            <Row>
                                <Col padding={5}>
                                    <Input
                                        label='Server Prefix'
                                        placeholder='!'
                                        onChange={e => this.onTextChange('serverPrefix', e)}
                                        value={this.state.settings.prefix} />
                                </Col>
                            </Row>
                            <Row>
                                <Col padding={20} align='right'>
                                    <Button type='info' size='lg' title="Save" />
                                </Col>
                            </Row>
                        </Panel>
                    </Tab>
                </Tabs>
            </Page>
        );
    };
};