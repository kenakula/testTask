import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/init-modals';

import {stepper} from './modules/stepper';
import {buttonSwitch} from './modules/card-price-switch';
import './modules/products';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initModals();
stepper();
buttonSwitch();
