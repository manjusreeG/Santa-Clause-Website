// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './css/index.css'
// import {SmallGift} from './gifts'

// If you want to use jquery
import $ from 'jquery'
const axios = require('axios')
// const SmallGift = require('./gifts.js')


class SmallGift {
    constructor() {
        this.type = 'small'
        this.weight = 1
        this.timeToPrepare = 0.5
    }
}

class NormalGift {
    constructor() {
        this.type = 'normal'
        this.weight = 2
        this.timeToPrepare = 1
    }
}

class BigGift {
    constructor() {
        this.type = 'big'
        this.weight = 5
        this.timeToPrepare = 2
    }
}

let totalGiftWeight
let gifts

const initFn = () => {
    console.log("onloading")
    totalGiftWeight = 0
    gifts = []
    document.getElementById('sledDisplayId').innerHTML = "";
}


$("#prepareGiftId").click(function () {
    let giftTypeId = $("#giftTypeId").val();
    console.log("giftTypeId", giftTypeId)
    if (totalGiftWeight >= 12) {
        alert('Gift weight exceeded')
    } else {
        if (giftTypeId === 'small') {
            prepareGift(giftTypeId)
        } else if (giftTypeId === 'normal') {
            prepareGift(giftTypeId)
        } else if (giftTypeId === 'big') {
            prepareGift(giftTypeId)
        }
    }
    console.log("gifts", gifts)
    console.log("weight", totalGiftWeight)

});

$("#deliverGiftId").click(function () {
    $('#prepareGiftId').attr("disabled", true);
    axios({
        url: 'http://localhost:8081',
        method: 'post',
        data: {
            gifts: gifts
        }
    })
        .then((response) => {
            console.log("res", response);
            if (response.status === 204) {
                $('#prepareGiftId').attr("disabled", false);
                initFn();
                alert("Gifts Delivered")
            }
        }, (error) => {
            // if (error.statusCode === 451) {
            //      initFn();
            //     alert("I am Hungry!!!!")
            // } else if (error.statusCode === 400) {
            //     alert("Sled is empty!!! You need to add gifts!!!!")
            // }
            let sledDisplayText = document.getElementById('sledDisplayId').innerText
            console.log("sleddis", sledDisplayText)
            if (sledDisplayText !== "") {
                alert("I am Hungry!!!!")
                // let enableReqToDelBtn = document.getElementById('reqToDeliverId');
                $('#deliverGiftId').attr("disabled", true);
                $('#reqToDeliverId').show();
                initFn();
            } else {
                alert("Sled is empty!!! You need to add gifts!!!!")
            }
            console.log("error", error);
        });
})

$("#reqToDeliverId").click(function () {
    $('#reqToDeliverId').hide();
    $('#deliverGiftId').attr("disabled", false);
    alert('Reindeers are ready to deliver gifts now!!!!')
});

// let initalVal
// let progressBarWidth = $('#progressBar').css("width")
// // let progressBarText = $('#progressBar').css()
// let width
// let interval 
// const progressBar = (timeToPrepare) => {
//     initalVal = 0;
//     if (initalVal === 0) {
//         initalVal = 1
//         // progressBarVal = document.getElementById('#progressBar');
//         width = 1;
//         interval = setInterval(frame, timeToPrepare)
//         frame()
//     }
//     // $('#progressBar').progressBar({
//     //     timeLimit: timeToPrepare,
//     //     onFinish: function(){
//     //         console.log("Prepared Gifts")
//     //     }

//     // })
// }

// const frame = () => {
//     if (width >= 100) {
//         clearInterval(interval)
//         initalVal = 0
//     } else {
//         width++
//         progressBarWidth.style.width = width + "%"
//         // progressBarVal.innerHTML = "Preparing..."
//     }
// }
const getGift = (gift) => {
    // progressBar(gift.timeToPrepare)
    setTimeout(() => {
        let sledDisplayText = document.getElementById('sledDisplayId').textContent;
        if (totalGiftWeight <= 12) {
        document.getElementById('sledDisplayId').innerHTML = sledDisplayText + "\n <div> \n The gift weight  is " + gift.weight + " kg \n </div> \n"
        }else{
            alert('Gift weight exceeded')
        }
    }, gift.timeToPrepare * 1000)
}


const prepareGift = (giftTypeId) => {
    let giftObj;
    let type = giftTypeId;
    if (type === 'small') {
        giftObj = new SmallGift();
    } else if (type === 'normal') {
        giftObj = new NormalGift();
    } else if (type === 'big') {
        giftObj = new BigGift();
    }
    totalGiftWeight += giftObj.weight
    gifts.push(giftObj);
    getGift(giftObj)
}


$(document).ready(initFn);


