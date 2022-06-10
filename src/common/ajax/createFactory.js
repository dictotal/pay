import DateUtils from "@/common/utils/date-utils"
import { _$i18n } from "@/common/i18n"
let isDEV = process.env.NODE_ENV === "development"
const defaultData = { timeZone: DateUtils.getLocalTimeZone(), isWap: true }
export default function (ref, { isLoading }) {
  ref.interceptors.request.use(
    config => {
      let data = config.data || defaultData
      let params = config.params || {}
      params.lang = window.lang
      config.params = params
      if (isDEV) {
        console.log(`request url：${config.url}`)
      }
      data.timeZone = defaultData.timeZone
      data.isWap = defaultData.isWap
      data.online = true
      data.platform = data.platform || "TtBet"
      config.data = data
      config.data.currency = window.commonParams.currency
      config.headers["X-Access-Token"] = window.commonParams.token
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
  let rs
  ref.interceptors.response.use(
    data => {
      rs = data.data
      let status = rs.status
      if (status === "ok") {
        return rs.content
      } else {
        return Promise.reject(rs.msg)
      }
    },
    function (data) {
      if (isLoading) {
        Mask.hidden(loadingUid)
      }
      if (isDEV) {
        console.log(data)
      }
      return Promise.reject(data)
    }
  )
  return ref
}
