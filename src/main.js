const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
let titleText = document.title
const hashMap = xObject || [
    {
        logo: 'https://www.acfun.cn/favicon.ico', url: 'https://www.acfun.cn'
    },
    {
        logo: "https://www.bilibili.com/favicon.ico", url: 'https://www.bilibili.com'
    }
];

//简化展示的url链接
const removeUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
//获取正确的favicon图标的地址
const faviconUrl = (url) => {
    return url.replace(/com\/.*/g, 'com')
}
//如果图片不能正常显示则替换掉
$noshowimg = (showimg) => {
    let errorimg = "./images/error.png";//替换图片地址

    showimg.src = errorimg;
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <a href="${node.url}">
            <div class="sitebox">
            <div class="site">
           
                <div class="logo">
                <img id="img" src="${faviconUrl(node.url)}/favicon.ico" width="24" height="24" οnerrοr="noshowimg(this);">
                </div>
                <div class="link">${removeUrl(node.url)}</div >
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close-circle"></use>
                    </svg>
                </div>  
            </div >     
            </div >
            </a >
        </li > `).insertBefore($lastLi)


        $li.on('click', '.close', (e) => {

            e.preventDefault()
            hashMap.splice(index, 1)
            render();
        })

    })
}

render();


$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问输入您要添加的网址：')
        if (url.indexOf('http') != 0) {
            url = 'http://' + url
        }
        console.log(url)
        hashMap.push({
            logo: url.replace('https://', '').replace('http://', '').replace('www.', '')[0],

            url: url
        })

        render();


    });



window.onbeforeunload = () => {

    const string = JSON.stringify(hashMap)

    localStorage.setItem('x', string)
}



$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})


