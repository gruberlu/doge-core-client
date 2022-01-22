module.exports = {
    packagerConfig: {
        icon: "./src/assets/icons/mac/icon.icns",
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
    ],
    publishers: [
        {
          name: "@electron-forge/publisher-github",
          config: {
            repository: {
              owner: "grbrlks",
              name: "doge-core-client"
            }
          }
        }
      ]
}