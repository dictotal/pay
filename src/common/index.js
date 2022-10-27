import Alert from "./alert"
import Mask from "./mask"
import Msg from "./msg"
import Tools from "./tools"
import Filter from "./filters"
import Config from "../config"
import I18n from "./i18n"
import { ajax, ajaxLoading } from "./ajax/index"
export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $$tools: { value: Tools },
      $$cfg: { value: Config },
      $$ajax: { value: ajax },
      $$ajaxLoading: { value: ajaxLoading },
      BUS: { value: new Vue() }
    })
    Vue.use(Filter)
    Vue.use(Mask)
    Vue.use(Alert)
    Vue.use(Msg)

    Vue.use(I18n)
  }
}
