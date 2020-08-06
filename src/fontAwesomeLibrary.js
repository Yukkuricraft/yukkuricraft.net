import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { faAlignLeft, faLink, faSpinner, faSignal, faTimes } from '@fortawesome/free-solid-svg-icons'

import css from '@fortawesome/fontawesome-svg-core/styles.css'

library.add(faAlignLeft, faLink, faSpinner, faSignal, faTimes)

// eslint-disable-next-line no-void
void css

config.autoAddCss = false

dom.watch()
