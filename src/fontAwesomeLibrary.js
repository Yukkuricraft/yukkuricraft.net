import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { faAlignLeft, faLink, faSpinner, faSignal } from '@fortawesome/free-solid-svg-icons';

library.add(faAlignLeft, faLink, faSpinner, faSignal);

import css from "@fortawesome/fontawesome-svg-core/styles.css"

void(css);

config.autoAddCss = false;

dom.watch();