//korištenjem paketa path lako definiramo path u module.exports
//webpack je bundler
// path kao objekt pogledamo u dokumetaciju od nodeJS-a
const path = require('path'); //requierom pozivamo paket path iz node_modules
// module exports je objekt u kojem definiramo konfiguraciju koje exportamo
module.exports = {
    mode : 'development',
    entry: './main.js',
    output : {
        path: path.resolve(__dirname, 'build'),// path resolver nam služi da nađe apsolutnu putanju preko __dirname, build i kad prvi puta pokrenemo kreira build mapu
        filename: 'index.js'
    }
}