const VK = require('vk-io');

const vk = new VK({
    token: "098a6b6ec7ba99092ad8d2bcb2cce59630e4fdcaa57d49a84aae31661cf718ad245d786fdb2ceeaa099a3"
});


vk.longpoll.start()
    .then(() => {
        console.log('Long Poll запущен');
    })
    .catch((error) => {
        console.error(error);
    });


