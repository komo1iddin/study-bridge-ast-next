import { deepmerge } from '@/lib/utils'

// Import the existing messages object from index.js
import existingMessages from './index.js'

// Import application form messages
import applicationFormEn from './components/application-form/en.json'
import applicationFormRu from './components/application-form/ru.json'
import applicationFormUz from './components/application-form/uz.json'

// Import other message files as needed
// ... (other imports)

// Create the updated messages object by merging with existing messages
const messages = {
  en: {
    ...existingMessages.en,
    components: {
      ...existingMessages.en.components,
      applicationForm: {
        ...applicationFormEn
      }
    }
  },
  ru: {
    ...existingMessages.ru,
    components: {
      ...existingMessages.ru.components,
      applicationForm: {
        ...applicationFormRu
      }
    }
  },
  uz: {
    ...existingMessages.uz,
    components: {
      ...existingMessages.uz.components,
      applicationForm: {
        ...applicationFormUz
      }
    }
  }
} as const

export default messages 