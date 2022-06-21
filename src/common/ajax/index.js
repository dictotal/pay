import axios from "axios"
import createFactory from "./createFactory"

axios.defaults.timeout = 30 * 1000

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '//pay.mdybet77.com/a/' : '/a/'

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"

let ajax = createFactory(axios, {})

let ajaxLoading = axios.create()
createFactory(ajaxLoading, { isLoading: true })

let ajaxSilent = axios.create()
createFactory(ajaxSilent, { isSilent: true })

export { ajax, ajaxLoading, ajaxSilent }
