// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "./TabManifestUpdater";
import { BotManifestUpdater } from "../generator18/BotManifestUpdater";
import { ConnectorManifestUpdater } from "../generator18/ConnectorManifestUpdater";
import { MessageExtensionManifestUpdater } from "../generator18/MessageExtensionManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { LocalizationManifestUpdater } from "../generator18/LocalizationManifestUpdater";
import * as chalk from 'chalk';


export class ManifestGenerator extends BaseManifestGenerator {
    constructor() {
        super();
        this.tabUpdater = new TabManifestUpdater();
        this.botUpdater = new BotManifestUpdater();
        this.connectorUpdater = new ConnectorManifestUpdater();
        this.messageExtensionUpdater = new MessageExtensionManifestUpdater();
        this.localizationUpdater = new LocalizationManifestUpdater();
    }

    public generateManifest(options: GeneratorTeamsAppOptions): any {
        const manifest = super.generateManifest(options);
        manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json";
        manifest.manifestVersion = "1.9";

        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return from === "1.8" ;
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        switch (manifest.manifestVersion) {
            case "1.8":
                manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json";
                manifest.manifestVersion = "1.9";
                return manifest;
            default:
                throw "Unable to update manifest";

        }
    };
}
