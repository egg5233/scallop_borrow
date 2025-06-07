import { Scallop} from '@scallop-io/sui-scallop-sdk';
import { SuiClient , getFullnodeUrl} from '@mysten/sui/client';
import { CronJob } from 'cron';

//錢包的註記詞
const mm = ""

//債務本id
const ob_id = ""

//債務本金鑰
const ob_key = ""

const suiClient = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const scallopSDK = new Scallop({
    networkType: "mainnet",
    fullnodeUrls: [getFullnodeUrl('mainnet')],
    addressId: '67c44a103fe1b8c454eb9699',
    mnemonics: mm,
});

const client = await scallopSDK.createScallopClient();

//借的顆數
const amount = 1;

/*
# ┌────────────── 秒   0-59
# │ ┌──────────── 分   0-59
# │ │ ┌────────── 時   0-23
# │ │ │ ┌──────── 日期 1-31
# │ │ │ │ ┌────── 月   1-12
# │ │ │ │ │ ┌──── 星期 0-6 
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

//五月30 8:29:59 借1顆 sca
var bo = new CronJob("59 29 8 30 5 *", async function () {
    const r = await client.borrow("sca" , amount * 1000000000 , true , ob_id , ob_key , client.walletAddress);
}, null, true , 'Asia/Taipei' );
