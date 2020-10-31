import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { faAlignLeft, faLink, faSpinner, faSignal, faTimes } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'

library.add(faAlignLeft, faLink, faSpinner, faSignal, faTimes)

config.autoAddCss = false

dom.watch()
