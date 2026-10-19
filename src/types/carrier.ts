import type { Id } from './common/identifier';

export interface Carrier {
    carrierId: Id;
    name: string;
    code: string;
    trackingUrlTemplate: string;
    apiEndpoint: string;
}
