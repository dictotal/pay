import DateUtils from "@/common/utils/date-utils"
import { _$i18n } from "@/common/i18n"
import $$tools from '@/common/tools'
import { Msg } from '@/common/msg'
import {Mask} from "@/common/mask";
let isDEV = process.env.NODE_ENV === "development"
var loadingUid
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
      // config.headers["X-Access-Token"] = window.commonParams.token
      config.headers["Authorization"] = window.commonParams.token

      if (isLoading) {
				loadingUid = Mask.loading();
			}
      return config
    },
    function (error) {
      if (isLoading) {
				Mask.hidden(loadingUid);
			}
      return Promise.reject(error)
    }
  )
  let rs
  ref.interceptors.response.use(
    data => {
      rs = data.data
      let status = rs.status
      if (isLoading) {
				Mask.hidden(loadingUid);
			}
      if (status === "ok") {
        return rs.content
      } else {
        if (status === 'need_login') {
          $$tools.postMessage('login', {from: 'pay'})
          window.dsBridge.call('login', { from: 'pay' }, (res) => {
            console.log(res)
          })
          Msg.show(rs.msg)
        }
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
