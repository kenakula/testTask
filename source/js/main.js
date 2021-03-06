import '@babel/polyfill';
import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/init-modals';

import {buttonSwitch} from './modules/card-price-switch';
import './modules/load-data';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initModals();
buttonSwitch();
