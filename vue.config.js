
const publicPathMap = {
    "TT": "tt3",
    "QR": "tt6"
}


const px2rem = require("postcss-px2rem");

const postcss = px2rem({
    remUnit:100
})
const isDEV = process.env.NODE_ENV !== 'production';
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

const ARGV_LIST = process.argv;

let platform = ARGV_LIST.slice(-1)||"YYM";
console.log("VUE_APP_PLATFORM:"+platform);
let publicPath = publicPathMap[platform]||"third";
module.exports = {

    css: {
        loaderOptions: {
            postcss:{
              plugins:[postcss]
            },
            sass: {

                prependData: `@import "@/scss/global.scss";`
            }
        }
    },
    publicPath:`/pay/${publicPath}/`,

    productionSourceMap: isDEV,
    configureWebpack: config => {
        if (isDEV) {
            config.devtool = 'cheap-module-eval-source-map'
        }
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@platform',resolve('src/platform/'+platform));
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20000 }))
    }
};
