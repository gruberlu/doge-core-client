const path = require('path')

module.exports = {
    packagerConfig: {
        icon: path.join(__dirname, "src/icons/mac/icon.icns"),
        name: "SuchClient"
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "dogecoin_wallet"
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {}
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {}
        }
    ]
}