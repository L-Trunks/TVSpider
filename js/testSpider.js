import {__jsEvalReturn} from './wogg.js';
import * as Utils from "../lib/utils.js";


let spider = __jsEvalReturn();

async function testPlay(vodDetail) {
    if (vodDetail.list && vodDetail.list.length > 0) {
        const pFlag = vodDetail.list[0].vod_play_from.split('$$$');
        const pUrls = vodDetail.list[0].vod_play_url.split('$$$');
        if (pFlag.length > 0 && pUrls.length > 0) {
            for (const i in pFlag) {
                // console.debug(i)
                let flag = pFlag[i];
                let urls = pUrls[i].split('#');
                // console.debug(flag, urls)
                for (const j in urls) {
                    var name = urls[j].split('$')[0];
                    var url = urls[j].split('$')[1];
                    console.debug(flag + " | " + name + " | " + url);
                    var playUrl = await spider.play(flag, url, []);
                    console.debug('playURL: ' + playUrl);
                }
            }
        }
    }
}

async function testMusicPlay(vodDetail) {
    if (vodDetail.list && vodDetail.list.length > 0) {
        const pFlag = vodDetail.list[0].volumes.split('$$$');
        const pUrls = vodDetail.list[0].urls.split('$$$');
        if (pFlag.length > 0 && pUrls.length > 0) {
            for (const i in pFlag) {
                // console.debug(i)
                let flag = pFlag[i];
                let urls = pUrls[i].split('#');
                // console.debug(flag, urls)
                for (const j in urls) {
                    var name = urls[j].split('$')[0];
                    var url = urls[j].split('$')[1];
                    console.debug(flag + " | " + name + " | " + url);
                    var playUrl = await spider.play(flag, url, []);
                    console.debug('playURL: ' + playUrl);
                }
                break
            }
        }
    }
}

async function test() {
    let siteKey = 'wogg';
    let siteType = 0;
    await spider.init({
        skey: siteKey, stype: siteType, ext: {
            "token": "6827db23e5474d02a07fd7431d3d5a5a", "box": "CatOpen", "code": "1", "from": "justlive1", "danmu": true
        }
    });




    let classes = JSON.parse(await spider.home(true));
    console.debug(JSON.stringify(classes))


    // //测试首页列表
    let homeVod = JSON.parse(await spider.homeVod())
    console.debug(JSON.stringify(homeVod));




    //测试分类列表
    let catePage = JSON.parse(await spider.category("1", "1", undefined, {}));
    console.debug(JSON.stringify(catePage));

        // 测试详情
    let detail1 = JSON.parse(await spider.detail("/index.php/voddetail/83371.html"))
    await testPlay(detail1)

    // 测试搜索
    let search_page = JSON.parse(await spider.search("海贼王"))
    console.debug(JSON.stringify(search_page));







    // 测试详情
    if (search_page.list && search_page.list.length > 0) {
        for (const k in search_page.list) {
            // console.debug(k)
            if (k >= 1) break;
            let obj = search_page.list[k]
            let spVid = search_page.list[k].vod_id
            console.debug("===", spVid)
            var detail = JSON.parse(await spider.detail(spVid || search_page.list[k].vod_id));

            await testPlay(detail);
        }
    }
}

export {test};