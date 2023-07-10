import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAlignLeft, faLink, faSpinner, faSignal, faTimes } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'

library.add(faAlignLeft, faLink, faSpinner, faSignal, faTimes)

dom.watch()
