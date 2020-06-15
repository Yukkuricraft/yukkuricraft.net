import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { faAlignLeft, faLink, faSpinner, faSignal, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faAlignLeft, faLink, faSpinner, faSignal, faTimes);

import css from "@fortawesome/fontawesome-svg-core/styles.css"

void(css);

config.autoAddCss = false;

dom.watch();