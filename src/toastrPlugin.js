import toastr from 'toastr'

const ToastrPlugin = {
  install (Vue, options) {
    if (!options) options = {}

    toastr.options = options

    Vue.prototype.$toastr = {
      success (title, message, optionsOverride) {
        if (!message) message = ''
        if (!title) title = ''
        if (!optionsOverride) optionsOverride = {}

        toastr.success(message, title, optionsOverride)
      },
      info (title, message, optionsOverride) {
        if (!message) message = ''
        if (!title) title = ''
        if (!optionsOverride) optionsOverride = {}

        toastr.info(message, title, optionsOverride)
      },
      warning (title, message, optionsOverride) {
        if (!message) message = ''
        if (!title) title = ''
        if (!optionsOverride) optionsOverride = {}

        toastr.warning(message, title, optionsOverride)
      },
      error (title, message, optionsOverride) {
        if (!message) message = ''
        if (!title) title = ''
        if (!optionsOverride) optionsOverride = {}

        toastr.error(message, title, optionsOverride)
      }
    }
  }
}

export default ToastrPlugin
