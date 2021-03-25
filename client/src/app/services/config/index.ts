import {
  Inject,
  Injectable,
  InjectionToken,
  isDevMode,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

export interface Config {
  apiHost?: string;
  apiPath?: string;
  clientId?: string;
  clientSecret?: string;
  authorizePath?: string;
  tokenPath?: string;
  revokePath?: string;
  languages?: string[];

  [x: string]: any;
}

export const CONFIG = new InjectionToken<Config>('Config');
export const SERVER_HOST = new InjectionToken<string>('SERVER_HOST');
export const SERVER_PATH = new InjectionToken<string>('SERVER_PATH');

const defaultConfig: Config = {
  apiHost: '',
  apiPath: '/api/v1',
  clientId: 'client',
  clientSecret: 'secret',
  tokenPath: '/authorizationserver/oauth/token',
  authorizePath: '/authorizationserver/oauth/authorize',
  languages: ['en']
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(CONFIG) private readonly config,
              @Optional() @Inject(SERVER_HOST) serverHost?: string) {
    if (serverHost) {
      if (config.apiHost === '') {
        config.apiHost = serverHost;
      }
      if (!config.tokenPath.startsWith('http')) {
        config.tokenPath = `${serverHost}${config.tokenPath}`;
      }
      if (!config.authorizePath.startsWith('http')) {
        config.authorizePath = `${serverHost}${config.authorizePath}`;
      }
    }
  }

  get isDevMode(): boolean {
    return isDevMode();
  }

  get(): Config {
    return this.config;
  }

  set(k: string, v: any): void {
    this.config[k] = v;
  }
}

@NgModule()
export class ConfigModule {

  constructor(@Optional() @SkipSelf() parentModule?: ConfigModule) {
    if (parentModule) {
      throw new Error(
        'ConfigModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: Config): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIG,
          useValue: {
            ...defaultConfig,
            ...config
          }
        }
      ]
    };
  }
}
